const express = require('express');
const router = express.Router();
const {handleUserSignup,handleLoginUser} =require('../controllers/user')

router.post("/",handleUserSignup);
router.post("/login",handleLoginUser);

module.exports = router;