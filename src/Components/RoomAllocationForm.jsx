// import React, { useState, useEffect } from 'react';
// import './RoomAllocationForm.css';

// const RoomAllocationForm = () => {
//     const [email, setEmail] = useState('');
//     const [roomType, setRoomType] = useState('');
//     const [hostelType, setHostelType] = useState('');
//     const [availableRooms, setAvailableRooms] = useState([]);
//     const [selectedRoom, setSelectedRoom] = useState('');
//     const [fromDate, setFromDate] = useState('');
//     const [toDate, setToDate] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [userExists, setUserExists] = useState(false);
    
//     useEffect(() => {
//         if (roomType && hostelType) {
//             fetchAvailableRooms();
//         }
//         if (email) {
//                         checkUserExists();
//                     }
//     }, [roomType, hostelType, email]);

//     const checkUserExists = async () => {
//                 try {
//                     const response = await fetch(`http://localhost:3001/api/auth/users/exists?email=${email}`);
//                     const data = await response.json();
//                     setUserExists(data.exists);
//                 } catch (error) {
//                     console.error('Error checking user existence:', error);
//                     setErrorMessage('An error occurred while checking user existence.');
//                 }
//             };

// const RoomAllocationForm = () => {
//     const [email, setEmail] = useState('');
//     const [roomType, setRoomType] = useState('');
//     const [hostelType, setHostelType] = useState('');
//     const [availableRooms, setAvailableRooms] = useState([]);
//     const [selectedRoom, setSelectedRoom] = useState('');
//     const [fromDate, setFromDate] = useState('');
//     const [toDate, setToDate] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [userExists, setUserExists] = useState(false);
    
//     useEffect(() => {
//         if (roomType && hostelType) {
//             fetchAvailableRooms();
//         }
//         if (email) {
//             checkUserExists();
//         }
//     }, [roomType, hostelType, email]);

//     const checkUserExists = async () => {
//         try {
//             const response = await fetch(`http://localhost:3001/api/auth/users/exists?email=${email}`);
//             const data = await response.json();
//             setUserExists(data.exists);
//         } catch (error) {
//             console.error('Error checking user existence:', error);
//             setErrorMessage('An error occurred while checking user existence.');
//         }
//     };

//     const disableHostelOption = () => {
//         if (email && userExists) {
//             if (hostelType === 'Boys Hostel') {
//                 return <option value="Girls Hostel" disabled>Girls Hostel</option>;
//             } else if (hostelType === 'Girls Hostel') {
//                 return <option value="Boys Hostel" disabled>Boys Hostel</option>;
//             }
//         }
//         return null;
//     };

//     const fetchAvailableRooms = async () => {
//         setLoading(true);
//         try {
//             const response = await fetch(`http://localhost:3001/api/auth/occupied/available-rooms?roomType=${roomType}`);
//             const data = await response.json();
//             const rooms = data.availableRooms;
//             const halfIndex = Math.floor(rooms.length / 2);
//             const filteredRooms = hostelType === 'Boys Hostel' ? rooms.slice(0, halfIndex) : rooms.slice(halfIndex);
//             setAvailableRooms(filteredRooms);
//         } catch (error) {
//             console.error('Error fetching available rooms:', error);
//             setErrorMessage('An error occurred while fetching available rooms.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleRoomAllocation = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setErrorMessage('');

//         if (!userExists) {
//             setErrorMessage('User with this email does not exist.');
//             setLoading(false);
//             return;
//         }

//         try {
//             const response = await fetch('http://localhost:3001/api/auth/occupied/allocate', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     email,
//                     roomType,
//                     selectedRoom,
//                     fromDate,
//                     toDate
//                 }),
//             });
//             const data = await response.json();
//             setErrorMessage(data.message);
//         } catch (error) {
//             console.error('Error saving room allocation:', error);
//             setErrorMessage('An error occurred while saving the room allocation.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="allocation-form-container">
//             <h2>Allocate Room</h2>
//             <form className="allocation-form" onSubmit={handleRoomAllocation}>
//                 <input 
//                     type="email" 
//                     value={email} 
//                     onChange={e => setEmail(e.target.value)} 
//                     placeholder="Email" 
//                     required 
//                 />
//                 <select 
//                     value={hostelType} 
//                     onChange={e => setHostelType(e.target.value)}
//                     required
//                 >
//                     <option value="">Select Hostel Type</option>
//                     <option value="Boys Hostel">Boys Hostel</option>
//                     <option value="Girls Hostel">Girls Hostel</option>
//                     {disableHostelOption()}
//                 </select>
//                 {/* Rest of the form */}
//             </form>
//         </div>
//     );
// };
    
//     const fetchAvailableRooms = async () => {
//         setLoading(true);
//         try {
//             const response = await fetch(`http://localhost:3001/api/auth/occupied/available-rooms?roomType=${roomType}`);
//             const data = await response.json();
//             const rooms = data.availableRooms;
//             const halfIndex = Math.floor(rooms.length / 2);
//             const filteredRooms = hostelType === 'Boys Hostel' ? rooms.slice(0, halfIndex) : rooms.slice(halfIndex);
//             setAvailableRooms(filteredRooms);
//         } catch (error) {
//             console.error('Error fetching available rooms:', error);
//             setErrorMessage('An error occurred while fetching available rooms.');
//         } finally {
//             setLoading(false);
//         }
//     };

   
//     const handleRoomAllocation = async (e) => {
//                 e.preventDefault();
//                 setLoading(true);
//                 setErrorMessage('');
        
//                 if (!userExists) {
//                     setErrorMessage('User with this email does not exist.');
//                     setLoading(false);
//                     return;
//                 }
        
//                 try {
//                     const response = await fetch('http://localhost:3001/api/auth/occupied/allocate', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify({
//                             email,
//                             roomType,
//                             selectedRoom,
//                             fromDate,
//                             toDate
//                         }),
//                     });
//                     const data = await response.json();
//                     setErrorMessage(data.message);
//                 } catch (error) {
//                     console.error('Error saving room allocation:', error);
//                     setErrorMessage('An error occurred while saving the room allocation.');
//                 } finally {
//                     setLoading(false);
//                 }
//             };


//     return (
//         <div className="allocation-form-container">
//             <h2>Allocate Room</h2>
//             <form className="allocation-form" onSubmit={handleRoomAllocation}>
//                 <input 
//                     type="email" 
//                     value={email} 
//                     onChange={e => setEmail(e.target.value)} 
//                     placeholder="Email" 
//                     required 
//                 />
//                 <select 
//                     value={hostelType} 
//                     onChange={e => setHostelType(e.target.value)} 
//                     required
//                 >
//                     <option value="">Select Hostel Type</option>
//                     <option value="Boys Hostel">Boys Hostel</option>
//                     <option value="Girls Hostel">Girls Hostel</option>
//                 </select>
//                 <select 
//                     value={roomType} 
//                     onChange={e => setRoomType(e.target.value)} 
//                     required
//                 >
//                     <option value="">Select Room Type</option>
//                     <option value="single">Single</option>
//                     <option value="double">Double</option>
//                     <option value="three-seater">Three Seater</option>
//                 </select>
//                 <select 
//                     value={selectedRoom} 
//                     onChange={e => setSelectedRoom(e.target.value)} 
//                     required
//                 >
//                     <option value="">Select Room</option>
//                     {availableRooms.map(room => (
//                         <option key={room} value={room}>{room}</option>
//                     ))}
//                 </select>
//                 <input 
//                     type="date" 
//                     value={fromDate} 
//                     onChange={e => setFromDate(e.target.value)} 
//                     required 
//                 />
//                 <input 
//                     type="date" 
//                     value={toDate} 
//                     onChange={e => setToDate(e.target.value)} 
//                     required 
//                 />
//                 <button disabled={loading}>Assign</button>
//                 {errorMessage && <div className="error-message">{errorMessage}</div>}
//             </form>
//         </div>
//     );
// };

// export default RoomAllocationForm;
import React, { useState, useEffect } from 'react';
import './RoomAllocationForm.css';

const RoomAllocationForm = () => {
    const [email, setEmail] = useState('');
    const [roomType, setRoomType] = useState('');
    const [hostelType, setHostelType] = useState('');
    const [availableRooms, setAvailableRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [userExists, setUserExists] = useState(false);
    const [userGender, setUserGender] = useState('');

    useEffect(() => {
        if (roomType && hostelType) {
            fetchAvailableRooms();
        }
        if (email) {
            checkUserExistsAndGender();
        }
    }, [roomType, hostelType, email]);

    const checkUserExistsAndGender = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3001/api/auth/user/profile/${email}`); // Assuming endpoint to fetch user details
            const data = await response.json();
            if (data) {
                setUserExists(true);
                setUserGender(data.gender);
            } else {
                setUserExists(false);
                setUserGender('');
                alert('User does not exist.');
            }
        } catch (error) {
            console.error('Error checking user existence:', error);
            setErrorMessage('An error occurred while checking user existence.');
            alert('An error occurred while checking user existence.');
            setUserExists(false);
            setUserGender('');
        } finally {
            setLoading(false);
        }
    };

    const fetchAvailableRooms = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3001/api/auth/occupied/available-rooms?roomType=${roomType}`);
            const data = await response.json();
            const rooms = data.availableRooms;
            const halfIndex = Math.floor(rooms.length / 2);
            const filteredRooms = hostelType === 'Boys Hostel' ? rooms.slice(0, halfIndex) : rooms.slice(halfIndex);
            setAvailableRooms(filteredRooms);
        } catch (error) {
            console.error('Error fetching available rooms:', error);
            setErrorMessage('An error occurred while fetching available rooms.');
            alert('An error occurred while fetching available rooms.');
        } finally {
            setLoading(false);
        }
    };

    const handleRoomAllocation = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        if (!userExists) {
            setErrorMessage('User with this email does not exist.');
            alert('User with this email does not exist.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/auth/occupied/allocate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    roomType,
                    selectedRoom,
                    fromDate,
                    toDate
                }),
            });
            const data = await response.json();
            alert(data.message); // Alert the message from the server response
        } catch (error) {
            console.error('Error saving room allocation:', error);
            setErrorMessage('An error occurred while saving the room allocation.');
            alert('An error occurred while saving the room allocation.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="allocation-form-container">
            <h2>Allocate Room</h2>
            <form className="allocation-form" onSubmit={handleRoomAllocation}>
                <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="Email" 
                    required 
                />
                <select 
                    value={hostelType} 
                    onChange={e => setHostelType(e.target.value)} 
                    required
                >
                    <option value="">Select Hostel Type</option>
                    <option value="Boys Hostel" disabled={userGender === 'female'}>Boys Hostel</option>
                    <option value="Girls Hostel" disabled={userGender === 'male'}>Girls Hostel</option>
                </select>
                <select 
                    value={roomType} 
                    onChange={e => setRoomType(e.target.value)} 
                    required
                >
                    <option value="">Select Room Type</option>
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                    <option value="three-seater">Three Seater</option>
                </select>
                <select 
                    value={selectedRoom} 
                    onChange={e => setSelectedRoom(e.target.value)} 
                    required
                >
                    <option value="">Select Room</option>
                    {availableRooms.map(room => (
                        <option key={room} value={room}>{room}</option>
                    ))}
                </select>
                <input 
                    type="date" 
                    value={fromDate} 
                    onChange={e => setFromDate(e.target.value)} 
                    required 
                />
                <input 
                    type="date" 
                    value={toDate} 
                    onChange={e => setToDate(e.target.value)} 
                    required 
                />
                <button disabled={loading}>Assign</button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </form>
        </div>
    );
};

export default RoomAllocationForm;
