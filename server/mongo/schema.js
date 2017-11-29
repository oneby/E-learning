const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const UserDataSchema = new Schema({
    name: String,
    password: String,
    email: String,
    role: String
})
UserDataSchema.methods = {
    comparePassword: (_userPassword, callback) => {
        bcrypt.compare(_userPassword, this.password, (err, isMatch) => {
            if (err) {
                return callback(err)
            }
            callback(null, isMatch)
        })
    }
}
module.exports = UserDataSchema