const express = require('express')
const app = express();
const path=require('path')
require('dotenv').config()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const checkFotAuthCookie = require('./middlewares/auth');
app.use(cookieParser());
app.use(checkFotAuthCookie("token"));
app.use(express.static(path.resolve('./public')))

const Blog = require('./models/blog')

app.use(express.urlencoded({extended:false}))

mongoose.connect('mongodb://localhost:27017/blog').then((e)=>{
    console.log("Connected to db")
}).catch((err)=>{
    console.log("Unable to connect to db")
})

app.set('view engine','ejs')
app.set('views',path.resolve("./views"))



app.listen(8001, () => {
    console.log(`Server started http://localhost:${process.env.PORT}`);
});


app.get('/',async (req, res) => {  
    const allBlogs = await  Blog.find({})
    res.render('home',{
        user:req.user,
        blogs:allBlogs
    });
})


app.use('/user',require('./routes/user'))
app.use('/blog',require('./routes/blog'))