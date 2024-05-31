// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
// const authMiddleware = require('./middleware/authMiddleware');

// const app = express();

// app.use(cors());
// app.use(express.json()); // Body parser

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
// .then(() => console.log('DB connection successful!'))
// .catch((error) => console.error('DB connection error:', error));


// // Routes
// app.use('/api/auth', authRoutes);

// // Protected route example
// app.get('/api/protected', authMiddleware.protect, (req, res) => {
//   res.status(200).json({ status: 'success', message: 'You accessed a protected route' });
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
///////////////////////////////////////////////////////////////////////////////////////////////



// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log('MongoDB connection error: ' + err));

// app.use('/api/auth', authRoutes);

// const server = http.createServer(app);
// const io = socketIo(server, {
//     cors: {
//         origin: "http://localhost:3000",  // Adjust this to match your client's URL
//         methods: ["GET", "POST"]
//     }
// });

// // Chat schema and model
// const ChatSchema = new mongoose.Schema({
//     senderEmail: String,
//     receiverEmail: String,
//     message: String,
//     timestamp: { type: Date, default: Date.now }
// });

// const ChatMessage = mongoose.model('ChatMessage', ChatSchema);

// io.on('connection', (socket) => {
//     console.log('New client connected');

//     socket.on('sendMessage', (data) => {
//         const newMessage = new ChatMessage(data);
//         newMessage.save().then(() => {
//             io.emit('receiveMessage', data);
//         });
//     });

//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     });
// });

// const PORT = process.env.PORT || 3001;
// server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
///////////////////////////////////////////////////////////////////////////////////



const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const ConfirmEmailRequest = require('./models/ConfirmEmailRequest');
const ResetPasswordRequest = require('./models/ResetPasswordRequest');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 10000  })
  .then(() => {
    // To automatically remove confirmEmailRequest documents after 3 hours
    return ConfirmEmailRequest.collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 10800 }); // 10800 seconds = 3 hours
  })    
  .then(() => {
    // To automatically remove ResetPasswordRequest documents after 8 MINS
    return ResetPasswordRequest.collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 480 }); // 480 seconds = 8 MILAT
  })    
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error: ' + err));

app.use('/api/auth', authRoutes);

var sseClients = [];

//////////////////////////////// SSE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.get("/api/events", (req, res) => {
    const email = req.query.email; // Extract email from query parameters
  
    // Set up SSE headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
  
    sseClients.push({ email: email, res: res });
    // Send initial data including the email
    res.write(`data: ${email}\n\n`);
  
    // Example: Send data every 5 seconds
    setInterval(() => {
      res.write(`data: PINGING to keep connection alive for email: ${email}\n\n`);
    }, 5000);
  
    res.on("close", () => {
      console.log(`Client disconnected: ${email}`);
      // Remove the client from the sseClients array
      sseClients = sseClients.filter((client) => client.email !== email);
    });
  });
  
  //////////////////////////////// SSE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  


const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",  // Adjust this to match your client's URL
        methods: ["GET", "POST"]
    }
});

const ChatMessage= require('./models/ChatMessage')
// In server.js
io.on('connection', (socket) => {
  console.log('New client connected');

  // Load and emit historical messages
  socket.on('joinChat', async ({ senderEmail, receiverEmail }) => {
      const historicalMessages = await ChatMessage.find({
          $or: [
              { senderEmail: senderEmail, receiverEmail: receiverEmail },
              { senderEmail: receiverEmail, receiverEmail: senderEmail }
          ]
      }).sort('timestamp');
      socket.emit('chatHistory', historicalMessages);
  });

  socket.on('sendMessage', async (data) => {
      const newMessage = new ChatMessage(data);
      await newMessage.save();

      let receiverEmail = newMessage.receiverEmail;
    console.log("Receiver Email: ", receiverEmail);
    console.log("Data: ", data);
    console.log(
      "SSE Clients: ",
      sseClients.map((x) => x.email)
    );
    let receiverRes = sseClients.filter((x) => x.email === receiverEmail);
    console.log(`receiverRes: ${receiverRes}`);
    if (receiverRes.length > 0) {
      receiverRes.filter((x) => x != undefined);
      if (receiverRes[0] != undefined) {
        console.log("Sending message to: ", receiverRes[0].email);
        receiverRes[0].res.write(`data: MSG:${JSON.stringify(data)}\n\n`);
      }
    }

      io.emit('receiveMessage', data); // You might want to target this more specifically in a real app
  });

  socket.on('disconnect', () => {
      console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
