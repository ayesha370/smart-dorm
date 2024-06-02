import React, { useState, useEffect, useCallback } from 'react'
import io from 'socket.io-client'
import { useAuth } from '../contexts/AuthContext'

const SOCKET_IO_URL = 'http://localhost:3001'
const socket = io(SOCKET_IO_URL)

const ChitChatComponent = () => {
  const { currentUser } = useAuth()
  const [currentMessage, setCurrentMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)

  const connectSSE = () => {
    const eventSource = new EventSource(
      `http://localhost:3001/api/events?email=${currentUser.email}`
    )
    console.log('EventSource connected')

    eventSource.onmessage = (event) => {
      var data = event.data
      console.log('SSE EVENT DATA: ', data)
      let index = data.indexOf(':')
      if (index > -1) {
        let eventName = data.substring(0, index)
        if (eventName === 'MSG') {
          let msg = JSON.parse(data.substring(index + 1))
          //functional update to avoid stale state
          console.log('Received new message: ', msg)
          setMessages((prevMessages) => [...prevMessages, msg])
        }
      }
    }

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error)
      eventSource.close()
    }
  }

  // Function to fetch chat history
  const fetchChatHistory = useCallback(() => {
    if (currentUser && selectedUser) {
      fetch(
        `http://localhost:3001/api/auth/chat-history?user1=${currentUser.email}&user2=${selectedUser.email}`
      )
        .then((response) => response.json())
        .then((data) => setMessages(data))
        .catch((err) => console.error('Error fetching chat history:', err))
    }
  }, [currentUser, selectedUser])

  useEffect(() => {
    fetchChatHistory()
  }, [fetchChatHistory])

  useEffect(() => {
    fetch(
      `http://localhost:3001/api/auth/users/${
        currentUser.role === 'user' ? 'admin' : 'user'
      }`
    )
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Error fetching users:', err))
  }, [currentUser.role])

  // SSE connection
  useEffect(connectSSE, [currentUser])

  const sendMessage = () => {
    if (currentUser && selectedUser && currentMessage.trim() !== '') {
      const messageData = {
        senderEmail: currentUser.email,
        receiverEmail: selectedUser.email,
        message: currentMessage,
        timestamp: new Date(),
      }
      socket.emit('sendMessage', messageData)
      setMessages([...messages, messageData])
      setCurrentMessage('')
    }
  }

  const clearChat = () => {
    if (selectedUser) {
      const confirmClear = window.confirm(
        'Are you sure you want to clear the chat history?'
      )
      if (confirmClear) {
        fetch(`http://localhost:3001/api/auth/clear-chat`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user1: currentUser.email,
            user2: selectedUser.email,
          }),
        })
          .then(() => setMessages([]))
          .catch((err) => console.error('Error clearing chat:', err))
      }
    }
  }

  const refreshChat = () => {
    fetchChatHistory()
  }

  // Component styling
  // Component styling
  const styles = {
    chatContainer: {
      display: 'flex',
      flexDirection: 'row',
      width: '73%', // Reduce the width from 100% to 90%
      height: '80vh', // Set height to 80vh (no change needed here unless you want it different)
      backgroundColor: '#f0f0f0',
      border: '1px solid #ccc',
      borderRadius: '10px',
      marginLeft: '260px', // Add margin to the left to push the entire container right
      marginTop: '40px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
    },
    userContainer: {
      width: '200px',
      height: '96%',
      overflowY: 'auto',
      backgroundColor: '#fff',
      padding: '10px',
      marginRight: '10px',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
    },
    chatBox: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#fff',
      borderRadius: '10px',
      padding: '10px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
    },
    chatMessages: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
    },
    inputBox: {
      display: 'flex',
      alignItems: 'center',
      borderTop: '1px solid #ccc',
      padding: '10px 0',
    },
    inputField: {
      flexGrow: 1,
      padding: '10px',
      marginRight: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '10px 20px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
    },
    sendButton: {
      backgroundColor: '#4e9af1',
      color: '#fff',
      marginLeft: 'auto',
      boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
    },
    clearButton: {
      backgroundColor: 'red',
      color: '#fff',
      marginLeft: '10px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
    },
    refreshButton: {
      backgroundColor: '#4e9af1',
      color: '#fff',
      marginBottom: '10px',
    },
    messageBubble: (isCurrentUser) => ({
      margin: '5px 0',
      padding: '10px',
      borderRadius: '10px',
      backgroundColor: isCurrentUser ? '#4e9af1' : '#e9e9e9',
      color: isCurrentUser ? '#fff' : '#333',
      alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
      maxWidth: '50%',
      minWidth: '40%',
      boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
    }),
  }

  return (
    <div style={styles.chatContainer}>
      <div style={styles.userContainer}>
        <h3>Available Users</h3>
        {users.map((user) => (
          <div
            key={user.email}
            onClick={() => setSelectedUser(user)}
            style={{
              padding: '10px',
              cursor: 'pointer',
              backgroundColor:
                selectedUser === user ? '#e4e4e4' : 'transparent',
              borderRadius: '10px',
            }}
          >
            {user.fullName}
          </div>
        ))}
      </div>
      <div style={styles.chatBox}>
        {/* <button
          onClick={refreshChat}
          style={{ ...styles.button, ...styles.refreshButton }}
        >
          Refresh
        </button> */}
        <div style={styles.chatMessages}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={styles.messageBubble(
                msg.senderEmail === currentUser.email
              )}
            >
              <strong>
                {msg.senderEmail === currentUser.email
                  ? 'You'
                  : msg.senderEmail}
              </strong>
              <p>{msg.message}</p>
            </div>
          ))}
        </div>
        <div style={styles.inputBox}>
          <input
            type='text'
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder='Type your message here...'
            style={styles.inputField}
          />
          <button
            onClick={sendMessage}
            style={{ ...styles.button, ...styles.sendButton }}
          >
            Send
          </button>
          <button
            onClick={clearChat}
            style={{ ...styles.button, ...styles.clearButton }}
          >
            Clear Chat
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChitChatComponent
