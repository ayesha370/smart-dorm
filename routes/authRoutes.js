const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path if necessary
const RoomAllocation = require('../models/RoomAllocation'); // Adjust the path if necessary
const Occupied = require('../models/Occupied'); // Ensure this path is correct
const LeaveRequest = require('../models/LeaveRequest'); // Adjust the path as per your structure
const LostFound = require('../models/LostFound'); // Adjust path as needed
const ChatMessage = require('../models/ChatMessage'); // Adjust path as needed
// Add these in server.js or a separate route file
const Notification = require('../models/Notification');

const { sendNotificationToAdmins } = require('./notificationHelper.js');
const { sendNotificationToUser } = require('./notificationHelper.js');
const { sendConfirmationEmail, sendResetPasswordEmail } = require('../utils/EmailUtils');
const { generateUUID } = require('../utils/UuidUtils');
const ConfirmEmailRequest = require('../models/ConfirmEmailRequest.js');
const ResetPasswordRequest = require('../models/ResetPasswordRequest.js');

const router = express.Router();


//////////////////////////////// SIGN UP \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Signup route (without password hashing)
router.post('/signup', async (req, res) => {
  try {
    const { email, fullName, password, dateOfBirth, gender, role } = req.body;

    const user = new User({
      email,
      fullName,
      password, // Store plaintext password (not recommended)
      dateOfBirth,
      gender,
      role,
      emailConfirmed: false
    });

    await user.save();

    // send email confirmation
    const confirmToken = generateUUID();
    const confirmRequest = new ConfirmEmailRequest({
      email,
      confirmToken
    });

    confirmRequest.save();

    // generate a string uuid
    sendConfirmationEmail(confirmToken, email);

    res.status(201).json({ userId: user._id, fullName: user.fullName });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: 'Unable to sign up', error: error.message });
  }
});

//////////////////////////////// Confirm Email \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
router.get('/confirm-email/:token', async (req, res) => {
  try {
    const { token } = req.params;
    if (!token || token.trim() === '') {
      return res.status(400).json({ message: 'Invalid token' });
    }

    const confirmRequest = await ConfirmEmailRequest.findOne({ confirmToken: token });
    console.log("Confirm Request:", confirmRequest); // Debugging log
    if (!confirmRequest) {
      return res.status(404).json({ message: 'Link expired!' });
    }
    console.log("Confirm Request:", confirmRequest); // Debugging log
    const user = await User.findOneAndUpdate({
      email: confirmRequest.email
    }, { emailConfirmed: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log("User:", user); // Debugging log
    // Delete the confirm request
    await ConfirmEmailRequest.deleteOne({ confirmToken: token });

    res.status(200).json({ message: 'Email confirmed successfully!\nRedirecting to login page....' });
  } catch (error) {
    console.error("Email Confirmation Error:", error.message);
    res.status(500).json({ message: 'Unable to confirm email', error: error.message });
  }
});

//////////////////////////////// Forgot Password \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
router.post('/forgot_password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || email.trim() === '') {
      return res.status(400).json({ message: 'Invalid email' });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = generateUUID();
    const resetRequest = new ResetPasswordRequest({
      email,
      resetToken
    });

    resetRequest.save();

    sendResetPasswordEmail(resetToken, email);

    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error("Forgot Password Error:", error.message, error);
    res.status(500).json({ message: 'Unable to send password reset link', error: error.message });
  }
});


//////////////////////////////// Reset Password \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token || token.trim() === '') {
      return res.status(400).json({ message: 'Invalid token' });
    }

    const resetRequest = await ResetPasswordRequest.findOne({ resetToken: token });
    if (!resetRequest) {
      return res.status(404).json({ message: 'Link expired!' });
    }

    const user = await User.findOneAndUpdate({
      email: resetRequest.email
    }, { password });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the reset request
    await ResetPasswordRequest.deleteOne({ resetToken: token });

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error("Reset Password Error:", error.message);
    res.status(500).json({ message: 'Unable to reset password', error: error.message });
  }
}
);


//////////////////////////////// LOG IN \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Received login request for email:", email); // Debugging log

    // Fetch the user with the password field included
    const user = await User.findOne({ email }).select('+password');

    console.log("User found:", user); // Debugging log

    // Check if user exists and password matches
    if (!user) {
      console.log("No user found with email:", email); // Debugging log
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.emailConfirmed === false && user.emailConfirmed !== undefined && user.emailConfirmed !== null) {
      return res.status(401).json({ message: 'Email not confirmed yet!' });
    }

    // Check if the passwords match
    if (user.password !== password) {
      console.log("Password mismatch for email:", email); // Debugging log
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role, email: user.email, fullName: user.fullName, gender: user.gender }, process.env.JWT_SECRET, { expiresIn: '7d' });


    // res.status(200).json({ token, userId: user._id, fullName: user.fullName });
    res.status(200).json({
      status: 'success',
      token,
      data: {
        user,
        role: user.role // send user role
      }
    });

  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: 'Unable to log in', error: error.message });
  }
});



router.post('/roomallocation', async (req, res) => {
  try {
    const allocation = new RoomAllocation(req.body);
    await allocation.save();

    // Send notification to all admins
    const message = `${req.body.fullName} has submitted a room allocation request.`;
    await sendNotificationToAdmins(message);

    res.status(201).json({ message: 'Room allocation request submitted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});






router.post('/occupied', async (req, res) => {
  try {
    const { email, roomType, selectedRoom, fromDate, toDate } = req.body;

    // Create a new Occupied document
    const newOccupied = new Occupied({
      roomcode: selectedRoom,
      roomType,
      email,
      fromDate,
      toDate
    });

    await newOccupied.save();
    res.status(201).json({ message: 'Room allocation saved successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});









////
const roomData = {
  'single': ['100a', '101a', '200a', '201a', '300a', '301a'],
  'double': ['102a', '102b', '103a', '103b', '202a', '202b', '203a', '203b', '302a', '302b', '303a', '303b'],
  'three-seater': ['104a', '104b', '104c', '204a', '204b', '204c', '304a', '304b', '304c']
};


const girls = {
  'single': ['201a', '300a', '301a'],
  'double': ['203a', '203b', '302a', '302b', '303a', '303b'],
  'three-seater': ['204a','204b', '204c', '304a', '304b', '304c']
};


const boys = {
  'single': ['100a', '101a', '200a'],
  'double': ['102a', '102b', '103a', '103b', '202a', '202b'],
  'three-seater': ['104a', '104b', '104c']
};
// Endpoint to check if a user exists
router.get('/users/exists', async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    res.status(200).json({ exists: !!user });
  } catch (error) {
    console.error('Error checking user existence:', error);
    res.status(500).json({ message: 'Error checking user existence' });
  }
});

// Endpoint to get available rooms
router.get('/occupied/available-rooms', async (req, res) => {
  try {
    const { roomType } = req.query;
    const occupiedRooms = await Occupied.find({ roomType }).select('roomcode');
    const occupiedRoomCodes = occupiedRooms.map(room => room.roomcode);
    const availableRooms = roomData[roomType].filter(roomCode => !occupiedRoomCodes.includes(roomCode));

    res.status(200).json({ availableRooms });
  } catch (error) {
    console.error('Error fetching available rooms:', error);
    res.status(500).json({ message: 'Error fetching available rooms' });
  }
});


////////////////////////////////////////////////////

const roomDataa = {
  boys: {
    'single': ['100a', '101a', '200a'],
    'double': ['102a', '102b', '103a', '103b', '202a', '202b'],
    'three-seater': ['104a', '104b', '104c']
  },
  girls: {
    'single': ['201a', '300a', '301a'],
    'double': ['203a', '203b', '302a', '302b', '303a', '303b'],
    'three-seater': ['204a','204b', '204c', '304a', '304b', '304c']
  }
};

// Route to fetch available rooms based on type (boys/girls) and room type (single, double, three-seater)
router.get('/available-rooms/:type/:roomType', async (req, res) => {
  const { type, roomType } = req.params;
  try {
    // Validate type and roomType
    if (!roomDataa[type] || !roomDataa[type][roomType]) {
      return res.status(400).json({ message: "Invalid room type or category provided." });
    }

    const roomCodes = roomDataa[type][roomType];
    const occupiedRooms = await Occupied.find({
      roomType: roomType,
      roomcode: { $in: roomCodes }
    }).select('roomcode');

    const occupiedRoomCodes = occupiedRooms.map(room => room.roomcode);
    const availableRooms = roomCodes.filter(code => !occupiedRoomCodes.includes(code));

    res.status(200).json({ availableRooms, occupiedRoomCodes });
  } catch (error) {
    console.error('Error fetching room availability:', error);
    res.status(500).json({ message: 'Error fetching room availability', error: error.message });
  }
});

///////////////////////////////////////////////////










router.post('/occupied/allocate', async (req, res) => {
  try {
    const { email, selectedRoom, roomType, fromDate, toDate } = req.body;

    // Check the role of the user
    const user = await User.findOne({ email });
    if (!user || user.role !== 'user') {
      return res.status(403).json({ message: 'Only users with user role can be assigned a room.' });
    }

    // Check if there is an existing allocation for this email
    const existingAllocation = await Occupied.findOne({ email });

    if (existingAllocation) {
      // Update the existing allocation
      existingAllocation.roomcode = selectedRoom;
      existingAllocation.roomType = roomType;
      existingAllocation.fromDate = fromDate;
      existingAllocation.toDate = toDate;

      await existingAllocation.save();
      res.status(200).json({ message: `Room allocation updated. User was already allocated in room ${existingAllocation.roomcode}, but it's updated to new details.` });
    } else {
      // Create a new allocation
      const newOccupied = new Occupied({ email, roomcode: selectedRoom, roomType, fromDate, toDate });
      await newOccupied.save();
      res.status(201).json({ message: 'Room allocated successfully.' });
    }
  } catch (error) {
    console.error('Error in room allocation:', error);
    res.status(500).json({ message: 'Error allocating room' });
  }
});


//////////////////////////////////////////////////////////////////////






// Endpoint to get all room allocations
router.get('/roomallocation/all', async (req, res) => {
  try {
    const allocations = await RoomAllocation.find().sort({ status: 1 }); // Adjust the sorting as needed
    console.log("Allocations:", allocations); // Debugging log
    res.status(200).json({ allocations });
  } catch (error) {
    console.error('Error fetching allocations:', error);
    res.status(500).json({ message: 'Error fetching allocations' });
  }
});







// // Example endpoint in authRoutes.js
// router.put('/roomallocation/update/:id', async (req, res) => {
//   try {
//       const { id } = req.params;
//       const { status } = req.body;

//       // Update the allocation status
//       const updatedAllocation = await RoomAllocation.findByIdAndUpdate(id, { status }, { new: true });
//       if (!updatedAllocation) {
//           return res.status(404).json({ message: 'Allocation not found' });
//       }
//       res.json({ message: 'Allocation status updated', updatedAllocation });
//   } catch (error) {
//       console.error('Error updating allocation:', error);
//       res.status(500).json({ message: 'Error updating allocation' });
//   }
// });
router.put('/roomallocation/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Update the allocation status
    const updatedAllocation = await RoomAllocation.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedAllocation) {
      return res.status(404).json({ message: 'Allocation not found' });
    }

    // Send notification to the specific user
    const userEmail = updatedAllocation.email; // Assuming email is stored in the room allocation
    const message = `Your room allocation request has been ${status}.`;
    await sendNotificationToUser(userEmail, message);

    // If the allocation is accepted, update or create the entry in the Occupied collection
    if (status === 'accepted') {
      const existingOccupied = await Occupied.findOne({ email: updatedAllocation.email });

      if (existingOccupied) {
        existingOccupied.roomType = updatedAllocation.roomType;
        existingOccupied.roomcode = updatedAllocation.roomNumber; // Assuming roomNumber is the field in RoomAllocation
        existingOccupied.fromDate = updatedAllocation.fromDate;
        existingOccupied.toDate = updatedAllocation.toDate;
        await existingOccupied.save();
      } else {
        const newOccupied = new Occupied({
          email: updatedAllocation.email,
          roomType: updatedAllocation.roomType,
          roomcode: updatedAllocation.roomNumber, // Mapping roomNumber to roomcode
          fromDate: updatedAllocation.fromDate,
          toDate: updatedAllocation.toDate
        });
        await newOccupied.save();
      }
    }

    res.json({ message: 'Allocation status updated', updatedAllocation });
  } catch (error) {
    console.error('Error updating allocation:', error);
    res.status(500).json({ message: 'Error updating allocation' });
  }
});


















/////////////////////////////////
//friday
router.get('/check-room-allocation/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const occupiedEntry = await Occupied.findOne({ email });
    res.status(200).json({ hasRoom: !!occupiedEntry });
  } catch (error) {
    console.error('Error checking room allocation:', error);
    res.status(500).json({ message: 'Error checking room allocation' });
  }
});







router.post('/leave-requests', async (req, res) => {
  try {
    const leaveRequest = new LeaveRequest(req.body);
    await leaveRequest.save();

    // Send notification to all admins
    const message = `${req.body.fullName} has submitted a leave request.`;
    await sendNotificationToAdmins(message);

    res.status(201).json({ message: 'Leave request submitted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.get('/occupied-room/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const occupiedRoom = await Occupied.findOne({ email: email });
    if (!occupiedRoom) {
      return res.status(404).json({ message: "No room found for this user." });
    }
    res.json({ roomcode: occupiedRoom.roomcode });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch room code", error: error.message });
  }
});













router.post('/lost-found-items', async (req, res) => {
  try {
    const item = new LostFound(req.body);
    await item.save();


    // Send notification to all admins
    const message = `${req.body.fullName} has reported a ${req.body.status} item: ${req.body.itemInfo}.`;
    await sendNotificationToAdmins(message);


    res.status(201).json({ message: 'Lost/Found item submitted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



router.get('/lost-found-item', async (req, res) => {
  try {
    const items = await LostFound.find();
    res.json(items);
  } catch (error) {
    console.error("Error fetching lost and found items:", error);
    res.status(500).json({ message: 'Error fetching lost and found items' });
  }
});











router.patch('/lost-found-items/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const item = await LostFound.findByIdAndUpdate(id, { status }, { new: true });

    if (!item) {
      return res.status(404).json({ message: "Item not found." });
    }

    // Send notification to the specific user
    const userEmail = item.email; // Assuming email is stored in the lost and found item
    const message = ` your reported item '${item.itemInfo}' has been ${status}.`;
    await sendNotificationToUser(userEmail, message);


    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});















router.get('/leave-requests', async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find().sort({ status: 1 }); // Sorting by status
    res.json(leaveRequests);
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    res.status(500).json({ message: 'Error fetching leave requests' });
  }
});

router.patch('/leave-requests/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedRequest = await LeaveRequest.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedRequest) {
      return res.status(404).json({ message: "Leave request not found." });
    }

    // Send notification to the specific user
    const userEmail = updatedRequest.email; // Assuming userEmail is stored in the leave request
    const message = `Your leave request has been ${status}.`;
    await sendNotificationToUser(userEmail, message);



    res.json(updatedRequest);
  } catch (error) {
    console.error("Error updating leave request status:", error);
    res.status(500).json({ message: "Error updating leave request status", error: error.message });
  }
});




















// Assuming you have a middleware to authenticate the user and get the user details
router.get('/user/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Assuming you want to return only certain fields
    const userDetails = {
      fullName: user.fullName,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender
    };
    res.json(userDetails);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user details', error });
  }
});

// Update user profile
router.put('/user/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { fullName, dateOfBirth } = req.body;
    const updatedUser = await User.findOneAndUpdate({ email }, { fullName, dateOfBirth }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Profile updated successfully', updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
});

// Change user password
router.put('/user/change-password/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { currentPassword, newPassword } = req.body;
    const user = await User.findOne({ email }).select('+password');

    // Replace this password check with your hashing mechanism
    if (user.password !== currentPassword) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword; // Replace with hashed password
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error changing password', error });
  }
});




























// authRoutes.js
// Add this endpoint to fetch users by role
router.get('/users/:role', async (req, res) => {
  try {
    const users = await User.find({ role: req.params.role }, 'fullName email -_id'); // Get users with only fullName and email
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});







// Fetch chat history between two users
router.get('/chat-history', async (req, res) => {
  const { user1, user2 } = req.query; // user1 and user2 represent their email addresses

  try {
    const messages = await ChatMessage.find({
      $or: [
        { senderEmail: user1, receiverEmail: user2 },
        { senderEmail: user2, receiverEmail: user1 }
      ]
    }).sort('timestamp');

    res.json(messages);
  } catch (error) {
    res.status(500).send({ message: "Error fetching chat history", error: error.toString() });
  }
});


// Route to clear chat history between two users
router.delete('/clear-chat', async (req, res) => {
  try {
    const { user1, user2 } = req.body; // Assuming you send a body with user1 and user2 emails

    // Add the logic to delete messages from the database
    // This is an example using a hypothetical 'ChatMessage' model, adjust as per your actual model
    await ChatMessage.deleteMany({
      $or: [
        { senderEmail: user1, receiverEmail: user2 },
        { senderEmail: user2, receiverEmail: user1 }
      ]
    });

    res.status(200).json({ message: 'Chat history cleared' });
  } catch (error) {
    console.error('Error clearing chat history:', error);
    res.status(500).json({ message: 'Failed to clear chat history', error: error.message });
  }
});














// Get notifications for a user
router.get('/notifications/:email', async (req, res) => {
  try {
    const notifications = await Notification.find({ recipientEmail: req.params.email });
    res.json(notifications);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Mark a notification as read
router.patch('/notifications/read/:id', async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { readStatus: true });
    res.status(200).send('Notification marked as read');
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a notification
router.delete('/notifications/:id', async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(200).send('Notification deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});










//


//



//////////////////////////////////////////////
// Route to count users with role 'user'
router.get('/countUsers', async (req, res) => {
  try {
    const count = await User.countDocuments({ role: 'user' });
    res.status(200).json({ totalUsers: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get emails and count gender distribution, then subtract from 99
router.get('/emailGenderCount', async (req, res) => {
  try {
    const occupiedEmails = await Occupied.find().select('email');
    const emails = occupiedEmails.map(o => o.email);
    const users = await User.find({ email: { $in: emails } }).select('gender');

    const boys = users.filter(user => user.gender === 'male').length;
    const girls = users.filter(user => user.gender === 'female').length;

    res.status(200).json({
      boysCount: 13 - boys,
      girlsCount: 14 - girls
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});





// File: routes/authRoutes.js
// Assuming you have an 'Occupied' model that tracks room assignments
router.get('/ooccupied/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const occupiedEntry = await Occupied.findOne({ email: email });
    if (occupiedEntry) {
      res.status(200).json({ room: occupiedEntry.roomcode });
    } else {
      res.status(404).json({ message: 'No room allocated' });
    }
  } catch (error) {
    console.error('Error fetching room allocation:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
});



///////////////////////////////////////////////


module.exports = router;
