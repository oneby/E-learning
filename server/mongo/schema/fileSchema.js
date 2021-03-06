const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

const FileDataSchema = new Schema({
    from: { type: ObjectId, ref: 'UserDataModel' },
    fileName: String,
    filePath: String,
    fileSize: String,
    mimetype: String,
    imgPath: String,
    coursePrice: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

FileDataSchema.pre('save', function(next) {
    // 判断是否为新建，更改时间
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    next();
});


module.exports = FileDataSchema