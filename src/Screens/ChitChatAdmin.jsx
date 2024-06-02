import React from 'react'
import SidebarAdmin from '../Components/SidebarAdmin'
import ChatAdmin from '../Components/ChatAdmin'
import Header from '../Components/HeaderAdmin'

const ChitChatAdmin = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <SidebarAdmin />
      <div style={{ width: '100%' }}>
        <Header title='Chit Chat' />
        <ChatAdmin/>
      </div>
    </div>
  )
}

export default ChitChatAdmin
