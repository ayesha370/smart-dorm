import React from 'react'
import Sidebar from '../Components/Sidebar'
import ProfileAdminComponent from '../Components/ProfileAdminComponent'
import Header from '../Components/HeaderUser'
const Settings = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <Header title='Profile Settings' />
      <ProfileAdminComponent />
    </div>
  )
}

export default Settings
