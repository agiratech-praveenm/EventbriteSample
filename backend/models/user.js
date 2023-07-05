const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  accessToken: {type:String, default:null},
});

module.exports = mongoose.model('User', userSchema);
