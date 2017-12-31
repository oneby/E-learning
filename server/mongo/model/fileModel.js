const mongoose = require('mongoose')
const fileDataSchema = require('./../schema/fileSchema')


mongoose.model('FileDataModel', fileDataSchema)
module.exports = mongoose.model('FileDataModel')