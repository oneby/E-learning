const SALT_WORK_FACTOR = 10
const ADMIN_ROLE = 30
const TEACHER_ROLE = 20

// 原型模式
const oAuth = {
    oAuthAdmin: function(req, res, next) {
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
    },

    oAuthTeacher: function(req, res, next) {
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

};

// Use Object.create to instantiate
const exportsOAuth = Object.create(oAuth);

module.exports = exportsOAuth