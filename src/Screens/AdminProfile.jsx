import React from 'react'
import ProfileAdminDisplayComponent from '../Components/ProfileAdminDisplayComponent'
import SidebarAdmin from '../Components/SidebarAdmin'
import Header from '../Components/HeaderAdmin'
const AdminProfile = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SidebarAdmin />

      <div>
        <Header title='Admin Profile' />
        <ProfileAdminDisplayComponent />
      </div>
    </div>
  )
}

export default AdminProfile
