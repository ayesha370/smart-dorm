import React from 'react'
import SidebarAdmin from '../Components/SidebarAdmin'
import ProfileAdminComponent from '../Components/ProfileAdminComponent'
import Header from '../Components/HeaderAdmin'

const SettingsAdmin = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SidebarAdmin />
      <Header title='Profile Settings' />
      <ProfileAdminComponent />
    </div>
  )
}

export default SettingsAdmin
