const express = require('express');
const URL = require('../models/url');
const router = express.Router();

const {restrictTo,checkForAuthentication} = require('../middlewares/auth')

router.get("/",restrictTo(["Normal","Admin"]) ,async (req,res)=>{

    // if(!req.user) return res.redirect("/login");
    const allUrl = await URL.find({createdBy:req.user._id});

    return res.render("home",{
        urls:allUrl
    })
})


router.get("/admin/urls",restrictTo(["Admin"]) ,async (req,res)=>{

    // if(!req.user) return res.redirect("/login");
    const allUrl = await URL.find({});

    return res.render("home",{
        urls:allUrl
    })
})

router.get("/signup",async (req,res)=>{
    return res.render("signup")
})

router.get("/login",async (req,res)=>{
    return res.render("login")
})
module.exports= router;