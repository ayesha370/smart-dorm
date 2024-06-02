import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar';
import HeaderAdmin from '../Components/HeaderAdmin';
import SidebarAdmin from '../Components/SidebarAdmin';

const RoomAlloted = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:3001/api/auth/users/user');  // Adjusted endpoint to match your routes
            if (response.ok) {
                const fetchedUsers = await response.json();
                const userPromises = fetchedUsers.map(async user => {
                    const roomResponse = await fetch(`http://localhost:3001/api/auth/ooccupied/${user.email}`);
                    const roomData = await roomResponse.ok ? await roomResponse.json() : { room: false };
                    return { ...user, roomAlloted: roomData.room ? `Room ${roomData.room}` : 'No room allocated' };
                });
                Promise.all(userPromises).then(setUsers);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div style={{ display: 'flex' }}>
            <SidebarAdmin/>
            <div style={{ maxWidth: '800px', width: '100%', padding: '20px'}}>
                <HeaderAdmin title='User Room Status' />
                <table style={{ height: '400px', width: '100%', marginLeft:'350px',marginTop: '100px', borderCollapse: 'collapse' , boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Email</th>
                            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Room Allotted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.email} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ padding: '8px' }}>{user.email}</td>
                                <td style={{ padding: '8px' }}>{user.roomAlloted}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RoomAlloted;