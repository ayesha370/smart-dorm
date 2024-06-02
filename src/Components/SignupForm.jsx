import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupForm.css';

const SignupForm = () => {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== repeatPassword) {
      console.error('Passwords do not match');
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          fullName,
          password,
          dateOfBirth,
          gender,
          role,
        }),
      });

      const data = await response.json();
      if (response.status === 201) {
        console.log('Signup successful:', data);
        alert("Signup successful! \n Confirm your email to activate your account. Check your email for confirmation link.");
      } else {
        console.error('Signup failed:', data.message);
        alert('Signup failed: ' + data.message);
      }
    } catch (error) {
      console.error('Signup request failed:', error);
      alert('Signup request failed: ' + error);
    }
  };

  return (
    <div className='signup-form-container'>
      <form className='signup-form' onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className='sign-form-group'>
          <label htmlFor='fullName'>Full Name</label>
          <input
            id='fullName'
            type='text'
            className='sign-form-control'
            placeholder='Full Name'
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className='sign-form-group'>
          <label htmlFor='dateOfBirth'>Date of Birth</label>
          <input
            id='dateOfBirth'
            type='date'
            className='sign-form-control'
            required
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <div className='sign-form-group'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            className='sign-form-control'
            placeholder='Email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='sign-form-group'>
          <label htmlFor='gender'>Gender</label>
          <select
            id='gender'
            className='sign-form-control'
            required
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value=''>Gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
        </div>
        <div className='sign-form-group'>
          <label htmlFor='role'>Select Role</label>
          <select
            id='role'
            className='sign-form-control'
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value=''>Select Role</option>
            <option value='user'>User</option>
            <option value='admin'>Admin</option>
          </select>
        </div>
        <div className='sign-form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            className='sign-form-control'
            placeholder='Password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='sign-form-group'>
          <label htmlFor='repeatPassword'>Repeat Password</label>
          <input
            id='repeatPassword'
            type='password'
            className='sign-form-control'
            placeholder='Repeat Password'
            required
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='signup-button'>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
