const mongoose = require('mongoose')
const UserDataSchema = require('./../schema/userSchema')


mongoose.model('UserDataModel', UserDataSchema)
module.exports = mongoose.model('UserDataModel')