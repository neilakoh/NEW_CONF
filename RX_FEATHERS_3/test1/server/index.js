const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const auth = require('@feathersjs/authentication');
const local = require('@feathersjs/authentication-local');
const jwt = require('@feathersjs/authentication-jwt');
const memory = require('feathers-memory');
const mongoose = require('mongoose');
const service = require('feathers-mongoose');
// const reactive = require('feathers-reactive');

const authService = require('./services/auth/index.js');
const authOptions = require('./services/auth/options.js').authOptions();

const TaskModel = require('./models/task.js');

const Testing = require('./services/tasks/index.js');

const app = express(feathers());

const options = {
  idField: '_id'
};

mongoose.Promise = global.Promise;
// Connect to your MongoDB instance(s)
mongoose.connect('mongodb://localhost:27017/feathers-account');

/** SOCKET LEVEL STARTS HERE **/
app.configure(socketio((io) => {
   io.on('connection', (socket, next) => {
     console.log('connected');

     // SOCKET LEVEL

     socket.on('disconnect', (socket) => {
       console.log('disconnected');
     });
   });

   io.use((socket, next) => {
     socket.feathers.referrer = socket.request.referrer;
     next();
   });
 }))
 .use('/todos', memory());
 /** SOCKET LEVEL ENDS HERE **/


/** FEATHERS LEVEL STARTS HERE **/

// app.use('todos', memory());

/** FEATHERS LEVEL STARTS HERE **/


const port = 3000;
let server = app.listen(port);
server.on('listening', function() {
  console.log(`Feathers application started on localhost:${port}`);
});
