const express = require("express")
const router = express.Router()
const {getContact, showContact, createContact, updateContact, deleteContact} = require('../controllers/contact.controller')

router.route('/').get(getContact)

router.route('/').post(createContact)

router.route('/:id').get(showContact)

router.route('/:id').put(updateContact)

router.route('/:id').delete(deleteContact)

module.exports = router