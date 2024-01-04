const asyncHandler = require('express-async-handler')

//@desc Get all contacts
//@routes GET /api/contacts
//@acces public
const getContact = asyncHandler(async (req,res)=>{
    res.status(200).json({message: "Get contacts"})
})

//@desc Show contact
//@routes GET /api/contacts/1
//@acces public
const showContact = asyncHandler(async (req,res)=>{
    res.status(200).json({message: "Get show contact"})
})
//@desc Create contact
//@routes POST /api/contacts/1
//@acces public
const createContact = asyncHandler(async (req,res)=>{
    console.log(req.body)
    const {name, email, phone} = req.body
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All fields are mandatory")
    }

    res.status(200).json({message: "Create contact"})
})

//@desc Update contact
//@routes PUT /api/contacts/1
//@acces public
const updateContact = asyncHandler(async (req,res)=>{
    res.status(200).json({message: "Update contact"})
})

//@desc Delete contact
//@routes delete /api/contacts/1
//@acces public
const deleteContact = asyncHandler(async (req,res)=>{
    res.status(200).json({message: "Delete contact"})
})


module.exports = {getContact, showContact, createContact, updateContact, deleteContact}