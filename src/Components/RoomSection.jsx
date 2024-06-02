import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import './RoomSection.css'

// RoomSection now takes rooms data as a prop
const RoomSection = ({ title, rooms }) => {
  const [open, setOpen] = useState(true) // Set initial state to true

  return (
    <div className='room-section'>
      <div className='section-header' onClick={() => setOpen(!open)}>
        <span className='section-title'>{title}</span>
        <FontAwesomeIcon
          icon={open ? faChevronUp : faChevronDown}
          className='icon'
        />
      </div>
      <div className={`collapse-section ${open ? 'open' : ''}`}>
        <div className='room-container'>
          {rooms.map(({ roomCode, status }) => (
            <div
              key={roomCode}
              className={`room ${status === 'occupied' ? 'booked' : ''}`}
            >
              {roomCode}
            </div>
          ))}
        </div>
      </div>
      <hr />
    </div>
  )
}

// Dashboard fetches room data based on the 'type' prop (boys or girls)
const Dashboard = ({ type }) => {
  const [roomData, setRoomData] = useState({
    single: [],
    double: [],
    triple: [],
  })

  useEffect(() => {
    const fetchRoomAvailability = async (roomType) => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/auth/available-rooms/${type}/${roomType}`
        )
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data.availableRooms
          .map((roomCode) => ({
            roomCode,
            status: 'available',
          }))
          .concat(
            data.occupiedRoomCodes.map((roomCode) => ({
              roomCode,
              status: 'occupied',
            }))
          )
      } catch (error) {
        console.error('Error fetching room availability:', error)
        return []
      }
    }

    const loadData = async () => {
      const singleRooms = await fetchRoomAvailability('single')
      const doubleRooms = await fetchRoomAvailability('double')
      const tripleRooms = await fetchRoomAvailability('three-seater')
      setRoomData({
        single: singleRooms,
        double: doubleRooms,
        triple: tripleRooms,
      })
    }

    loadData()
  }, [type])

  return (
    <div className='dashboard-container'>
      <h2 style={{ marginBottom: '10px' }}>{type} Hostel Rooms</h2>
      <RoomSection title='Single Seater' rooms={roomData.single} />
      <RoomSection title='Double Seater' rooms={roomData.double} />
      <RoomSection title='Triple Seater' rooms={roomData.triple} />
    </div>
  )
}

export default Dashboard
