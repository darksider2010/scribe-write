import { Server, Socket } from 'socket.io'

interface DocumentRoom {
  documentId: string
  users: Map<string, UserInfo>
}

interface UserInfo {
  id: string
  name: string
  color: string
}

const documentRooms = new Map<string, DocumentRoom>()

export const setupSocketHandlers = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on('join-document', ({ documentId }: { documentId: string }) => {
      // Leave previous room if any
      const previousRoom = Array.from(documentRooms.values()).find(room =>
        room.users.has(socket.id)
      )
      if (previousRoom) {
        socket.leave(previousRoom.documentId)
        previousRoom.users.delete(socket.id)
        broadcastCollaborators(previousRoom)
      }

      // Join new room
      socket.join(documentId)
      
      if (!documentRooms.has(documentId)) {
        documentRooms.set(documentId, {
          documentId,
          users: new Map()
        })
      }

      const room = documentRooms.get(documentId)!
      room.users.set(socket.id, {
        id: socket.id,
        name: `User ${socket.id.slice(0, 4)}`,
        color: generateRandomColor()
      })

      socket.to(documentId).emit('user-joined', {
        userId: socket.id,
        userInfo: room.users.get(socket.id)
      })

      // Send current collaborators to the joining user
      socket.emit('collaborators', Array.from(room.users.values()))
      
      // Broadcast updated collaborators to others
      broadcastCollaborators(room)

      console.log(`User ${socket.id} joined document ${documentId}`)
    })

    socket.on('document-update', ({ documentId, content, userId }: { documentId: string; content: string; userId: string }) => {
      // Broadcast to all other users in the room
      socket.to(documentId).emit('document-update', {
        content,
        userId
      })
    })

    socket.on('cursor-move', ({ documentId, position }: { documentId: string; position: number }) => {
      socket.to(documentId).emit('cursor-move', {
        userId: socket.id,
        position
      })
    })

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`)
      
      // Remove user from all rooms
      documentRooms.forEach((room) => {
        if (room.users.has(socket.id)) {
          room.users.delete(socket.id)
          socket.to(room.documentId).emit('user-left', { userId: socket.id })
          broadcastCollaborators(room)
          
          // Clean up empty rooms
          if (room.users.size === 0) {
            documentRooms.delete(room.documentId)
          }
        }
      })
    })
  })
}

const broadcastCollaborators = (room: DocumentRoom) => {
  const collaborators = Array.from(room.users.values())
  io.to(room.documentId).emit('collaborators', collaborators)
}

const generateRandomColor = (): string => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8']
  return colors[Math.floor(Math.random() * colors.length)]
}

export { io }
