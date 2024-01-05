const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//@desc Register a user
//@routes POST /api/user/register
//@acces public
const registerUser = asyncHandler(async(req,res) => {
    // Destructing the body
    const {username, email, password} = req.body
    if(!username || !email || !password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }

    // If the user exist
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error("User already registered")
    }

    console.log('check')

    // Hash password
    const hashedPassword = await bcrypt.hash(password,10)
    console.log("Hashed Password: ", hashedPassword)

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    if(user){
        res.status(201).json({_id: user.id, email: user.email})
    }else{
        res.status(400)
        throw new Error("User data is not valid")
    }
})

//@desc Login a user
//@routes POST /api/user/login
//@acces public
const loginUser = asyncHandler(async(req,res) => {
    const {email,password} = req.body
    if(!email || !password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        const accesToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"20m"})
        res.status(200).json({accesToken})
    }else{
        res.status(401)
        throw new Error("Email or password is no valid")
    }
})

//@desc Authenticated user info
//@routes GET /api/user/auth
//@acces private
const authUser = asyncHandler(async(req,res) => {
    res.json(req.user)
})

module.exports = {registerUser, loginUser, authUser}