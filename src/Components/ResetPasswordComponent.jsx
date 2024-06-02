import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

function ResetPasswordComponent({ resetId }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();
  console.log(resetId);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/auth/reset-password/${resetId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setSuccessMessage('Password reset successful! Redirecting to login page...');
        setTimeout(() => {
            navigate('/login');
            
        }, 3000); // Redirect after 3 seconds
        //navigate('/profile'); // Adjust according to your routing
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Password reset failed');
        
      }
    } catch (error) {
      setErrorMessage('Reset Password request failed');
    }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        {/* {errorMessage && <div className="error-message">{errorMessage}</div>} */}
        <div className="input-group">
          <input 
            type="password" 
            placeholder="Password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <div className="input-group">
          <input 
            type="password" 
            placeholder="Confirm Password" 
            required 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
        </div>
        <button type="submit" className="login-button">Reset Password</button>
        
      </form>
    </div>
  );
}

export default ResetPasswordComponent;
