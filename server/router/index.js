const express = require('express')
const router = express.Router()
const UserDataModel = require('../mongo/model')

// 密码加密
const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 10

// 查询用户名
router.get('/getUserName', (req, res) => {
    if (req.session.isLogin) {
        res.send({
            code: 0,
            role: 0,
            userName: req.session.userInfo.userName
        })
    } else {
        res.send({
            code: -1,
            msg: '请登录！'
        })
    }
});

// 用户登录
router.post('/login', (req, res) => {
    const { loginEmail, loginPsd } = req.body
    UserDataModel.findOne({ email: loginEmail }, {
        name: 1,
        password: 1,
        email: 1
    }, (err, userInfo) => {
        if (err) {
            console.log(err)
        }
        if (!userInfo) {
            res.send({
                code: -1,
                msg: '用户不存在'
            })
            return console.log('用户不存在！')
        }
        userInfo.comparePassword(loginPsd, function(err, isMatch) {
            if (err) {
                console.log(err)
            }
            if (isMatch) {
                req.session.isLogin = true
                req.session.userInfo = {
                    userName: userInfo.name,
                    userEmail: userInfo.email
                }
                res.send({
                    code: 0,
                    msg: '登录成功！'
                })
            } else {
                res.send({
                    code: -2,
                    msg: '密码错误'
                })
            }
        })
    })
});

// 用户登出
router.post('/signout', (req, res) => {
    req.session.isLogin = false
    res.send({
        code: 0,
        msg: '登出成功！'
    })
});

// 录入用户
router.post('/typein', (req, res) => {
    console.log(req.body);

    const { typeinName, typeinEmail, typeinPassword } = req.body

    UserDataModel.findOne({ email: typeinEmail }, (err, userInfo) => {

        if (err) {
            console.log(err)
        }
        if (userInfo) {
            res.send({
                code: -1,
                msg: '用户已存在'
            })
            return console.log('用户已存在！')
        }

        let _userData = new UserDataModel({
            name: typeinName,
            email: typeinEmail,
            password: typeinPassword
        });
        // 生成 salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) {
                return console.log(err)
            }
            // 给密码加 salt
            bcrypt.hash(typeinPassword, salt, function(err, hash) {
                if (err) {
                    return console.log(err)
                }
                _userData.password = hash
                    // 保存密码
                _userData.save(function(err, results) {
                    if (err) {
                        console.log(err)
                        res.send({
                            code: -1,
                            msg: 'Something error!'
                        })
                    }
                    req.session.isLogin = true
                    req.session.userInfo = {
                        userName: typeinName,
                        userEmail: typeinEmail
                    }
                    res.send({
                        code: 0,
                        msg: '注册成功'
                    })
                })
            })
        })
    })
});



module.exports = router