const express = require('express')
const router = express.Router()


router.route('/signup', signup)
router.route('/login', login)

module.exports = router