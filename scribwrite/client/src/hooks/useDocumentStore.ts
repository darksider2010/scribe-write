import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Document {
  id: string
  title: string
  content: string
  lastModified: Date
}

interface DocumentStore {
  documents: Document[]
  currentDoc: Document | null
  createDocument: () => Document
  updateDocument: (id: string, content: string) => void
  loadDocument: (doc: Document) => void
  deleteDocument: (id: string) => void
}

export const useDocumentStore = create<DocumentStore>()(
  persist(
    (set, get) => ({
      documents: [],
      currentDoc: null,

      createDocument: () => {
        const newDoc: Document = {
          id: crypto.randomUUID(),
          title: 'Untitled Document',
          content: '# New Document\n\nStart writing...',
          lastModified: new Date()
        }
        set((state) => ({
          documents: [...state.documents, newDoc],
          currentDoc: newDoc
        }))
        return newDoc
      },

      updateDocument: (id, content) => {
        set((state) => ({
          documents: state.documents.map((doc) =>
            doc.id === id
              ? { ...doc, content, lastModified: new Date() }
              : doc
          ),
          currentDoc: state.currentDoc?.id === id
            ? { ...state.currentDoc, content, lastModified: new Date() }
            : state.currentDoc
        }))
      },

      loadDocument: (doc) => {
        set({ currentDoc: doc })
      },

      deleteDocument: (id) => {
        set((state) => ({
          documents: state.documents.filter((doc) => doc.id !== id),
          currentDoc: state.currentDoc?.id === id ? null : state.currentDoc
        }))
      }
    }),
    {
      name: 'scribwrite-documents'
    }
  )
)
