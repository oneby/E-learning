## 接口文档说明

登录

post   http://localhost:3000/user/login

提交内容
loginEmail  string
loginPsd    string

不存在，返回
{
    code: -1,
    msg: '用户不存在'
}

密码错误
{
    code: -2,
    msg: '密码错误'
}

成功
{
    code: 0,
    name: userInfo.name,
    email: userInfo.email,
    role: userInfo.role,
    msg: '登录成功！'
}

---------

登出

post  http://localhost:3000/user/signout


----------

文件上传

post   http://localhost:3000/file/upload

post 内容


成功
{
    code: 1,
    name: req.file.fieldname,
    path: newPath,
    msg: "上传成功"
}