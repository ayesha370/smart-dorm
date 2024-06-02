import React from 'react'

import SidebarAdmin from '../Components/SidebarAdmin'
import LostFoundAdminComponent from '../Components/LostFoundAdminComponent'
import Header from '../Components/HeaderAdmin'
const LostFoundAdmin = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SidebarAdmin />
      <Header title='Lost & Found' />
      <LostFoundAdminComponent />
    </div>
  )
}

export default LostFoundAdmin
