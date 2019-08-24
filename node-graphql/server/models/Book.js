var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
  id: String,
  username: String,
  password: String,
  currentRoom: String,
  recipient: String,
  message: String,
});
module.exports = mongoose.model('Book', BookSchema);