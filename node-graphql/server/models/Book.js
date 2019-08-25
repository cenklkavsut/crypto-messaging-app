var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
  id: String,
  username: String,
  password: String,
  currentRoom: String,
  recipient: String,
  sender: String,
  passphrase: String,
  //updated_date: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Book', BookSchema);