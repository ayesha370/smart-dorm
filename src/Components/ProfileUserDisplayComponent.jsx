import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import { useAuth } from '../contexts/AuthContext'; // Adjust import path as necessary
import { Link } from 'react-router-dom';
import './ProfileAdminComponent.css'; // Use the same CSS file as the admin profile component

const ProfileUserDisplayComponent = () => {
  const { currentUser } = useAuth();
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    role: '',
    roomNumber: ''
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await fetch(`http://localhost:3001/api/auth/user/profile/${currentUser.email}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (response.ok) {
        const data = await response.json();
        const formattedDateOfBirth = data.dateOfBirth
          ? new Date(data.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
          : 'No Date of Birth Provided';
        setUserDetails(prevState => ({
          ...prevState,
          fullName: data.fullName,
          email: currentUser.email,
          dateOfBirth: formattedDateOfBirth,
          role: currentUser.role
        }));
      }
    };

    const fetchRoomNumber = async () => {
      const response = await fetch(`http://localhost:3001/api/auth/occupied-room/${currentUser.email}`, {
        method: 'GET',
      });
      if (response.ok) {
        const { roomcode } = await response.json();
        setUserDetails(prevState => ({
          ...prevState,
          roomNumber: roomcode
        }));
      } else {
        setUserDetails(prevState => ({
          ...prevState,
          roomNumber: 'No Room Allocated'
        }));
      }
    };

    if (currentUser && currentUser.email) {
      fetchUserProfile();
      fetchRoomNumber();
    }
  }, [currentUser]);

  return (
    <div className='admin-profile-card-container'>
      <Card className='admin-profile-card'>
        <Card.Body className='admin-profile-card-body'>
          <PersonCircle size={90} className='admin-profile-icon mb-4' />
          <Card.Title className='admin-profile-card-title'>Profile Details</Card.Title>
          
          <div className='admin-profile-details-container'>
            <div className='admin-profile-details-left'>
              <div className='admin-break'>{renderProfileDetail('Name', userDetails.fullName)}</div>
              <div className='admin-break'>{renderProfileDetail('Email', userDetails.email)}</div>
              <div className='admin-break'>{renderProfileDetail('Date of Birth', userDetails.dateOfBirth)}</div>
              <div className='admin-break'>{renderProfileDetail('Role', userDetails.role)}</div>
              <div className='admin-break'>{renderProfileDetail('Room Number', userDetails.roomNumber)}</div>
            </div>
            <div className='admin-profile-details-right'>
              <Link to='/usersettings' className='admin-profile-edit-link'>
                <Button className='admin-profile-edit-button'>Edit Profile</Button>
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );

  function renderProfileDetail(label, value) {
    return (
      <Card.Text className='admin-profile-card-text'>
        {label}: <span className='admin-profile-card-info'>{value || 'Not provided'}</span>
      </Card.Text>
    );
  }
};

export default ProfileUserDisplayComponent;
