const express = require('express')
const router = express.Router()
const UserDataModel = require('../mongo/model/userModel')
const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 10


// 用户登录
router.post('/login', (req, res) => {
    // 从请求中拿到数据
    const { loginEmail, loginPsd } = req.body
        // 通过 loginEmail 查询 user 表, 返回 userInfo
    UserDataModel.findOne({ email: loginEmail }, (err, userInfo) => {
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
        // 密码匹配
        userInfo.comparePassword(loginPsd, (err, isMatch) => {
            if (err) {
                console.log(err)
            }
            // 匹配成功
            if (isMatch) {
                // session 中的 isLogin 置为 true
                req.session.isLogin = true
                    // 将用户信息存在 session 中
                req.session.userInfo = {
                        userName: userInfo.name,
                        userEmail: userInfo.email,
                        userRole: userInfo.role
                    }
                    // 成功返回
                res.send({
                    code: 0,
                    name: userInfo.name,
                    email: userInfo.email,
                    role: userInfo.role,
                    msg: '登录成功！'
                })
            } else {
                // 错误返回
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

// 查询用户名
router.get('/getUserName', (req, res) => {
    if (req.session.isLogin) {
        res.send({
            code: 0,
            role: req.session.userInfo.role,
            userName: req.session.userInfo.userName
        })
    } else {
        res.send({
            code: -1,
            msg: '请登录！'
        })
    }
});

// 录入用户
router.post('/typein', (req, res) => {
    // 判断是否登录
    if (req.session.isLogin) {
        // 获取 session 中的 role
        // req.session.userInfo.role
        const t_role = req.session.userInfo.role
            // 管理员
        if (t_role >= 50) {
            console.log(req.body);
            // 从请求中拿到数据
            const { typeinName, typeinEmail, typeinPassword, typeinRole } = req.body
                // 从 user 表查询
            UserDataModel.findOne({ email: typeinEmail }, (err, userInfo) => {
                if (err) {
                    console.log(err)
                }
                // 如果用户信息存在
                if (userInfo) {
                    // 返回
                    res.send({
                        code: -1,
                        msg: '用户已存在'
                    })
                    return console.log('用户已存在！')
                }
                // 创建 model
                let _userData = new UserDataModel({
                    name: typeinName,
                    email: typeinEmail,
                    password: typeinPassword,
                    role: typeinRole
                });
                // 生成 salt
                bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
                    if (err) {
                        return console.log(err)
                    }
                    // 给密码加 salt
                    bcrypt.hash(typeinPassword, salt, (err, hash) => {
                        if (err) {
                            return console.log(err)
                        }
                        _userData.password = hash
                        console.log(_userData.password);
                        // 保存密码
                        _userData.save((err, results) => {
                            if (err) {
                                console.log(err)
                                    // 返回
                                res.send({
                                    code: -1,
                                    msg: 'Something error!'
                                })
                            }
                            // 返回录入信息
                            res.send({
                                code: 0,
                                name: typeinName,
                                email: typeinEmail,
                                role: typeinRole,
                                msg: '录入成功'
                            })
                        })
                    })
                })
            })

        } else {
            res.send({
                code: -2,
                msg: '权限不足'
            })
        }
    } else {
        res.send({
            code: -3,
            msg: '请登录！'
        })
    }

});


/*

if (t_role >= 50) {
    // 管理员
    // to do...
} else if (t_role < 50 && t_role >= 20) {
    // 教师用户
    // todo..
} else if (t_role < 20 && t_role >= 0) {
    //普通用户
    // todo...
} else if(t_role < 0) {
    // 黑名单
    // todo...
}
*/

module.exports = router