import React from 'react'
import NotificationComponent from './NotificationComponent'
import Sidebar from '../Components/Sidebar'

import { useAuth } from '../contexts/AuthContext'
import Header from '../Components/HeaderUser'

const UserNotifications = () => {
  const { currentUser } = useAuth()

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div>
        <Header title='Notifications' />
        <NotificationComponent userEmail={currentUser.email} />
      </div>
    </div>
  )
}

export default UserNotifications
