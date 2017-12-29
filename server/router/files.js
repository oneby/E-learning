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
router.get('/detail/:fileid', fileAction.findOneFile)


module.exports = router;