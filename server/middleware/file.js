const multer = require('multer')
const upload = multer({ dest: './uploads/' })
const path = require('path');
const fs = require('fs');

const FileModel = require('../mongo/model/fileModel')
const UserDataModel = require('../mongo/model/userModel')

/**
 * 文件上传
 * 老师用户 上传背景图,上传文件
 */
function uploadFile(req, res) {
    console.log('upload come in');

    /**
     * 判断是否附带文件
     * req.files === true   --> 有文件
     * req.files === false  --> 无文件
     */
    if (!req.files) {
        res.send({
            status: false,
            msg: "无文件"
        });
    } else {
        const bgimg = req.files['bgimg']
        const video = req.files['video']

        const uploadImg = bgimg[0]

        // 获取图片文件 旧地址 新地址, 设置新名字
        let oldImgPath = path.join(__dirname, './../' + uploadImg.path)
        let newImgName = new Date().getTime() + uploadImg.originalname
        let newImgPath = path.join(__dirname, './../uploads/' + newImgName);

<<<<<<< HEAD
        // if (bgimg) {
        const uploadImg = bgimg[0]

        // 获取图片文件 旧地址 新地址, 设置新名字
        let oldImgPath = path.join(__dirname, './../' + uploadImg.path)
        let newImgName = new Date().getTime() + uploadImg.originalname
        let newImgPath = path.join(__dirname, './../uploads/' + newImgName);

        // 重命名 图片文件
        fs.rename(oldImgPath, newImgPath, (err) => {
                if (err) {
                    res.send({
                        status: false,
                        msg: "视频重命名时发生错误"
                    });
                    console.log(err);
                }
            })
            // }

        // if (video) {
        const uploadFile = video[0]
            // 获取视频文件 旧地址 新地址, 设置新名字
        let oldFilePath = path.join(__dirname, "./../" + uploadFile.path);
        let newFileName = new Date().getTime() + uploadFile.originalname
        let newFilePath = path.join(__dirname, './../uploads/' + newFileName);

        // 重命名 视频文件
        fs.rename(oldFilePath, newFilePath, (err) => {
            if (err) {
                res.send({
                    status: false,
                    msg: "视频重命名时发生错误"
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
                    fileName: newFileName,
                    filePath: newFilePath,
                    fileSize: (uploadFile.size / 1024).toFixed(2) + 'KB',
                    mimetype: uploadFile.mimetype,
                    imgPath: newImgPath
                });

                // 保存数据库
                _FileData.save((err, results) => {
                    if (err) {
                        console.log(err)
                        res.send({
                            status: false,
                            msg: '数据库错误'
                        })
                    }
                    /**
                     * fileId    文件 ID
                     * fileName  文件名字
                     * fromId    上传用户 ID
                     */
                    res.send({
                        status: true,
                        fileId: results._id,
                        fileName: uploadFile.fieldname,
                        fromId: results.from,
                        msg: "上传成功"
                    });
                })
            }
        });
        // }
=======
        // 重命名 图片文件
        fs.rename(oldImgPath, newImgPath, (err) => {
            if (err) {
                res.send({
                    status: false,
                    msg: "视频重命名时发生错误"
                });
                console.log(err);
            }
        })

        const uploadFile = video[0]

        // 获取视频文件 旧地址 新地址, 设置新名字
        let oldFilePath = path.join(__dirname, "./../" + uploadFile.path);
        let newFileName = new Date().getTime() + uploadFile.originalname

        // 本地路径
        let newFilePath = path.join(__dirname, './../uploads/' + newFileName);

        // 服务器路径 
        // let newFilePath = path.join(__dirname, 'http://123.207.154.174:3456/' + newFileName);


        // 重命名 视频文件
        fs.rename(oldFilePath, newFilePath, (err) => {
            if (err) {
                res.send({
                    status: false,
                    msg: "视频重命名时发生错误"
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
>>>>>>> origin/master

                // 创建 model
                let _FileData = new FileModel({
                    from: req.session.userInfo.userId,
                    fileName: newFileName,
                    filePath: newFilePath,
                    fileSize: (uploadFile.size / 1024).toFixed(2) + 'KB',
                    mimetype: uploadFile.mimetype,
                    imgPath: newImgPath
                });

                // 保存数据库
                _FileData.save((err, results) => {
                    if (err) {
                        console.log(err)
                        res.send({
                            status: false,
                            msg: '数据库错误'
                        })
                    }
                    /**
                     * fileId    文件 ID
                     * fileName  文件名字
                     * fromId    上传用户 ID
                     */
                    res.send({
                        status: true,
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

// 上传用户删除自己的文件
function deleteFile(req, res) {
    const { fileid } = req.params;

    // 查询数据库中单条数据
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
            // 删除数据库中单条数据
            FileModel.remove({ _id: fileid }, err => {
                if (err) {
                    console.log(err)
                    res.send({
                        status: false,
                        msg: '数据库视频路径删除失败'
                    })
                }
                // 删除本地视频文件
                fs.unlink(fileResult.filePath, err => {
                    if (err) {
                        res.send({
                            status: false,
                            msg: '本地视频文件查询失败'
                        })
                    } else {
                        // 删除本地图片文件
                        fs.unlink(fileResult.imgPath, err => {
                            if (err) {
                                res.send({
                                    status: false,
                                    msg: '本地文件查询失败'
                                })
                            } else {
                                res.send({
                                    status: true,
                                    msg: '删除成功'
                                })
                            }
                        })
                    }
                })
            })
        }
    })
}

// 文件下载
function downloadFile(req, res) {
    const { fileid } = req.params;
    FileModel.findOne({ _id: id }, (err, fileResult) => {
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
            res.download(fileResult.filePath, err => {
                if (err) {
                    res.send({
                        status: false,
                        msg: '文件下载失败'
                    })
                }
            })
        }
    })
}

// 查看所有已经上传的文件
function findAllFile(req, res) {

    // 数据库查询所有已存在文件
    FileModel.find({}, (err, results) => {
        if (err) {
            console.log(err)
            res.send({
                status: false,
                msg: '文件数据查询失败'
            })
        }
        if (results === null) {
            res.send({
                status: false,
                msg: '文件无数据'
            })
        } else {
            /**
             * allFile 返回所有数据
             */
            res.send({
                status: true,
                allFile: results
            })
        }
    })
}

// 查找单个文件
function findOneFile(req, res) {
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
                        filePath: fileResult.filePath,
                        imgPath: fileResult.imgPath,
                        date: fileResult.meta.updateAt
                    })
                }
            })
        }
    })
}


// 搜索视频
function searchFile(req, res) {
    const { courseName } = req.query

    FileModel.find({ fileName: new RegExp('.*' + courseName + '.*') }, (err, fileRes) => {
        if (err) {
            console.log(err);
            res.send({
                status: false,
                msg: "查询错误"
            })
        }
        if (fileRes.length === 0) {
            res.send({
                status: false,
                msg: '无数据'
            })
        }
        res.send({
            status: true,
            searchRes: fileRes,
            msg: '查找成功'
        })
    })
}




module.exports = {
    uploadFile,
    deleteFile,
    downloadFile,
    findAllFile,
    findOneFile,
    searchFile
}