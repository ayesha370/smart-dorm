import React from 'react'
import Sidebar from '../Components/Sidebar'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ConfirmEmailComponent from '../Components/ConfirmEmailComponent';
const ConfirmEmail = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const confirmToken = params.confirmToken;
    console.log("confirmToken: ", confirmToken);

    useEffect(() => {
        if (currentUser) {
            const targetPath = currentUser.role === 'admin' ? '/admindashboard' : '/userdashboard';
            navigate(targetPath);
        }
    }, [currentUser, navigate]);
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <ConfirmEmailComponent confirmToken={confirmToken} />
        </div>
    )
}

export default ConfirmEmail