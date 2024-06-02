
import React from 'react'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faTasks, faUsers } from '@fortawesome/free-solid-svg-icons'
import './Dashboard.css'
import Header from '../Components/HeaderAdmin'
import RoomSection from '../Components/RoomSection'
import SidebarAdmin from '../Components/SidebarAdmin'
const DashboardAdmin = () => {
  const [totalUsers, setTotalUsers] = useState(0)
  const [boyCount, setBoyCount] = useState(0)
  const [girlCount, setGirlCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch(
          'http://localhost:3001/api/auth/countUsers'
        )
        const userData = await userResponse.json()
        setTotalUsers(userData.totalUsers)

        const genderResponse = await fetch(
          'http://localhost:3001/api/auth/emailGenderCount'
        )
        const genderData = await genderResponse.json()
        setBoyCount(genderData.boysCount)
        setGirlCount(genderData.girlsCount)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div style={{ display: 'flex' }}>
      <SidebarAdmin />
      <div className='background'>
        <Header title='Dashboard' />
        <div className='dashboard-background'></div>
        <div className='container'>
          <h1 className='dashboard-title'>Welcome! Admin</h1>
          <div className='dashboard-grid' style={{ display: 'flex' }}>
            {/* Students Card */}
            <div className='dashboard-card'>
              <div className='card-header'>
                <span>Total Students</span>
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <div className='card-body'>
                <h2>{totalUsers}</h2>
                <p>Enrolled</p>
              </div>
            </div>
            {/* Total Rooms Card */}
            <div className='dashboard-card'>
              <div className='card-header'>
                <span>Seats in Girls Hostel</span>
                <FontAwesomeIcon icon={faHouse} />
              </div>
              <div className='card-body'>
                <h2>14</h2>
                <p>{girlCount} Rooms Available</p>
              </div>
            </div>
            {/* Available Rooms Card */}
            <div className='dashboard-card'>
              <div className='card-header'>
                <span>Seats in Boys Hostel</span>
                <FontAwesomeIcon icon={faTasks} />
              </div>
              <div className='card-body'>
                <h2>13</h2>
                <p>{boyCount} Rooms Available</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <RoomSection type='girls' />
          <RoomSection type='boys' />
        </div>
      </div>
    </div>
  )
}

export default DashboardAdmin
