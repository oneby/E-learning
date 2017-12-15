var mongoose = require('mongoose')
var fileDataSchema = require('./../schema/fileSchema')


mongoose.model('FileDataModel', fileDataSchema)
module.exports = mongoose.model('FileDataModel')