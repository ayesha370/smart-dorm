import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserCircle,
  faBell,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons'

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext' // Adjust the import path as per your directory structure

const Header = ({ title }) => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    if (logout) {
      logout() // Clears the token and currentUser state
      navigate('/') // Redirects to login page
    } else {
      console.error('Logout function not found')
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      <nav style={styles.navbar}>
        <div style={styles.container}>
          <a href='#home' style={styles.brand}>
            {title}
          </a>
          <div style={styles.nav}>
            <Link to='/userprofile' style={styles.navLink}>
              <FontAwesomeIcon icon={faUserCircle} style={styles.icon} />
            </Link>
            <Link to='/usernotifications' style={styles.navLink}>
              <FontAwesomeIcon icon={faBell} style={styles.icon} />
            </Link>
            <a onClick={handleLogout} style={styles.navLink}>
              <FontAwesomeIcon icon={faPowerOff} style={styles.icon} />
            </a>
          </div>
        </div>
      </nav>
    </div>
  )
}

const styles = {
  navbar: {
    backgroundColor: '#e9ecef',
    padding: '10px 0px',
    width: `calc(100% - 240px)`,
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
    transition: 'left 0.3s ease',
    left: '240px',
  },
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 30px', // Add padding to the container
    boxSizing: 'border-box', // Include padding in the width calculation
  },
  brand: {
    fontWeight: '600',
    fontSize: '24px',
    textDecoration: 'none',
    color: '#000',
  },
  nav: {
    display: 'flex',
    paddingRight: '37px',
  },
  navLink: {
    margin: '0 10px',
    color: '#000',
    textDecoration: 'none',
  },
  icon: {
    width: '25px',
    height: '25px',
  },
}

export default Header
