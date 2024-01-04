const express = require('express')
const route = express.Router()

route.post('/register', (req,res) => {
    res.json({message: "Register the user"})
})

route.post('/login', (req,res) => {
    res.json({message: "Login the user"})
})

route.post('/auth', (req,res)=>{
    res.json({message: "Authenticated user"})
})

module.exports = route