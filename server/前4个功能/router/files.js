const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: './uploads/' })
const path = require('path');
const fs = require('fs');
const FileModel = require('../mongo/model/fileModel')
const UserDataModel = require('../mongo/model/userModel')

/**
 * 多文件，多种类上传
 * name: 字段名
 */
const cpUpload = upload.fields([{ name: 'test-upload', maxCount: 5 }, { name: 'gallery', maxCount: 8 }])


// 文件上传
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
                    let newName = new Date().getTime() + uploadFile.originalname
                    let newPath = path.join(__dirname, './../uploads/' + newName);

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
                                fileName: newName,
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
                                /**
                                 * fileId    文件 ID
                                 * fileName  文件名字
                                 * fromId    上传用户 ID
                                 */
                                res.send({
                                    code: 1,
                                    fileId: results._id,
                                    fileName: uploadFile.fieldname,
                                    fromId: results.from,
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

// 上传用户删除自己的文件
router.delete('/delete/:fileid', (req, res) => {
    const { fileid } = req.params;

    // 查询数据库中单条数据
    FileModel.findOne({ _id: fileid }, (err, fileResult) => {
        if (err) {
            console.log(err)
            res.send({
                code: -1,
                msg: '文件查询失败'
            })
        }
        if (fileResult === null) {
            res.send({
                code: -2,
                msg: '文件无数据'
            })
        } else {
            // 删除数据库中单条数据
            FileModel.remove({ _id: fileid }, err => {
                if (err) {
                    console.log(err)
                    res.send({
                        code: -3,
                        msg: '数据库文件删除失败'
                    })
                }
                // 删除本地文件
                fs.unlink(fileResult.filePath, err => {
                    if (err) {
                        res.send({
                            code: -4,
                            msg: '本地文件查询失败'
                        })
                    } else {
                        res.send({
                            code: 1,
                            msg: '删除成功'
                        })
                    }
                })
            })
        }
    })
})


// 文件下载
router.get('/download/:fileid', (req, res) => {
    const { fileid } = req.params;
    FileModel.findOne({ _id: id }, (err, fileResult) => {
        if (err) {
            console.log(err)
            res.send({
                code: -1,
                msg: '文件查询失败'
            })
        }
        if (fileResult === null) {
            res.send({
                code: -2,
                msg: '文件无数据'
            })
        } else {
            res.download(fileResult.filePath, err => {
                if (err) {
                    res.send({
                        code: -3,
                        msg: '文件下载失败'
                    })
                }
            })

        }
    })
});

// 查找所有已上传文件
router.get('/alldata', (req, res) => {

    // 数据库查询所有已存在文件
    FileModel.find({}, (err, results) => {
        if (err) {
            console.log(err)
            res.send({
                code: -1,
                msg: '文件数据查询失败'
            })
        }
        if (results === null) {
            res.send({
                code: -2,
                msg: '文件无数据'
            })
        } else {
            /**
             * allFile 返回所有数据
             */
            res.send({
                code: 1,
                allFile: results
            })


        }
    })
})

// 查找单个文件
router.get('/detail/:fileid', (req, res) => {
    const { fileId } = req.params

    // 查找数据库中单条文件数据
    FileModel.findOne({ _id: fileId }, (err, fileResult) => {
        if (err) {
            console.log(err)
            res.send({
                code: -1,
                msg: '文件查询失败'
            })
        }
        if (fileResult === null) {
            res.send({
                code: -2,
                msg: '文件无数据'
            })
        } else {
            // 根据文件中上传用户 ID 查找用户信息
            UserDataModel.findOne({ _id: fileResult.from }, (err, userResult) => {
                if (err) {
                    console.log(err)
                    res.send({
                        code: -1,
                        msg: '用户查询失败'
                    })
                }
                if (userResult === null) {
                    res.send({
                        code: -2,
                        msg: '用户无数据'
                    })
                } else {
                    /**
                     * fromName   上传用户名字
                     * fileName   文件名字
                     * fileSize   文件大小
                     * date       文件上传日期
                     */
                    res.send({
                        code: 1,
                        fromName: userResult.name,
                        fileName: fileResult.fileName,
                        fileSize: fileResult.fileSize,
                        date: fileResult.meta.updateAt
                    })
                }
            })
        }
    })
})


module.exports = router;