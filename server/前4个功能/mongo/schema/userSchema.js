var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcrypt')
var UserDataSchema = new Schema({
    name: String,
    password: String,
    accountnum: String,
    role: String
})

UserDataSchema.methods = {
    comparePassword: function(_userPassword, callback) {
        bcrypt.compare(_userPassword, this.password, (err, isMatch) => {
            if (err) {
                return callback(err)
            }
            callback(null, isMatch)
        })
    }
}
module.exports = UserDataSchema