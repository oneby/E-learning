var mongoose = require('mongoose')
var Schema = mongoose.Schema

var FileDataSchema = new Schema({
    fileName: String,
    filePath: String
})

FileDataSchema.methods = {

}
module.exports = FileDataSchema