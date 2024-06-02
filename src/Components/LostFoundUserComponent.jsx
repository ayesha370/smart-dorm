import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext' // Ensure this path is correct
import './LostFoundUserComponent.css'

const LostFoundUserComponent = () => {
  const { currentUser } = useAuth()
  const [formData, setFormData] = useState({
    email: currentUser.email,
    fullName: currentUser.fullName,
    roomcode: '',
    lostfoundDate: '',
    itemInfo: '',
    status: '',
  })
  const [submitStatus, setSubmitStatus] = useState('')

  useEffect(() => {
    // Assuming you have a route `/api/occupied-room/${currentUser.email}` to get the room code
    const fetchRoomCode = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/auth/occupied-room/${currentUser.email}`
        )
        if (!response.ok) {
          throw new Error('Failed to fetch room code')
        }
        const data = await response.json()
        setFormData((prevFormData) => ({
          ...prevFormData,
          roomcode: data.roomcode,
        }))
      } catch (error) {
        console.error('Error fetching room code:', error)
        setSubmitStatus('Failed to fetch room code.')
      }
    }

    fetchRoomCode()
  }, [currentUser.email])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        'http://localhost:3001/api/auth/lost-found-items',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )
      if (response.ok) {
        // setSubmitStatus('Success! Your item information has been submitted.')
        alert('Success! Your item information has been submitted.') // Alert for success
        setFormData({
          ...formData,
          lostfoundDate: '',
          itemInfo: '',
          status: '',
        }) // Reset form
      } else {
        throw new Error('Failed to submit item information.')
      }
    } catch (error) {
      setSubmitStatus(error.message)
      alert(error.message) // Alert for error
    }
  }

  return (
    <div className='lost-found-form-container'>
      <form className='lost-found-form' onSubmit={handleSubmit}>
        <h3 className='form-header'>Lost and Found Form</h3>
        <div className='lost-form-groups static'>
          <label>Email</label>
          <div>{formData.email}</div>
        </div>
        <div className='lost-form-groups static'>
          <label>Full Name</label>
          <div>{formData.fullName}</div>
        </div>
        <div className='lost-form-groups static'>
          <label>Room Number</label>
          <div>{formData.roomcode}</div>
        </div>
        <div className='lost-form-groups'>
          <label htmlFor='lostfoundDate'>Date</label>
          <input
            type='date'
            name='lostfoundDate'
            value={formData.lostfoundDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className='lost-form-groups'>
          <label htmlFor='status'>Status</label>
          <select
            name='status'
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value=''>Select Status</option>
            <option value='lost'>Lost</option>
            <option value='found'>Found</option>
          </select>
        </div>
        <div className='lost-form-groups'>
          <label htmlFor='itemInfo'>Item Information</label>
          <textarea
            name='itemInfo'
            value={formData.itemInfo}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type='submit' className='submit-button'>
          Submit Request
        </button>
      </form>
      {submitStatus && <p>{submitStatus}</p>}
    </div>
  )
}

export default LostFoundUserComponent
