const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const UserDataModel = require('../mongo/model/userModel')
const userAction = require('./../middleware/user')

const SALT_WORK_FACTOR = 10

// 拦截过滤器模式

// 用户登录
router.post('/login', userAction.login);

// 用户登出
router.post('/signout', userAction.logout);

// 录入用户
router.post('/typein', userAction.oAuthAdmin, userAction.adminInput);


// 根据 id 查询用户名
router.get('/getUserName/:userid', userAction.findNameById);


// 根据学号查询个人信息
router.get('/userinfo/:usernum', userAction.findInfoByNum);

// 用户修改自己密码
router.post('/update/pwd', userAction.userUpdatePwd)



module.exports = router