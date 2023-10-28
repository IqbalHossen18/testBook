const express = require("express");
const Users = require("../model/Users");
const router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs')
const JWT_secret = "harryisagoodb$oy"
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');

//creating a user with port : http://localhost:5000/api/auth/newuser
router.post("/newuser", [
    body('name' , "Name should min 3 charecter").isLength({min:3}),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must be at least 5 charecter").isLength({min: 5}),
] , async (req, res) => {
    let success = false;
    const valid = validationResult(req)
    if(!valid.isEmpty()){
        return res.status(400).json({ success, error: valid.array()})
    }
    try {
        let newuser = await Users.findOne({email: req.body.email})
        if(newuser){
            return res.status(400).json({success, error:'Users already exists'})
        }
        const salt = await bcrypt.genSalt(10);
        let securepassword = await bcrypt.hash(req.body.password, salt);
        newuser = await Users.create({
            name: req.body.name,
            email: req.body.email,
            password: securepassword
        })
        //  await newuser.save()
        //  res.send(newuser)

        const data = {
            newuser:{
                id: Users.id
            }
        }

        const token = jwt.sign(data, JWT_secret)
        success = true;
        res.json({success,token})    
    } catch (error) {
        console.error(error)
         res.status(500).send('Internal Server Error')
    }
     
});

//login endpoints for user at the port : http://localhost:5000/api/auth/login.....? 

router.post('/login', [
    body("email", "Enter your valid email").isEmail(),
    body('password' ,"Password cannot be blunk").exists()
], async (req, res)=>{
    let success = false;
    const valid = validationResult(req);
    if(!valid.isEmpty()){
        return res.status(400).json({success, error: valid.array()})
    }
    const {password, email} = req.body;
    try {
        let user = await Users.findOne({email})
        if(!user){
            return res.status(400).json({success, error: 'Please try to login with correct credintials'})
        }
        const passwordcompare = await bcrypt.compare(password, user.password)
        if(!passwordcompare){
            return res.status(400).json({success, error: 'Please try to login with correct credintials'})
        }
        const data = {
            user:{
                id: user.id
            }
        }
        const token = jwt.sign(data, JWT_secret)
        success = true;
        res.json({success, token})

    } catch(error) {
        res.status(500).send('Internal Server Error')
    }

 })

//get loged in user info at:: http://localhost:5000/api/auth/getuser........login required

router.post('/getuser', fetchuser, async(req, res)=>{
     try {
        const userid = req.user.id ;
        const user = await Users.findById(userid).select('-password');
        res.send(user)
     } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
     }
})

module.exports = router;
