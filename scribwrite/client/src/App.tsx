import { useState, useEffect, useCallback } from 'react'
import Editor from './components/Editor'
import Preview from './components/Preview'
import Toolbar from './components/Toolbar'
import Sidebar from './components/Sidebar'
import { useDocumentStore } from './hooks/useDocumentStore'
import { useSocket } from './hooks/useSocket'
import { summarizeText } from './services/api'

function App() {
  const [markdown, setMarkdown] = useState<string>('# Welcome to ScribeWrite\n\nStart writing your markdown here...')
  const [isSummarizing, setIsSummarizing] = useState(false)
  const [summary, setSummary] = useState<string>('')
  const [showSidebar, setShowSidebar] = useState(true)
  
  const { documents, currentDoc, createDocument, updateDocument, loadDocument } = useDocumentStore()
  const { socket, isConnected, collaborators } = useSocket(currentDoc?.id || null)

  const handleMarkdownChange = useCallback((newMarkdown: string) => {
    setMarkdown(newMarkdown)
    if (currentDoc) {
      updateDocument(currentDoc.id, newMarkdown)
      // Emit real-time update to other collaborators
      if (socket && isConnected) {
        socket.emit('document-update', {
          documentId: currentDoc.id,
          content: newMarkdown,
          userId: socket.id
        })
      }
    }
  }, [currentDoc, updateDocument, socket, isConnected])

  const handleSummarize = async () => {
    setIsSummarizing(true)
    try {
      const result = await summarizeText(markdown)
      setSummary(result.summary)
    } catch (error) {
      console.error('Failed to summarize:', error)
      setSummary('Error generating summary. Please try again.')
    } finally {
      setIsSummarizing(false)
    }
  }

  const handleExport = (format: 'pdf' | 'html' | 'md') => {
    // Export functionality implementation
    console.log(`Exporting as ${format}`)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      {showSidebar && (
        <Sidebar 
          documents={documents}
          currentDoc={currentDoc}
          onSelectDocument={loadDocument}
          onCreateDocument={createDocument}
          onClose={() => setShowSidebar(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <Toolbar
          onSummarize={handleSummarize}
          isSummarizing={isSummarizing}
          onExport={handleExport}
          onToggleSidebar={() => setShowSidebar(!showSidebar)}
          isConnected={isConnected}
          collaboratorCount={collaborators.length}
        />

        {/* Editor and Preview */}
        <div className="flex-1 flex overflow-hidden">
          <div className="w-1/2 border-r border-gray-200">
            <Editor
              value={markdown}
              onChange={handleMarkdownChange}
              readOnly={!currentDoc}
            />
          </div>
          <div className="w-1/2 overflow-auto">
            <Preview markdown={markdown} />
          </div>
        </div>

        {/* Summary Panel */}
        {summary && (
          <div className="border-t border-gray-200 p-4 bg-white">
            <h3 className="text-lg font-semibold mb-2">AI Summary</h3>
            <p className="text-gray-700">{summary}</p>
            <button
              onClick={() => setSummary('')}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
