import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import LeaveRequestUserComponent from '../Components/LeaveRequestUserComponent'
import NoRoomMessage from '../Components/NoRoomMessage' // Import the new component
import { useAuth } from '../contexts/AuthContext' // Import your authentication context
import Header from '../Components/HeaderUser'

const LeaveRequestUser = () => {
  const [hasRoom, setHasRoom] = useState(false)
  const { currentUser } = useAuth() // Replace with your auth context usage

  useEffect(() => {
    // Only proceed if the user has 'user' role
    if (currentUser.role === 'user') {
      fetch(
        `http://localhost:3001/api/auth/check-room-allocation/${currentUser.email}`
      )
        .then((res) => res.json())
        .then((data) => setHasRoom(data.hasRoom))
        .catch((err) => console.error('Error:', err))
    }
  }, [currentUser])

  // Render NoRoomMessage if user has no room
  if (!hasRoom) {
    return <NoRoomMessage />
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100vh',
        }}
      >
        <Header title='Leave Request' />
        <LeaveRequestUserComponent username={currentUser.email} />
      </div>
    </div>
  )
}

export default LeaveRequestUser
