import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { useAuth } from '../contexts/AuthContext';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const { updateCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setSuccessMessage('Login successful! Redirecting...');
        let role = data.data.role;
        if(updateCurrentUser) {
          updateCurrentUser();
        } else {
          console.log("updateCurrentUser not found:", updateCurrentUser);
        }
        setTimeout(() => {
            if (role === 'admin') {
                console.log("navigating to admin dashboard");
                navigate('/admindashboard');
            } else {
              console.log("navigating to user dashboard");
                navigate('/userdashboard');
            }
        }, 3000); // Redirect after 3 seconds
        //navigate('/profile'); // Adjust according to your routing
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Login failed');
        
      }
    } catch (error) {
      setErrorMessage('Login request failed with error: ' + error.message);
    }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <div className="input-group">
          <input 
            type="password" 
            placeholder="Password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        <div className="register-link" style={{ textAlign: 'center', opacity: 0.5, marginTop: '10px' }}>
          Don't have an account? <a href="/signup" style={{ display: 'inline-block', color: '#ef5913' }}>Register Now</a>
        </div>
        <div className="forgot-link" style={{ textAlign: 'center', opacity: 0.5, marginTop: '10px' }}>
          Forgot your password? <a href="/forgot-password" style={{ display: 'inline-block', color: '#ef5913' }}>Reset here</a>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
