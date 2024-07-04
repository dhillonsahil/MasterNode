const express = require("express");
const {connectToDB} = require('./connection')
const path= require('path')
const {restrictTo,checkForAuthentication} = require('./middlewares/auth')
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(checkForAuthentication)

const StaticRouter = require('./routes/staticRouter');
const URL = require("./models/url");


app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));
connectToDB().then(()=>{
    console.log('connected to db')
}).catch((err)=>{
    console.log(err)
});

app.listen(8001, () => {
    console.log(`Server started  http://localhost:8001`);
});

app.get("/url/:shortid",async(req,res)=>{
    const shortId = req.params.shortid
    const entry = await URL.findOneAndUpdate({shortId:shortId},{$push:{visitHistory:{timestamp:Date.now()}}});

    res.redirect(entry.redirectUrl);
})

app.use('/api/url' ,restrictTo('Normal'), require('./routes/url'));
app.use('/api/user', require('./routes/user'));
app.use('/',StaticRouter);