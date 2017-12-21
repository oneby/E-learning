const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: './uploads/' })
const path = require('path');
const fs = require('fs');
const FileModel = require('../mongo/model/fileModel')

/**
 * 多文件，多种类上传
 * name: 字段名
 */
const cpUpload = upload.fields([{ name: 'test-upload', maxCount: 5 }, { name: 'gallery', maxCount: 8 }])


// 上传接口
router.post('/upload', cpUpload, (req, res) => {
    /**
     * 先判断是否登录
     * req.session.isLogin === true   --> 登录
     * req.session.isLogin === false  --> 未登录
     */

    if (!req.session.isLogin) {
        res.send({
            code: -1,
            msg: '请登录！'
        })
    } else {
        /**
         * 判断是否具有权限
         * req.session.userInfo.userRole >= 50 为管理员
         */
        if (req.session.userInfo.userRole < 50) {
            res.send({
                code: '-2',
                msg: '用户权限不足'
            })
        } else {
            /**
             * 判断是否附带文件
             * req.files === true   --> 有文件
             * req.files === false  --> 无文件
             */
            if (!req.files) {
                res.send({
                    code: -3,
                    msg: "无文件"
                });
            } else {
                const test_upload = req.files['test-upload']
                console.log(test_upload);

                // 遍历上传的文件信息 
                for (let i = 0; i < test_upload.length; i++) {
                    const uploadFile = test_upload[i]

                    // 输出文件信息
                    console.log('====================================================');
                    console.log('fieldname: ' + uploadFile.fieldname);
                    console.log('originalname: ' + uploadFile.originalname);
                    console.log('encoding: ' + uploadFile.encoding);
                    console.log('mimetype: ' + uploadFile.mimetype);
                    console.log('size: ' + (uploadFile.size / 1024).toFixed(2) + 'KB');
                    console.log('destination: ' + uploadFile.destination);
                    console.log('filename: ' + uploadFile.filename);
                    console.log('path: ' + uploadFile.path);

                    // 重命名文件
                    let oldPath = path.join(__dirname, "./../" + uploadFile.path);
                    let newPath = path.join(__dirname, './../uploads/' + uploadFile.originalname);

                    // 重命名
                    fs.rename(oldPath, newPath, (err) => {
                        if (err) {
                            res.send({
                                code: -4,
                                msg: "something wrong"
                            });
                            console.log(err);
                        } else {

                            /**
                             * 
                             * 
                             *        没有考虑任何安全性问题，无限制上传
                             * 
                             * 
                             */

                            // 创建 model
                            let _FileData = new FileModel({
                                from: req.session.userInfo.userId,
                                fileName: new Date().getTime() + uploadFile.originalname,
                                filePath: newPath,
                                fileSize: (uploadFile.size / 1024).toFixed(2) + 'KB'
                            });

                            // 保存数据库
                            _FileData.save((err, results) => {
                                if (err) {
                                    console.log(err)
                                    res.send({
                                        code: -6,
                                        msg: 'Something error!'
                                    })
                                }
                                console.log(results);
                                res.send({
                                    code: 1,
                                    name: uploadFile.fieldname,
                                    path: newPath,
                                    msg: "上传成功"
                                });
                            })
                        }
                    });
                }
            }
        }
    }
});








module.exports = router;