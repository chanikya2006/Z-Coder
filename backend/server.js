const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
const colors = require('colors');
const http = require('http');
const { Server } = require('socket.io');

// Import initialization functions
const addproblems = require('./utils/problemsinsertion.js');
const addsolutions = require('./utils/solutioninsertion.js');
const addrooms = require('./utils/addrooms.js');
const newfunc = require('./utils/usersampleinsertion.js');
const addmessages = require('./utils/admessagetodb.js');
const { userJoin, userLeave, getCurrentUser, getRoomUsers } = require('./utils/socketusers.js');
const formatMessage = require('./utils/socketmessages.js');


const initializeApp = async () => {
  try {
   
    dotenv.config();
    
    
    if (!process.env.MONGO_URL) {
      throw new Error('MONGODB_URI not found in environment variables');
    }

    
    console.log(' Connecting to database...'.yellow);
    await connectDB();
    console.log(' Database connected successfully'.green);

   
    console.log('⏳ Initializing data...'.yellow);
    await newfunc();
    await addproblems();
    await addsolutions();
    await addrooms();
    console.log(' Data initialization complete'.green);

    
    const app = express();
    
    
    app.use(cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      credentials: true
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

  
    app.use('/contests', require('./routes/contestroute'));
    app.use('/auth', require('./routes/authroute.js'));
    app.use('/user', require('./routes/userroutes.js'));
    app.use('/problems', require('./routes/problemsroute.js'));
    app.use('/solutions', require('./routes/solutionroute.js'));
    app.use('/rooms', require('./routes/roomroute.js'));
    app.use('/messages', require('./routes/messagesroute.js'));

   
    const PORT = process.env.PORT || 5000;
    const server = http.createServer(app);

    
    const io = new Server(server, {
      cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true
      }
    });

    // Socket.io events
    io.on('connection', (socket) => {
      console.log(`Socket connected: ${socket.id}`.cyan);

      socket.on('joinRoom', ({ id, handle }) => {
        const user = userJoin(socket.id, handle, id);
        socket.join(user.room);
        console.log(`${handle} joined room ${id}`.blue);

        setTimeout(() => {
          socket.emit('recieve-message', formatMessage('Zcoder', 'Welcome to the discussion room!'));
        }, 2000);

        socket.broadcast.to(user.room).emit('recieve-message', 
          formatMessage('Zcoder', `${user.handle} has joined the chat`));

        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room),
        });
      });

      socket.on('send-message', ({ handle, text }) => {
        const user = getCurrentUser(socket.id);
        if (user) {
          socket.broadcast.to(user.room).emit('recieve-message', formatMessage(handle, text));
          addmessages(user.room, handle, text);
        }
      });

      socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`.magenta);
        const user = userLeave(socket.id);
        if (user) {
          socket.broadcast.to(user.room).emit('recieve-message', 
            formatMessage('Zcoder', `${user.handle} has left the chat`));
          io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room),
          });
        }
      });
    });

    // Start server
    server.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`.green.bold);
    });

    return { app, server, io };
  } catch (err) {
    console.error(' Initialization failed:'.red.bold, err);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:'.red.bold, err);
  process.exit(1);
});

// Start the application
initializeApp();