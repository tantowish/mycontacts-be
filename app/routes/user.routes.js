const express = require('express')
const router = express.Router()
const {registerUser, loginUser, authUser} = require('../controllers/user.controller')
const validateToken = require('../middleware/validateToken.handler')

router.route('/register').post(registerUser)

router.route('/login').post(loginUser)

router.route('/auth').get(validateToken, authUser)

module.exports = router