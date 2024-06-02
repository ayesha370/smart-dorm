import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { useAuth } from '../contexts/AuthContext';


function ConfirmEmailComponent({ confirmToken }) {
  const { currentUser } = useAuth();
  const [message, setMessage] = useState('');

  const navigate = useNavigate();




  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    // Redirect if the user is already logged in
    if (currentUser) {
      const targetPath = currentUser.role === 'admin' ? '/admindashboard' : '/userdashboard';
      navigate(targetPath);
    }


    try {
      const response = await fetch(`http://localhost:3001/api/auth/confirm-email/${confirmToken}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setMessage(data.message);
        setTimeout(() => {
          navigate('/login');
        }, 3000); //
      } else {
        const data = await response.json();
        setMessage(data.message || 'Login failed');

      }
    } catch (error) {
      setMessage('Request failed');
    }

  }

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Confirm Email Request</h2>
        <button type="submit" className="login-button">Confirm Email</button>
        <div className="register-link" style={{ textAlign: 'center', opacity: 0.5, marginTop: '10px' }}>
          {message.length > 0 ? message : 'Click to confirm email.'}
        </div>
      </form>
    </div>
  );
}

export default ConfirmEmailComponent;
