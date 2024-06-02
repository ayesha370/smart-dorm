import React, { useState } from 'react';
import './SettingsComponent.css';

const SettingsComponent = ({ userDetails }) => {
  const [fullName, setFullName] = useState(userDetails.fullName);
  const [dateOfBirth, setDateOfBirth] = useState(userDetails.dateOfBirth);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    // Implement the update logic here
    console.log('Profile updated:', { fullName, dateOfBirth, newPassword });
  };

  return (
    <div className="profile-container">
      <h2>Update Profile</h2>
      <form className="profile-form" onSubmit={handleUpdate}>
        <div className="form-row">
          <label>
            Full Name:
            <input
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              value={dateOfBirth}
              onChange={e => setDateOfBirth(e.target.value)}
            />
          </label>
          <label>
            Gender:
            <input
              type="text"
              value={userDetails.gender}
              disabled
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Current Password:
            <input
              type="password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
            />
          </label>
          <label>
            New Password:
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
          </label>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default SettingsComponent;
