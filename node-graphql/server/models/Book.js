var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
  id: String,
  username: String,
  password: String,
});

module.exports = mongoose.model('Book', BookSchema);