const express = require('express')
const router = express.Router()
const {getAllUsers,createUsers} = require('../controllers/users')

router.route('/users').get(getAllUsers).post(createUsers)

module.exports = router