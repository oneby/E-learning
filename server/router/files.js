const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: './uploads/' })
const path = require('path');
const fs = require('fs');

const FileModel = require('../mongo/model/fileModel')
const UserDataModel = require('../mongo/model/userModel')

const userAction = require('./../middleware/user')
const fileAction = require('./../middleware/file')


// 设置文件上传最大数量
const file_max_count = 1

/**
 * 多文件，多种类上传
 * name: 字段名
 */
const cpUpload = upload.fields([{
    name: 'bgimg',
    maxCount: file_max_count
}, {
    name: 'video',
    maxCount: file_max_count
}])


/**
 * 文件上传
 * 老师用户 上传背景图,上传文件
 */
router.post('/upload', cpUpload, userAction.oAuthTeacher, fileAction.uploadFile);

// 上传用户删除自己的文件
router.delete('/delete/:fileid', userAction.oAuthTeacher, fileAction.deleteFile)


// 文件下载
router.get('/download/:fileid', fileAction.downloadFile);

// 查找所有已上传文件
router.get('/alldata', fileAction.findAllFile)

// 查找单个文件
router.get('/detail/:fileid', (req, res) => {
    const { fileid } = req.params

    // 查找数据库中单条文件数据
    FileModel.findOne({ _id: fileid }, (err, fileResult) => {
        if (err) {
            console.log(err)
            res.send({
                status: false,
                msg: '文件查询失败'
            })
        }
        if (fileResult === null) {
            res.send({
                status: false,
                msg: '文件无数据'
            })
        } else {
            // 根据文件中上传用户 ID 查找用户信息
            UserDataModel.findOne({ _id: fileResult.from }, (err, userResult) => {
                if (err) {
                    console.log(err)
                    res.send({
                        status: false,
                        msg: '用户查询失败'
                    })
                }
                if (userResult === null) {
                    res.send({
                        status: false,
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
                        status: true,
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