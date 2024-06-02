import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthenticationHandler = ({ children }) => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (window.location.pathname === '/' && currentUser) {
            // Redirect from login if already authenticated
            const targetPath = currentUser.role === 'admin' ? '/admindashboard' : '/userdashboard';
            navigate(targetPath);
        }
    }, [currentUser, navigate]);

    return children;
};

export default AuthenticationHandler;
