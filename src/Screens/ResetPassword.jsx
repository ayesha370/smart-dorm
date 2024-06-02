import React from 'react'
import Sidebar from '../Components/Sidebar'
import ResetPasswordComponent from '../Components/ResetPasswordComponent'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
const ResetPassword = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const resetId = params.resetId;

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
            <ResetPasswordComponent resetId={resetId} />
        </div>
    )
}

export default ResetPassword;