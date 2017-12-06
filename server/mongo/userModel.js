var mongoose = require('mongoose')
var UserDataSchema = require('./userSchema')


mongoose.model('UserDataModel', UserDataSchema)
module.exports = mongoose.model('UserDataModel')