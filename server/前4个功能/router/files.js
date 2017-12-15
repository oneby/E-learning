const express = require('express')
const router = express.Router()
const multer = require('multer')({ dest: './uploads/' });
const path = require('path');
const fs = require('fs');
const FileModel = require('../mongo/model/fileModel')


router.post('/upload', multer.single('test-upload'), (req, res) => {
    if (!req.session.isLogin) {
        res.send({
            code: -1,
            msg: '请登录！'
        })
    }

    // 没有附带文件
    if (!req.file) {
        res.send({
            code: -2,
            msg: "无文件"
        });
        return;
    }

    // 输出文件信息
    console.log('====================================================');
    console.log('fieldname: ' + req.file.fieldname);
    console.log('originalname: ' + req.file.originalname);
    console.log('encoding: ' + req.file.encoding);
    console.log('mimetype: ' + req.file.mimetype);
    console.log('size: ' + (req.file.size / 1024).toFixed(2) + 'KB');
    console.log('destination: ' + req.file.destination);
    console.log('filename: ' + req.file.filename);
    console.log('path: ' + req.file.path);

    // 重命名文件
    let oldPath = path.join(__dirname, "./../" + req.file.path);
    let newPath = path.join(__dirname, './../uploads/' + req.file.originalname);

    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            res.send({
                code: -1,
                msg: "something wrong"
            });
            console.log(err);
        } else {
            res.send({
                code: 1,
                name: req.file.fieldname,
                path: newPath,
                msg: "上传成功"
            });
        }
    });


    FileModel.findOne({ fileName: fileName }, (err, fileInfo) => {
        if (err) {
            console.log(err)
        }
        if (fileInfo) {
            res.send({
                code: -3,
                msg: '文件名称已存在'
            })
            return console.log('文件名称已存在')
        }

        // 创建 model
        let _FileData = new UserDataModel({
            from: 'test',
            name: fileName,

        });
    })





});

//导出对象
module.exports = router;