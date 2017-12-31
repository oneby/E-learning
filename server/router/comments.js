const express = require('express')
const router = express.Router()

const CommentModel = require('./../mongo/model/commentModel');
const UserDataModel = require('../mongo/model/userModel')

const commentAction = require('./../middleware/comment')

// 发布评论
router.post('/release', commentAction.release)

// 获取所有评论
router.get('/results/:fileid', commentAction.getAllComments)


module.exports = router