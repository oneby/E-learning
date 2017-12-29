const CommentModel = require('./../mongo/model/commentModel');
const UserDataModel = require('../mongo/model/userModel')

// 发布评论
function release(req, res) {
    /**
     * 先判断是否登录
     * req.session.isLogin === true   --> 登录
     * req.session.isLogin === false  --> 未登录
     */
    if (!req.session.isLogin) {
        res.send({
            status: false,
            msg: '请登录！'
        })
    } else {
        /**
         * fileId: 文件 id
         * commet: 评论内容
         */
        const { fileId, comment } = req.body;

        let _comment = new CommentModel({
            from: req.session.userInfo.userId,
            to: fileId,
            content: comment
        });

        _comment.save((err, results) => {
            if (err) {
                console.log(err);
                res.send({
                    status: false,
                    msg: '数据库保存失败'
                })
            }
            // 返回评论信息
            res.send({
                status: true,
                msg: '评论保存成功'
            })
        })
    }
}


// 获取所有评论
function getAllComments(req, res) {
    const { fileid } = req.params;

    CommentModel.find({ to: fileid }, (err, commentRes) => {
        if (err) {
            console.log(err);
            res.send({
                status: false,
                msg: err
            })
        }
        if (commentRes.length === 0) {
            res.send({
                status: false,
                msg: '评论无数据'
            })
        } else {
            res.send({
                status: true,
                comment: commentRes
            })
        }
    })
}


module.exports = {
    release,
    getAllComments
}