var mongoose = require('mongoose')
var fileDataSchema = require('./fileSchema')


mongoose.model('FileDataModel', fileDataSchema)
module.exports = mongoose.model('FileDataModel')