import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

interface Collaborator {
  id: string
  name: string
  color: string
}

export const useSocket = (documentId: string | null) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])

  useEffect(() => {
    if (!documentId) {
      if (socket) {
        socket.disconnect()
        setSocket(null)
      }
      return
    }

    const newSocket = io('http://localhost:4000', {
      transports: ['websocket']
    })

    newSocket.on('connect', () => {
      setIsConnected(true)
      newSocket.emit('join-document', { documentId })
    })

    newSocket.on('disconnect', () => {
      setIsConnected(false)
    })

    newSocket.on('collaborators', (users: Collaborator[]) => {
      setCollaborators(users)
    })

    newSocket.on('document-update', (data: { content: string; userId: string }) => {
      // Handle incoming document updates from other collaborators
      console.log('Document update received:', data)
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [documentId])

  return { socket, isConnected, collaborators }
}
