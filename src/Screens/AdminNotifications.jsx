import React from 'react'
import SidebarAdmin from '../Components/SidebarAdmin'
import NotificationComponent from './NotificationComponent'
import { useAuth } from '../contexts/AuthContext'
import HeaderAdmin from '../Components/HeaderAdmin'

const AdminNotifications = () => {
  const { currentUser } = useAuth()
  return (
    <div style={{ display: 'flex' }}>
      <SidebarAdmin />
      <div>
        <HeaderAdmin title='Notifications' />
        <NotificationComponent userEmail={currentUser.email} />
      </div>
    </div>
  )
}

export default AdminNotifications
