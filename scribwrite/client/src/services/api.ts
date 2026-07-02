import axios from 'axios'

const API_BASE_URL = 'http://localhost:4000/api'

export interface SummarizeResponse {
  summary: string
  originalLength: number
  summaryLength: number
}

export const summarizeText = async (text: string): Promise<SummarizeResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ai/summarize`, { text })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to summarize text')
    }
    throw error
  }
}

export const getDocument = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/documents/${id}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch document')
    }
    throw error
  }
}

export const saveDocument = async (id: string, content: string) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/documents/${id}`, { content })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to save document')
    }
    throw error
  }
}

export const exportDocument = async (id: string, format: 'pdf' | 'html' | 'md') => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/documents/${id}/export`,
      { format },
      { responseType: 'blob' }
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to export document')
    }
    throw error
  }
}
