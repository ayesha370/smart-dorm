import React from 'react'
import './Sidebar.css' 
import logo from '../assets/images/logo2.png'

import { Link } from 'react-router-dom'
import Logout from './Logout'

function Sidebar() {
  return (
    <div className='app'>
      <div className='sidebar'>
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
              <Link to='/roomallocationuser'>
                <span className='icon'>🚪</span>
                <span>Room Allocation</span>
              </Link>
            </li>
            <li>
              <Link to='/leaverequestuser'>
                <span className='icon'>📝</span>
                <span>Leave Request</span>
              </Link>
            </li>
            <li>
              <Link to='/lostfounduser'>
                <span className='icon'>🔍</span>
                <span>Lost & Found</span>
              </Link>
            </li>
            <li>
              <Link to='/chitchat'>
                <span className='icon'>💬</span>
                <span>Chat</span>
              </Link>
            </li>
            <li>
              <Link to='/userprofile'>
                <span className='icon'>👤</span>
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link to='/usernotifications'>
                <span className='icon'>🔔</span>
                <span>Notifications</span>
              </Link>
            </li>
            <li>
              <Link to='/usersettings'>
                <span className='icon'>⚙️</span>
                <span>Setting</span>
              </Link>
            </li>

            <li>
              <span className='icon'>🚪</span>
              <span>
                <Logout />
              </span>
            </li>
          </ul>
        </div>
        <div className='sidebar-bottom'>
          <ul></ul>
        </div>
      </div>

      <div className='content'>{/* Your main content goes here */}</div>
    </div>
  )
}

export default Sidebar
