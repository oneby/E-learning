var mongoose = require('mongoose')
var UserDataSchema = require('./../schema/userSchema')


mongoose.model('UserDataModel', UserDataSchema)
module.exports = mongoose.model('UserDataModel')