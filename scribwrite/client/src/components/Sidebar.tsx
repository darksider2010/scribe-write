import React from 'react'

interface Document {
  id: string
  title: string
  lastModified: Date
}

interface SidebarProps {
  documents: Document[]
  currentDoc: Document | null
  onSelectDocument: (doc: Document) => void
  onCreateDocument: () => void
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({
  documents,
  currentDoc,
  onSelectDocument,
  onCreateDocument,
  onClose
}) => {
  return (
    <div className="w-64 bg-gray-100 border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="font-semibold text-lg">Documents</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <button
          onClick={onCreateDocument}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Document
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {documents.length === 0 ? (
          <div className="p-4 text-gray-500 text-sm text-center">
            No documents yet. Create one to get started!
          </div>
        ) : (
          <ul className="space-y-1 p-2">
            {documents.map((doc) => (
              <li key={doc.id}>
                <button
                  onClick={() => onSelectDocument(doc)}
                  className={`w-full text-left px-3 py-2 rounded transition-colors ${
                    currentDoc?.id === doc.id
                      ? 'bg-blue-100 text-blue-900'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  <div className="font-medium truncate">{doc.title}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(doc.lastModified).toLocaleDateString()}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Sidebar
