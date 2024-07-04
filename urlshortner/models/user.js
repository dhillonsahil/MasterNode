const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   name:{
    type:String,
    required:true
   },email:{
    type:String,
    required:true,
    unique:true
   },password:{
    type:String,
    required:true
   },role:{
      type:String,
      required:true,
      default:"Normal"
   }
},{timestamps:true});

const User = mongoose.model('user',UserSchema);
module.exports = User;