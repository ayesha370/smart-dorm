import React from 'react'
import LeaveRequestAdminComponent from '../Components/LeaveRequestAdminComponent'
import SidebarAdmin from '../Components/SidebarAdmin'
import Header from '../Components/HeaderAdmin'

const LeaveRequestAdmin = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SidebarAdmin />

      <Header title='Leave Requests' />

      <LeaveRequestAdminComponent />
    </div>
  )
}

export default LeaveRequestAdmin
