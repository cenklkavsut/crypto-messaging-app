var mongoose = require('mongoose');

var roomSchema = new mongoose.Schema({
  id: String,
  currentRoom: String,
  recipient: String,
  sender: String,
  passphrase: String,
});

module.exports = mongoose.model('room', roomSchema);