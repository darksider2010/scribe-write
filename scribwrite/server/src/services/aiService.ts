import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

export interface SummarizeResult {
  summary: string
  originalLength: number
  summaryLength: number
}

export const summarizeText = async (text: string): Promise<SummarizeResult> => {
  // If no API key is configured, return a mock summary
  if (!process.env.OPENAI_API_KEY) {
    console.warn('OpenAI API key not configured. Using mock summarization.')
    return generateMockSummary(text)
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that summarizes markdown documents concisely while preserving key information.'
        },
        {
          role: 'user',
          content: `Please summarize the following markdown text in 2-3 sentences:\n\n${text}`
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    })

    const summary = response.choices[0]?.message?.content || 'Unable to generate summary'
    
    return {
      summary: summary.replace(/^["']|["']$/g, ''), // Remove quotes if present
      originalLength: text.length,
      summaryLength: summary.length
    }
  } catch (error) {
    console.error('Error calling OpenAI API:', error)
    throw new Error('Failed to generate summary')
  }
}

const generateMockSummary = (text: string): SummarizeResult => {
  // Simple extractive summarization for demo purposes
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const summarySentences = sentences.slice(0, Math.min(3, sentences.length))
  const summary = summarySentences.join('. ').trim() + '.'
  
  return {
    summary: summary || 'This document contains markdown content that could be summarized with an AI model.',
    originalLength: text.length,
    summaryLength: summary.length
  }
}
