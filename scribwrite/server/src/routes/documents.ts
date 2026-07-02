import { Router } from 'express'
import { getDocument, saveDocument, createDocument, deleteDocument, listDocuments } from '../services/documentService'

const router = Router()

// Get all documents
router.get('/', async (req, res, next) => {
  try {
    const docs = await listDocuments()
    res.json(docs)
  } catch (error) {
    next(error)
  }
})

// Create new document
router.post('/', async (req, res, next) => {
  try {
    const { title, content } = req.body
    const doc = await createDocument(title, content)
    res.status(201).json(doc)
  } catch (error) {
    next(error)
  }
})

// Get document by ID
router.get('/:id', async (req, res, next) => {
  try {
    const doc = await getDocument(req.params.id)
    if (!doc) {
      return res.status(404).json({ message: 'Document not found' })
    }
    res.json(doc)
  } catch (error) {
    next(error)
  }
})

// Update document
router.put('/:id', async (req, res, next) => {
  try {
    const { content, title } = req.body
    const doc = await saveDocument(req.params.id, { content, title })
    if (!doc) {
      return res.status(404).json({ message: 'Document not found' })
    }
    res.json(doc)
  } catch (error) {
    next(error)
  }
})

// Delete document
router.delete('/:id', async (req, res, next) => {
  try {
    const success = await deleteDocument(req.params.id)
    if (!success) {
      return res.status(404).json({ message: 'Document not found' })
    }
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

export default router
