import React from 'react'
import Sidebar from '../Components/Sidebar'
import LoginForm from '../Components/LoginForm'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
const Login = () => {
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
            <LoginForm />
        </div>
    )
}

export default Login