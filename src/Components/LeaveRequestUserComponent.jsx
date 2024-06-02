import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext' // Ensure this path is correct
import './LeaveRequestUserComponent.css' // Adjust path as needed for your CSS

const LeaveRequestUserComponent = () => {
  const { currentUser } = useAuth()
  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: '',
    reason: '',
    roomcode: '',
    email: currentUser.email, // Assuming email is part of currentUser
    fullName: currentUser.fullName, // Assuming fullName is part of currentUser
  })
  const [submitStatus, setSubmitStatus] = useState('')

  useEffect(() => {
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

    if (currentUser.email) {
      fetchRoomCode()
    }
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
        'http://localhost:3001/api/auth/leave-requests',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )
      if (response.ok) {
        
        setFormData({ ...formData, fromDate: '', toDate: '', reason: '' })
        alert('Success! Your leave request has been submitted.') // Alert for success
      } else {
        throw new Error('Failed to submit leave request.')
      }
    } catch (error) {
      setSubmitStatus(error.message)
      alert(error.message) // Alert for error
    }
  }

  return (
    <div className='room-request-form-container'>
      <div className='room-request-form'>
        <h2 className='form-header'>Leave Request Form</h2>
        <form onSubmit={handleSubmit} className='request-form'>
          <div className='leave-form-group static'>
            <label>Email: </label>
            <span className='static-field'>{formData.email}</span>
          </div>
          <div className='leave-form-group static '>
            <label>Full Name: </label>
            <span className='static-field'>{formData.fullName}</span>
          </div>
          <div className='leave-form-group static'>
            <label>Room Code: </label>
            <span className='static-field'>{formData.roomcode}</span>
          </div>
          <div className='leave-form-group'>
            <label>From Date: </label>
            <input
              type='date'
              name='fromDate'
              className='leave-form-control'
              value={formData.fromDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className='leave-form-group'>
            <label>To Date: </label>
            <input
              type='date'
              name='toDate'
              className='leave-form-control'
              value={formData.toDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className='leave-form-group'>
            <label>Reason: </label>
            <input
              type='text'
              name='reason'
              className='leave-form-control'
              value={formData.reason}
              maxLength={25}
              onChange={handleChange}
              required
            />
          </div>
          <button type='submit' className='submit-button'>
            Submit Request
          </button>
        </form>
        {submitStatus && <p className='submit-status'>{submitStatus}</p>}
      </div>
    </div>
  )
}

export default LeaveRequestUserComponent
