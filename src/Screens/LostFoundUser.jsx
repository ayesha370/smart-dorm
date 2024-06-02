import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import LostFoundUserComponent from '../Components/LostFoundUserComponent'
import NoRoomMessage from '../Components/NoRoomMessage' // Import the new component
import { useAuth } from '../contexts/AuthContext' // Import your authentication context
import Header from '../Components/HeaderUser'

const LostFoundUser = () => {
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
      <Header title='Lost and Found Portal' />
      <LostFoundUserComponent username={currentUser.email} />
    </div>
  )
}

export default LostFoundUser
