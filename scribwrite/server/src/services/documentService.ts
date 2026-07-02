export interface Document {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

// In-memory document store (replace with database in production)
const documents = new Map<string, Document>()

export const listDocuments = async (): Promise<Document[]> => {
  return Array.from(documents.values())
}

export const getDocument = async (id: string): Promise<Document | null> => {
  return documents.get(id) || null
}

export const createDocument = async (title: string = 'Untitled', content: string = ''): Promise<Document> => {
  const now = new Date()
  const doc: Document = {
    id: crypto.randomUUID(),
    title,
    content,
    createdAt: now,
    updatedAt: now
  }
  documents.set(doc.id, doc)
  return doc
}

export const saveDocument = async (id: string, updates: Partial<Pick<Document, 'content' | 'title'>>): Promise<Document | null> => {
  const doc = documents.get(id)
  if (!doc) return null
  
  const updatedDoc: Document = {
    ...doc,
    ...updates,
    updatedAt: new Date()
  }
  documents.set(id, updatedDoc)
  return updatedDoc
}

export const deleteDocument = async (id: string): Promise<boolean> => {
  return documents.delete(id)
}
