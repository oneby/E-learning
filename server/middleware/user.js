const UserDataModel = require('../mongo/model/userModel')
const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 10
const ADMIN_ROLE = 30
const TEACHER_ROLE = 20

// *************   权限相关   ******************
// 管理员权限认证
function oAuthAdmin(req, res, next) {
    if (req.session.isLogin) {
        // 获取 session 中的 role
        // req.session.userInfo.userRole
        const t_role = req.session.userInfo.userRole

        // 管理员
        if (t_role === ADMIN_ROLE) {
            next()
        } else {
            res.send({
                status: false,
                msg: '权限不足'
            })
        }
    } else {
        res.send({
            status: false,
            msg: '请登录！'
        })
    }
}

// 老师权限认证
function oAuthTeacher(req, res, next) {
    if (req.session.isLogin) {
        // 获取 session 中的 role
        // req.session.userInfo.userRole
        const t_role = req.session.userInfo.userRole

        // 老师
        if (t_role >= TEACHER_ROLE) {
            next()
        } else {
            res.send({
                status: false,
                msg: '权限不足'
            })
        }
    } else {
        res.send({
            status: false,
            msg: '请登录！'
        })
    }
}
// *************************************


// *************   密码相关   ******************
// 密码匹配
function checkPwd(password, userRes) {
    return new Promise((resolve, reject) => {
        // 密码匹配
        userRes.comparePassword(password, (err, isMatch) => {
            if (err) {
                reject(err)
                console.log(err)
            }
            resolve(isMatch)
        })
    })
}

// 加盐
function hashPwd(password) {
    return new Promise((resolve, reject) => {
        // 生成 salt
        bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
            if (err) {
                reject(err)
                return console.log(err)
            }
            // 给密码加 salt
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    return console.log(err)
                }
                resolve(hash)
            })
        })
    })
}
// *************************************

// 登录查询
function login(req, res) {
    // 从请求中拿到数据
    const { loginNum, loginPsd } = req.body

    // 通过 loginNum 查询 user 表, 返回 userInfo
    UserDataModel.findOne({ accountnum: loginNum }, (err, userInfo) => {
        if (err) {
            console.log(err)
        }
        if (!userInfo) {
            res.send({
                status: false,
                msg: '用户不存在'
            })
            return console.log('用户不存在！')
        }
        // 密码匹配
        let result = checkPwd(loginPsd, userInfo)

        result.then((checkStatus) => {
            if (checkStatus) {
                // session 中的 isLogin 置为 true
                req.session.isLogin = true
                    // 将用户信息存在 session 中
                req.session.userInfo = {
                    userId: userInfo._id,
                    userName: userInfo.name,
                    userEmail: userInfo.accountnum,
                    userRole: userInfo.role
                }

                // 成功返回
                res.send({
                    status: true,
                    name: userInfo.name,
                    accountnum: userInfo.accountnum,
                    role: userInfo.role,
                    msg: '登录成功！'
                })
            } else {
                // 错误返回
                res.send({
                    status: false,
                    msg: '密码错误'
                })
            }
        })

    })
}

// 退出
function logout(req, res) {
    req.session.isLogin = false
    res.send({
        status: true,
        msg: '登出成功！'
    })
}


// 录入用户
function adminInput(req, res) {
    // 从请求中拿到数据
    const { typeinName, typeinAccount, typeinPassword, typeinRole, typeinSex } = req.body

    // 从 user 表查询
    UserDataModel.findOne({ accountnum: typeinAccount }, (err, userInfo) => {
        if (err) {
            console.log(err)
        }
        // 如果用户信息存在
        if (userInfo) {
            // 返回
            res.send({
                status: false,
                msg: '用户已存在'
            })
            return console.log('用户已存在！')
        } else {
            // 创建 model
            let _userData = new UserDataModel({
                name: typeinName,
                accountnum: typeinAccount,
                password: typeinPassword,
                sex: typeinSex,
                role: typeinRole
            });

            let hash = hashPwd(typeinPassword);

            hash.then((hashPassword) => {
                _userData.password = hashPassword
                console.log(_userData.password);
                // 保存密码
                _userData.save((err, results) => {
                    if (err) {
                        console.log(err)
                            // 返回
                        res.send({
                            status: false,
                            msg: '数据库保存失败'
                        })
                    }
                    // 返回录入信息
                    res.send({
                        status: true,
                        name: typeinName,
                        accountnum: typeinAccount,
                        role: typeinRole,
                        sex: typeinSex,
                        msg: '录入成功'
                    })
                })
            })
        }
    })
}



// 根据 id 查询用户名
function findNameById(req, res) {
    const { userid } = req.params;

    UserDataModel.findOne({ _id: userid }, (err, userRes) => {
        if (err) {
            console.log(err);
        }
        if (userRes === null) {
            res.send({
                status: false,
                msg: '无用户数据'
            })
        } else {
            res.send({
                status: true,
                username: userRes.name,
                userrole: userRes.role
            })
        }
    })

    this.selectName = function() {
        UserDataModel.findOne({ _id: userid }, (err, userRes) => {
            if (err) {
                console.log(err);
            }
            if (userRes === null) {
                res.send({
                    status: false,
                    msg: '无用户数据'
                })
            } else {
                res.send({
                    status: true,
                    username: userRes.name,
                    userrole: userRes.role
                })
            }
        })
    }

}

// 根据学号查询个人信息
function findInfoByNum(req, res) {
    const { usernum } = req.params;

    UserDataModel.findOne({ accountnum: usernum }, (err, userRes) => {
        if (err) {
            console.log(err);
        }
        if (userRes === null) {
            res.send({
                status: false,
                msg: '无用户数据'
            })
        } else {
            res.send({
                status: true,
                userid: accountnum,
                username: userRes.name,
                usersex: userRes.sex,
                userrole: userRes.role,
                userLearnTime: '100000',
                userExp: '2000',
                userAction: '10',
                userFans: '64',
                userCon: '2333'
            })
        }
    })
}

// 用户修改密码
function userUpdatePwd(req, res) {
    if (!req.session.isLogin) {
        res.send({
            status: false,
            msg: '未登录'
        })
    } else {
        const { userId, userLastPass, userNewPass } = req.body

        // 通过 loginNum 查询 user 表, 返回 userInfo
        UserDataModel.findOne({ accountnum: userId }, (err, userInfo) => {
            if (err) {
                console.log(err)
            }
            if (!userInfo) {
                res.send({
                    status: false,
                    msg: '用户不存在'
                })
                return console.log('用户不存在！')
            }

            // 密码匹配
            let result = checkPwd(userLastPass, userInfo)

            result.then((checkStatus) => {
                if (!checkStatus) {
                    // 错误返回
                    res.send({
                        status: false,
                        msg: '密码错误'
                    })
                } else {
                    // 密码加盐
                    let hash = hashPwd(userNewPass);

                    hash.then((hashPassword) => {
                        UserDataModel.update({ accountnum: userId }, { $set: { password: hashPassword } }, (err, userRes) => {
                            if (err) {
                                res.send({
                                    status: false,
                                    msg: '数据更新失败'
                                })
                            }
                            res.send({
                                status: true,
                                msg: '密码更新成功'
                            })
                        })
                    })
                }
            })
        })
    }
}


module.exports = {
    login,
    logout,
    oAuthAdmin,
    oAuthTeacher,
    adminInput,
    findNameById,
    findInfoByNum,
    userUpdatePwd
}