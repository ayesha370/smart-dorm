import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext' // Adjust path as needed
import './RoomAllocationUserComponent.css'

const RoomAllocationUserComponent = () => {
  const { currentUser } = useAuth()
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [roomType, setRoomType] = useState('')
  const [additionalRequest, setAdditionalRequest] = useState('')
  const [availableRooms, setAvailableRooms] = useState([])
  const [selectedRoom, setSelectedRoom] = useState('')
  const [hostelType, setHostelType] = useState('')

  // Determine hostel type based on gender
  useEffect(() => {
    if (currentUser.gender === 'male') {
      setHostelType('Boys Hostel')
    } else if (currentUser.gender === 'female') {
      setHostelType('Girls Hostel')
    }
  }, [currentUser.gender])

  // Fetch rooms when roomType or hostelType changes
  useEffect(() => {
    if (roomType) {
      fetchAvailableRooms()
    }
  }, [roomType, hostelType])

  const fetchAvailableRooms = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/auth/occupied/available-rooms?roomType=${roomType}`
      )
      const data = await response.json()
      const rooms = data.availableRooms
      const halfIndex = Math.floor(rooms.length / 2)
      const filteredRooms =
        hostelType === 'Boys Hostel'
          ? rooms.slice(0, halfIndex)
          : rooms.slice(halfIndex)
      setAvailableRooms(filteredRooms)
    } catch (error) {
      console.error('Error fetching available rooms:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const roomAllocationData = {
      email: currentUser.email,
      fullName: currentUser.fullName,
      fromDate,
      toDate,
      roomType,
      roomNumber: selectedRoom,
      additionalRequest,
      status: 'pending',
      hostelType,
    }

    try {
      const response = await fetch(
        'http://localhost:3001/api/auth/roomallocation',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(roomAllocationData),
        }
      )

      if (response.ok) {
        alert('Room allocation request submitted successfully!')
      } else {
        const errorResult = await response.json()
        alert(
          `Failed to submit room allocation request: ${errorResult.message}`
        )
      }
    } catch (error) {
      console.error('Error submitting room allocation request:', error)
      alert('An error occurred while submitting the room allocation request.')
    }
  }

  return (
    <div className='room-allocation-container'>
      <form onSubmit={handleSubmit} className='room-allocation-form'>
        <h2 className='form-header'>Request A Room</h2>
        <div className='room-form-group'>
          <label>Hostel Type:</label>
          <input
            type='text'
            value={hostelType}
            readOnly
            className='room-form-control'
          />
        </div>
        <div className='room-form-group'>
          <label htmlFor='fromDate'>From (Date):</label>
          <input
            type='date'
            id='fromDate'
            className='room-form-control'
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            required
          />
        </div>
        <div className='room-form-group'>
          <label htmlFor='toDate'>To (Date):</label>
          <input
            type='date'
            id='toDate'
            className='room-form-control'
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            required
          />
        </div>
        <div className='room-form-group'>
          <label htmlFor='roomType'>Room Type:</label>
          <select
            id='roomType'
            className='room-form-control'
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            required
          >
            <option value=''>Select Room Type</option>
            <option value='single'>Single</option>
            <option value='double'>Double</option>
            <option value='three-seater'>Three Seater</option>
          </select>
        </div>
        <div className='room-form-group'>
          <label htmlFor='availableRooms'>Available Rooms:</label>
          <select
            id='availableRooms'
            className='room-form-control'
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            required
          >
            <option value=''>Select a Room</option>
            {availableRooms.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
        </div>
        <div className='room-form-group'>
          <label htmlFor='additionalRequest'>Additional Request:</label>
          <textarea
            id='additionalRequest'
            className='room-form-control'
            placeholder='Special requirement'
            value={additionalRequest}
            onChange={(e) => setAdditionalRequest(e.target.value)}
          />
        </div>
        <button type='submit' className='allocation-button'>
          Submit Request
        </button>
      </form>
    </div>
  )
}

export default RoomAllocationUserComponent
