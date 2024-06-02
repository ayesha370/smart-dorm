import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import './NoRoomMessage.css'
const NoRoomMessage = () => {
    const navigate = useNavigate();


    const handleRoomRequest = () => {
        navigate('/roomallocationuser');
    };

    return (
        <div
      style={{
        display: 'flex',
        width: '100%',
      }}
    >
        <Sidebar />
        <div className='noRoom-container'>
        <div className='noRoom-content'>
            <h2 className='noRoom-heading'>No Room Allocated</h2>
            <p className='noRoom-message'>You haven't been allotted a room yet. Please request for room allocation.</p>
            <button onClick={handleRoomRequest} className='noRoom-button'>
                Request Room Allocation
            </button>
        </div>
    </div>
    </div>
    );
};

export default NoRoomMessage;
