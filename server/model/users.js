const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
  userid: {type: Number, unique:true},
  username: String,
  email: {type:String, unique:true},
  password: String,
  firstName: String,
  lastName: String,
  gender: String,
  birthday: {type: Date}
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;