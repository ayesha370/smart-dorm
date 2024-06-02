import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import './ProfileAdminComponent.css'

const ProfileAdminComponent = () => {
  const { currentUser } = useAuth()
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    dateOfBirth: '',
  })
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/auth/user/profile/${currentUser.email}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        if (response.ok) {
          const data = await response.json()
          const dateOfBirth = new Date(data.dateOfBirth)
            .toISOString()
            .split('T')[0]
          setUserDetails({ ...data, dateOfBirth })
        } else {
          setMessage('Failed to fetch user details.')
        }
      } catch (error) {
        setMessage('Error fetching user details.')
      }
    }
    fetchUserDetails()
  }, [currentUser.email])

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        `http://localhost:3001/api/auth/user/profile/${currentUser.email}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(userDetails),
        }
      )

      if (response.ok) {
        setMessage('Profile updated successfully.')
      } else {
        setMessage('Failed to update profile.')
      }
    } catch (error) {
      setMessage('Error updating profile.')
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        `http://localhost:3001/api/auth/user/change-password/${currentUser.email}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ currentPassword, newPassword }),
        }
      )

      if (response.ok) {
        setMessage('Password changed successfully.')
        setCurrentPassword('')
        setNewPassword('')
      } else {
        setMessage('Failed to change password.')
      }
    } catch (error) {
      setMessage('Error changing password.')
    }
  }

  return (
    <div className='setting-profile-container'>
      <h2>Profile Settings</h2>
      <p className='setting-description-text'>
        Update your profile and password to personalize your experience.
      </p>
      <hr />
      {message && <p>{message}</p>}
      <form onSubmit={handleUpdateProfile} className='setting-profile-form'>
        <div className='setting-form-row'>
          <div className='setting-form-group'>
            <label htmlFor='fullName'>Full Name:</label>
            <input
              id='fullName'
              type='text'
              value={userDetails.fullName}
              onChange={(e) =>
                setUserDetails({ ...userDetails, fullName: e.target.value })
              }
            />
          </div>
          <div className='setting-form-group'>
            <label htmlFor='dateOfBirth'>Date of Birth:</label>
            <input
              id='dateOfBirth'
              type='date'
              value={userDetails.dateOfBirth}
              onChange={(e) =>
                setUserDetails({ ...userDetails, dateOfBirth: e.target.value })
              }
            />
          </div>
        </div>

        <div className='setting-button-container '>
          <button className='setting-button' type='submit'>
            Update Profile
          </button>
        </div>
      </form>
      <hr />
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword} className='setting-password-form'>
        <div className='setting-form-row'>
          <div className='setting-form-group'>
            <label htmlFor='currentPassword'>Current Password:</label>
            <input
              id='currentPassword'
              type='password'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className='setting-form-group'>
            <label htmlFor='newPassword'>New Password:</label>
            <input
              id='newPassword'
              type='password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
        <div className='setting-button-container'>
        <button className='setting-button' type='submit'>
          Change Password
        </button>
        </div>
        
      </form>
    </div>
  )
}

export default ProfileAdminComponent
