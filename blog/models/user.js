const { Schema,model } = require('mongoose')
const {createHmac,randomBytes} = require('crypto')
const {createTokenForUser}= require('../services/auth')
const UserSchema =new Schema({
    fullName:{
        type:String,required:true
    },email:{
        type:String,required:true,unique:true
    },password:{
        type:String,required:true
    },salt:{
        type:String
    },profileImageURL:{
        type:String,
        default:"/images/avatar.png"
    },role:{
        type:String,
        enum :['USER','ADMIN'],
        default:'USER'
    }
},{timestamps:true})


UserSchema.pre('save',function(next){
    const user =this;
    if(!user.isModified('password'))return;
    const salt=randomBytes(16).toString();
    const hashedPassword = createHmac('sha256',salt).update(user.password).digest("hex");

    this.salt=salt;
    this.password=hashedPassword;
    next();
})

UserSchema.static('matchPasswordAndGenerateToken',async function(email,password){
    const user =await this.findOne({email});
    if(!user) throw new Error("User Not found");
    const hashedPassword = createHmac('sha256',user.salt).update(password).digest("hex");
    if(hashedPassword!==user.password) throw new Error("Incorrect Password");
    const token= createTokenForUser(user);
    return token;
})

const User= model('user',UserSchema)
module.exports = User;