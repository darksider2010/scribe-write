import { Router } from 'express'
import { summarizeText } from '../services/aiService'

const router = Router()

// Summarize text endpoint
router.post('/summarize', async (req, res, next) => {
  try {
    const { text } = req.body
    
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ message: 'Text is required' })
    }

    const result = await summarizeText(text)
    res.json(result)
  } catch (error) {
    next(error)
  }
})

export default router
