import React from 'react'
import Sidebar from '../Components/Sidebar'
import ChitChatComponent from '../Components/ChitChatComponent'
import Header from '../Components/HeaderUser'

const ChitChat = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Sidebar />
      <div style={{ width: '100%' }}>
        <Header title='Chit Chat' />
        <ChitChatComponent />
      </div>
    </div>
  )
}

export default ChitChat
