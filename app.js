const express = require('express')
const errorHandler = require('./app/middleware/error.handler')
const dotenv = require("dotenv").config()

const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use('/api/contacts', require('./app/routes/contacts.routes'))
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})