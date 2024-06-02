import React, { useEffect, useState } from 'react';
import './NotificationComponent.css'; // Make sure the path is correct

const NotificationComponent = ({ userEmail }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/api/auth/notifications/${userEmail}`)
            .then(res => res.json())
            .then(data => setNotifications(data))
            .catch(err => console.error(err));
    }, [userEmail]);

    const markAsRead = (id) => {
        fetch(`http://localhost:3001/api/auth/notifications/read/${id}`, { method: 'PATCH' })
            .then(() => setNotifications(notifications.map(notif => notif._id === id ? { ...notif, readStatus: true } : notif)))
            .catch(err => console.error(err));
    };

    const deleteNotification = (id) => {
        fetch(`http://localhost:3001/api/auth/notifications/${id}`, { method: 'DELETE' })
            .then(() => setNotifications(notifications.filter(notif => notif._id !== id)))
            .catch(err => console.error(err));
    };

    return (
        <div className="notification-container">
            <ul className="notification-list">
                {notifications.map(notif => (
                    <li key={notif._id} className={`notification-item ${!notif.readStatus ? 'unread' : ''}`}>
                        <div className="notification-text">{notif.message}</div>
                        <div>
                            <button onClick={() => markAsRead(notif._id)} className="notification-button">
                                Mark as Read
                            </button>
                            <button onClick={() => deleteNotification(notif._id)} className="notification-button delete">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationComponent;
