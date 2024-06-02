import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const logout = () => {
        // Implement logout logic
        localStorage.removeItem('token'); // Clear the token
        setCurrentUser(null); // Reset the current user
    };

    const updateCurrentUser = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log('decoded', decodedToken)
            setCurrentUser(decodedToken); // Ensure this has the role property
        }
    };

    useEffect(() => {
        updateCurrentUser();
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, logout, updateCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
