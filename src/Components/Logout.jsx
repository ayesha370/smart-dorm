// import { useNavigate } from 'react-router-dom';

// const Logout = () => {
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.removeItem('token'); // Clear the token
//         navigate('/'); // Redirect to login page
//     };

//     return (
//         <button onClick={handleLogout}>Logout</button>
//     );
// };

// export default Logout;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Adjust the import path as per your directory structure

const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (logout) {
            logout(); // Clears the token and currentUser state
            navigate('/'); // Redirects to login page
        } else {
            console.error('Logout function not found');
        }
    };


    return (
        <div onClick={handleLogout} style={{ cursor: 'pointer' }}>
            Logout
        </div>
    );
};

export default Logout;
