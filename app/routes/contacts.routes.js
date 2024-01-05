const express = require("express")
const router = express.Router()
const {getContacts, showContact, createContact, updateContact, deleteContact} = require('../controllers/contact.controller')
const validateToken = require("../middleware/validateToken.handler")

router.use(validateToken)

router.route('/').get(getContacts)

router.route('/').post(createContact)

router.route('/:id').get(showContact)

router.route('/:id').put(updateContact)

router.route('/:id').delete(deleteContact)

module.exports = router