var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
module.exports={tokenKey:"djghhhhuuwiwuewieuwieuriwu"}//

var BookSchema = new mongoose.Schema({
  id: String,
  username: {type:String,unique:true, required: true},
  password: {type: String, required: true},
});
//
BookSchema.pre('save', function (next) {//this hashes the password 
  var Book = BookSchema;
  if (!Book.isModified('password')) {return next()};
  bcrypt.hash(Book.password).then((hashedPassword) => {Book.password = hashedPassword;
      next();
  })
}, function (err) {next(err)})//this compares and allows for login
BookSchema.methods.comparePassword=function(candidatePassword,next){bcrypt.compare(candidatePassword,this.password,function(err,isMatch)
  {   if(err) return next(err);
       next(null,isMatch)
  })}
//
module.exports = mongoose.model('Book', BookSchema);