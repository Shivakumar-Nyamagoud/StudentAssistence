// chatModel.js
const mongoose = require('mongoose');

// Define the schema for chat history
const chatSchema = new mongoose.Schema({
  user: String,
  bot: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Create a model based on the schema
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
