
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

function ForgotPasswordComponent() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:3001/api/auth/forgot_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 200) {
        setSuccessMessage('Request successful!\n Check your email for password reset link.');
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Request failed');
        
      }
    } catch (error) {
      setErrorMessage('Password Reset request failed');
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
            type="email" 
            placeholder="Email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        
        <button type="submit" className="login-button">Request</button>
        <div className="register-link" style={{ textAlign: 'center', opacity: 0.5, marginTop: '10px' }}>
          Remember your password? <a href="/login" style={{ display: 'inline-block', color: '#ef5913' }}>Login here</a>
        </div>
      </form>
    </div>
  );
}

export default ForgotPasswordComponent;
