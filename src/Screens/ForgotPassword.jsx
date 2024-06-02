import React from 'react'
import Sidebar from '../Components/Sidebar'
import { useNavigate } from 'react-router-dom';
import ForgotPasswordComponent from '../Components/ForgotPasswordComponent';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
const ForgotPassword = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    useEffect(() => {
        // Redirect if the user is already logged in
        if (currentUser) {
            const targetPath = currentUser.role === 'admin' ? '/admindashboard' : '/userdashboard';
            navigate(targetPath);
        }
    }, [currentUser, navigate]);
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <ForgotPasswordComponent />
        </div>
    )
}

export default ForgotPassword;