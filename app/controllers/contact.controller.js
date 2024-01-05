const asyncHandler = require('express-async-handler')
const Contact = require('../models/contact.model')

//@desc Get all contacts
//@routes GET /api/contacts
//@acces private
const getContacts = asyncHandler(async (req,res)=>{
    const contacts = await Contact.find({user_id: req.user.id})
    res.status(200).json({contacts})
})

//@desc Show contact
//@routes GET /api/contacts/1
//@acces private
const showContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User is not authorized")
    }
    res.status(200).json({contact})
})

//@desc Create contact
//@routes POST /api/contacts/1
//@acces private
const createContact = asyncHandler(async (req,res)=>{
    console.log(req.body)
    const {name, email, phone} = req.body
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All fields are mandatory")
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(201).json({message: contact})
})

//@desc Update contact
//@routes PUT /api/contacts/1
//@acces private
const updateContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User is not authorized")
    }
    

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true},
    )
    res.status(200).json({updatedContact})
})

//@desc Delete contact
//@routes delete /api/contacts/1
//@acces private
const deleteContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User is not authorized")
    }

    await Contact.findOneAndDelete(req.params.id)
    res.status(200).json({contact})
})


module.exports = {getContacts, showContact, createContact, updateContact, deleteContact}