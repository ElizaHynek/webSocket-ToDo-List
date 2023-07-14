const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000)
});
const io = socket(server);

const tasks = [];

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

io.on('connection', (socket) => {
  console.log('Oh, I\'ve got something from ' + socket.id);
  socket.emit('updateData', tasks);

  socket.on('addTask', (task) => {
    console.log('Task added');
    tasks.push(task);
    socket.broadcast.emit('addTask', task);
  });

  socket.on('removeTask', (task) => {
    console.log('Task removed');
    tasks.pop(task);
    socket.broadcast.emit('removeTask', task);
  });
});