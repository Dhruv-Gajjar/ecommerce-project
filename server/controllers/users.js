const User = require('../models/Users')
const {StatusCodes} = require('http-status-codes')

const getAllUsers = async (req, res) => {
    const users = await User.find({})
    res.status(StatusCodes.OK).json(users)
}

const createUsers = async (req, res) => {
    const user = req.body
    const newUser = await User.create(user)

    res.status(StatusCodes.CREATED).json(newUser)
}

module.exports = {getAllUsers,createUsers}