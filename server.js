const express = require('express');
//const { v4: uuidv4 } = require('uuid');
const path = require('path');
const socket = require('socket.io');


const app = express();
const cors = require('cors');

const db = require('./data/db.js');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/build')));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ "message": "Not found..."});
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);
io.on('connection', (socket) => {
  console.log(`New socket: ${socket.id}`);

  socket.on('seatsUpdated', () => {
    console.log('Seats Updated');
  });

  /*
  socket.emit('updateData', tasks);

  socket.on('addTask', (task) => {
    console.log('Adding new task', task);
    tasks.push(task);
    socket.broadcast.emit('addTask', task);
  });

  socket.on('removeTask', idx => {
    console.log(`Removing task ${idx}`);
    tasks.splice(tasks.findIndex(i => i.idx === idx), 1);
    socket.broadcast.emit('removeTask', idx);
  });
  */
});