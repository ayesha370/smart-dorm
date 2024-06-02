import React from 'react'
import logo from '../assets/images/logo4.png'
import video from '../assets/video.mp4'
import './LandingPage.css'
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { useEffect } from 'react';


const LandingPage = () => {

  // const navigate = useNavigate();
  // const { currentUser } = useAuth();
  // useEffect(() => {
  //     // Redirect if the user is already logged in
  //     if (currentUser) {
  //         console.log("user already logged in");
  //         const targetPath = currentUser.role === 'admin' ? '/admindashboard' : '/userdashboard';
  //         navigate(targetPath, { replace: true });
  //     } else { 
  //         console.log("user not logged in");
  //     }
  // }, [ ]);



  return (
    <div className='container-fluid p-0'>
      <nav className='navbar'>
        <div className='navbar-brand'>
          <img src={logo} alt='Smart Dorm Logo' className='landing-logo' />
          <span className='navbar-title'>Smart Dorm</span>
        </div>
        <div className='navbar-links'>
          <a className='nav-link' href='/login'>
            Login
          </a>
          <a className='nav-link' href='/signup'>
            Sign Up
          </a>
        </div>
      </nav>

      <div className='masthead'>
        <video autoPlay loop muted className='background-video'>
          <source src={video} type='video/mp4' />
        </video>
        <div className='overlay'></div>

        <div className='masthead-content'>
          <h1>Smart Dorm</h1>
          <p className='lead'>Your Ultimate Dorm Companion at a Tap!</p>
          <a className='btn-get-started' >
          <Link to="/login">Get Started</Link>
          </a>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
