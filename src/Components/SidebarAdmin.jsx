import React from 'react'
import './Sidebar.css' // Import the CSS file
import logo from '../assets/images/logo2.png'
import Logout from './Logout'
import { Link } from 'react-router-dom'

function SidebarAdmin() {
  return (
    <div className='app'>
      <div className='sidebar expanded'>
      <div className='sidebar-top'>
          <div className='logo-container'>
            <img src={logo} alt='Smart Dorm Logo' className='sidebar-logo' />
            <span>
              <Link to='/'>Smart Dorm</Link>
            </span>
          </div>
        </div>
        <div className='sidebar-menu'>
          <ul>
            <li>
              <Link to='/'>
                <span className='icon'>🏠</span>
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to='/roomallocationadmin'>
                <span className='icon'>🚪</span>
                <span>Room Allocation</span>
              </Link>
            </li>
            <li>
              <Link to='/leaverequestadmin'>
                <span className='icon'>📝</span>
                <span>Leave Request</span>
              </Link>
            </li>
            <li>
              <Link to='/lostfoundadmin'>
                <span className='icon'>🔍</span>
                <span>Lost & Found</span>
              </Link>
            </li>
            <li>
              <Link to='/chitchatadmin'>
                <span className='icon'>💬</span>
                <span>Chat</span>
              </Link>
            </li>
            <li>
              <Link to='/adminprofile'>
                <span className='icon'>👤</span>
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link to='/adminsettings'>
                <span className='icon'>⚙️</span>
                <span>Setting</span>
              </Link>
            </li>
          
          
            <li>
              <Link to='/adminnotifications'>
                <span className='icon'>🔔</span>
                <span>Notifications</span>
              </Link>
            </li>

            <li>
              <Link to='/room-status'>
                <span className='icon'>👤</span>
                <span>Users Status</span>
              </Link>
            </li>




            <li>
              <span className='icon'>🚪</span>
              <span>
                <Logout text='Logout' />
              </span>
            </li>
          </ul>
        </div>
        <div className='sidebar-bottom'>
          <ul></ul>
        </div>
      </div>
    </div>
  )
}

export default SidebarAdmin
