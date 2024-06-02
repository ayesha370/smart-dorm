// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// const ProtectedRoute = ({ children, roles }) => {
//     const { currentUser } = useAuth();

//     if (!currentUser) {
//         return <Navigate to="/" />;
//     }

//     if (roles && !roles.includes(currentUser.role)) {
//         return <Navigate to="/unauthorized" />;
//     }

//     return children;
// };


// export default ProtectedRoute;
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, roles }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to="/" />;
    }

    if (roles && !roles.includes(currentUser.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;
