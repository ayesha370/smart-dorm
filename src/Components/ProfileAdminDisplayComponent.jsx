  import React, { useEffect, useState } from 'react';
  import { Card, Button } from 'react-bootstrap';
  import { PersonCircle } from 'react-bootstrap-icons';
  import { useAuth } from '../contexts/AuthContext';
  import { Link } from 'react-router-dom';
  import './ProfileAdminDisplayComponent.css';

  const ProfileAdminDisplayComponent = () => {
    const { currentUser } = useAuth();
    const [userDetails, setUserDetails] = useState({
      fullName: '',
      email: '',
      role: '',
      dateOfBirth: '',
    });

    useEffect(() => {
      if (currentUser && currentUser.email) {
        fetchUserProfile();
      }
    }, [currentUser]);

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/auth/user/profile/${currentUser.email}`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (response.ok) {
          const data = await response.json();
          const formattedDateOfBirth = data.dateOfBirth
            ? new Date(data.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            : 'No Date of Birth Provided';
          setUserDetails({
            fullName: currentUser.fullName,
            email: currentUser.email,
            role: currentUser.role,
            dateOfBirth: formattedDateOfBirth,
          });
        } else {
          console.error('Failed to fetch user details.');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    return (
      <div className='admin-profile-card-container'>
        <Card className='admin-profile-card'>
          <Card.Body className='admin-profile-card-body'>
            <PersonCircle size={90} className='admin-profile-icon mb-4' />
            <Card.Title className='admin-profile-card-title'>Profile Details</Card.Title>
            
            <div className='admin-profile-details-container'>
              <div className='admin-profile-details-left'>
              <div className='admin-break'> 
                {renderProfileDetail('Name', userDetails.fullName)}
                </div>
                <div className='admin-break'> 
                {renderProfileDetail('Email', userDetails.email)}
                </div>
                <div className='admin-break'> 
                {renderProfileDetail('Role', userDetails.role)}
                </div>
                <div className='admin-break'> 
                {renderProfileDetail('Date of Birth', userDetails.dateOfBirth)}
                </div>
              </div>
              <div className='admin-profile-details-right'>
                <Link to='/adminsettings' className='admin-profile-edit-link'>
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

  export default ProfileAdminDisplayComponent;
