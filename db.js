const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// A singleton to ensure we only start the database once
// assign the MongoMemoryServer instance to mongoServer
let mongoServer;
const URL  ='mongodb+srv://bhumir:bhumi@cluster0.u0lqlrf.mongodb.net/?retryWrites=true&w=majority'


const startDatabase = async () => {
  // Your code here
  await mongoose.connect(URL);
};

const stopDatabase = async () => {
  // Your code here
  await mongoose.disconnect(URL);
};

const isConnected = () => {
  return mongoose.connection.readyState === 1;
}

module.exports = { startDatabase, stopDatabase, isConnected };
