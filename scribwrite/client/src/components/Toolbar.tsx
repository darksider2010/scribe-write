import React from 'react'

interface ToolbarProps {
  onSummarize: () => void
  isSummarizing: boolean
  onExport: (format: 'pdf' | 'html' | 'md') => void
  onToggleSidebar: () => void
  isConnected: boolean
  collaboratorCount: number
}

const Toolbar: React.FC<ToolbarProps> = ({
  onSummarize,
  isSummarizing,
  onExport,
  onToggleSidebar,
  isConnected,
  collaboratorCount
}) => {
  return (
    <div className="border-b border-gray-200 bg-white p-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-100 rounded"
          title="Toggle Sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center space-x-2">
          <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm text-gray-600">
            {collaboratorCount} {collaboratorCount === 1 ? 'collaborator' : 'collaborators'}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onSummarize}
          disabled={isSummarizing}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSummarizing ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Summarizing...
            </span>
          ) : (
            'AI Summarize'
          )}
        </button>

        <div className="relative group">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
            Export
          </button>
          <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 hidden group-hover:block z-10">
            <button
              onClick={() => onExport('pdf')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              PDF
            </button>
            <button
              onClick={() => onExport('html')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              HTML
            </button>
            <button
              onClick={() => onExport('md')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Markdown
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Toolbar
