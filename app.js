const express = require('express')
const errorHandler = require('./app/middleware/error.handler')
const dotenv = require("dotenv").config()
const connectDB = require('./app/config/connection')

connectDB()
const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use('/api/contacts', require('./app/routes/contacts.routes'))
app.use('/api/user', require('./app/routes/user.routes'))
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})