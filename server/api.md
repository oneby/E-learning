接口文档
============
### 用户权限
```javascript
    if (t_role === 30) {
        // 管理员
        // to do...
    } else if (t_role === 20) {
        // 教师用户
        // todo..
    } else if (t_role === 10 ) {
        //普通用户
        // todo...
    } else if(t_role === 0) {
        // 黑名单
        // todo...
    }
```

1. 登录接口
	--------

	- **接口地址 http://ip:port/user/login**

    - **请求方法:POST**

    - **请求参数**

        参数名称 | 必需 | 类型   | 描述
        ------------|------|--------|--------------
        loginNum    | 是   | string | 用户学号
        loginPsd    | 是   | string | 用户登录密码

    - **响应参数**

        参数名称 | 必需 | 类型   | 描述
        ------------|------|---------|----------------
        status      | 是   | boolean | 判断相应状态
        name        | 是   | string  | 用户昵称
        accountnum  | 是   | string  | 登录学号
        role        | 是   | string  | 用户权限
        msg         | 是   | string  | 返回的信息


    1. 登录成功返回的数据
    ```json
    {
        "status": true,
        "name": "admin",
        "accountnum": "12345",
        "role": "100",
        "msg": "登录成功！"
    }
    ```

    2. 登录失败返回的数据
    ```json
    {
        "status": false,
        "msg": "密码错误"
    }
    {
        "status": false,
        "msg": "用户不存在"
    }
    ```

2. 登出接口
	--------

	- **接口地址 http://ip:port/user/signout**

    - **请求方法:POST**

    - **请求参数**

        参数名称 | 必需 | 类型   | 描述
        ------------|------|--------|--------------
        无

    - **响应参数**

        参数名称 | 必需 | 类型   | 描述
        ------------|------|---------|----------------
        status      | 是   | boolean | 判断相应状态
        msg         | 是   | string  | 返回的信息


    1. 成功返回的数据
    ```json
    {
        "status": true,
        "msg": "登出成功！"
    }
    ```


3. 根据 id 查询用户名
	--------

	- **接口地址 http://ip:port/user/getusername/:userid**

    - **请求方法:GET**

    - **请求参数**

        参数名称 | 必需 | 类型   | 描述
        ------------|------|--------|--------------
        userid      | 是   | string | 用户 id

    - **响应参数**

        参数名称 | 必需 | 类型   | 描述
        ------------|------|---------|----------------
        status      | 是   | boolean | 判断相应状态
        userName    | 是   | string  | 用户昵称
        userrole    | 是   | string  | 用户权限


    1. 成功返回的数据
    ```json
    {
        "status": true,
        "userName": "admin",
        "userrole": "100"
    }
    ```

    2. 失败返回的数据
    ```json
    {
        "status": false,
        "msg": "无用户数据"
    }
    ```


4. 根据学号查询个人信息
	--------

	- **接口地址 http://ip:port/user/userinfo/:usernum**

    - **请求方法:GET**

    - **请求参数**

        参数名称 | 必需 | 类型   | 描述
        ------------|------|--------|--------------
        usernum     | 是   | string | 用户学号

    - **响应参数**

        参数名称 | 必需 | 类型   | 描述
        ----------------|------|---------|----------------
        status          | 是   | boolean | 判断相应状态
        userid          | 是   | string  | 用户学号
        username        | 是   | string  | 用户昵称
        usersex         | 是   | string  | 用户性别
        userrole        | 是   | string  | 用户权限
        userLearnTime   | 是   | string  | 学习时长总计
        userExp         | 是   | string  | 经验
        userAction      | 是   | string  | 关注
        userFans        | 是   | string  | 粉丝数
        userCon         | 是   | string  | 积分


    1. 成功返回的数据
    ```json
    {

    }
    ```

    2. 失败返回的数据
    ```json
    {
        "status": false,
        "msg": "无用户数据"
    }
    ```


5. 录入用户接口
	--------

	- **接口地址 http://ip:port/user/typein**

    - **请求方法:POST**

    - **请求参数**

        参数名称 | 必需 | 类型   | 描述
        ------------|------|--------|--------------
        typeinName      | 是   | string | 用户昵称
        typeinAccount   | 是   | string | 用户学号
        typeinPassword  | 是   | string | 用户密码
        typeinRole      | 是   | string | 用户权限
        typeinSex       | 是   | string | 用户性别
        

    - **响应参数**

        参数名称 | 必需 | 类型   | 描述
        ------------|------|---------|----------------
        status      | 是   | boolean | 判断相应状态
        name        | 是   | string  | 用户昵称
        accountnum  | 是   | string  | 用户学号
        role        | 是   | string  | 用户权限
        sex         | 是   | string  | 用户性别     
        msg         | 是   | string  | 返回的信息


    1. 成功返回的数据
    ```json
    {
        "status": true,
        "name": "admin",
        "accountnum": "12345",
        "role": "100",
        "sex": "man"
        "msg": "录入成功"
        
    }
    ```

    2. 失败返回的数据
    ```json
    {
        "status": false,
        "msg": "用户已存在"
    }
    {
        "status": false,
        "msg": "数据库保存失败"
    }
    {
        "status": false,
        "msg": "权限不足"
    }
    {
        "status": false,
        "msg": "请登录！"
    }
    ```

6. 用户修改自己密码
	--------

	- **接口地址 http://ip:port/user/update/pwd**

    - **请求方法:POST**

    - **请求参数**

        参数名称 | 必需 | 类型   | 描述
        ------------|------|--------|--------------
        userId         | 是   | string | 用户学号
        userLastPass   | 是   | string | 用户旧密码
        userNewPass    | 是   | string | 用户新密码

        

    - **响应参数**

        参数名称 | 必需 | 类型   | 描述
        ------------|------|---------|----------------
        status      | 是   | boolean | 判断相应状态  
        msg         | 是   | string  | 返回的信息


    1. 成功返回的数据
    ```json
    {
        status: true,
        msg: '密码更新成功'
    }
    ```

    2. 失败返回的数据
    ```json
    {
      
    }
    ```



7. 文件上传接口
	--------

	- **接口地址 http://ip:port/file/upload**

    - **请求方法:POST**

    - **请求参数**

        参数名称 | 必需 | 类型   | 描述
        ----------|------|--------|--------------
        name      | 是   | string | 上传文件字段名
        
        

    - **响应参数**

        参数名称 | 必需 | 类型   | 描述
        ------------|------|---------|----------------
        status      | 是   | boolean | 判断相应状态
        fileId      | 是   | string  | 文件 ID
        fileName    | 是   | string  | 文件名称
        fromId      | 是   | string  | 上传者 ID
        msg         | 是   | string  | 返回的信息        


    1. 成功返回的数据
    ```json
    {
        "status": true,
        "fileId": "5a3bb3400309f67e93e99cbd",
        "fileName": "1513861952608Screenshot_2017-12-02-12-09-33-607_com.valvesoftw.png",
        "fromId": "5a27e247970a925f4e5aa844",
        "msg": "上传成功"
        
    }
    ```

    2. 失败返回的数据
    ```json
    {
        "status": false,
        "msg": "请登录！"
    }
    {
        "status": false,
        "msg": "用户权限不足"
    }
    {
        "status": false,
        "msg": "无文件"
    }
    {
        "status": false,
        "msg": "重命名时发生错误"
    }
    {
        "status": false,
        "msg": "数据库错误"
    }
    ```

8. 上传用户删除自己的文件
	--------

	- **接口地址 http://ip:port/file/delete/:fileid**

    - **请求方法: DELETE**

    - **请求参数**

        参数名称 | 必需 | 类型   | 描述
        ----------|------|--------|--------------
        fileid    | 是   | string | 文件 ID
        
        

    - **响应参数**

        参数名称 | 必需 | 类型   | 描述
        ------------|------|---------|----------------
        status      | 是   | boolean | 判断相应状态
        msg         | 是   | string  | 返回的信息        


    1. 成功返回的数据
    ```json
    {
        "status": true,
        "msg": "删除成功"
        
    }
    ```

    2. 失败返回的数据
    ```json
    {
        "status": false,
        "msg": "文件查询失败"
    }
    {
        "status": false,
        "msg": "文件无数据"
    }
    {
        "status": false,
        "msg": "数据库文件删除失败"
    }
    {
        "status": false,
        "msg": "本地文件查询失败"
    }
    ```

9. 文件下载接口
	--------

	- **接口地址 http://ip:port/file/download/:fileid**

    - **请求方法: GET**

    - **请求参数**

        参数名称 | 必需 | 类型   | 描述
        ----------|------|--------|--------------
        fileid    | 是   | string | 文件 ID
        
        

    - **响应参数**

        参数名称 | 必需 | 类型   | 描述
        ------------|------|---------|----------------
        无     


    1. 成功返回的数据
    ```json
    // 无返回,直接下载
    ```

    2. 失败返回的数据
    ```json
    {
        "status": false,
        "msg": "文件查询失败"
    }
    {
        "status": false,
        "msg": "文件无数据"
    }
    {
        "status": false,
        "msg": "文件下载失败"
    }
    ```

10. 查找所有已上传文件
	--------

	- **接口地址 http://ip:port/file/alldata**

    - **请求方法: GET**

    - **请求参数**

        参数名称 | 必需 | 类型   | 描述
        ----------|------|--------|--------------
        无
        
        

    - **响应参数**

        参数名称 | 必需 | 类型   | 描述
        ------------|------|---------|----------------
        status    | 是    | string | 状态信息   
        allFile    | 是   | Object | 文件结果对象    
        
        ___
        * allFile

            参数名称 | 必需 | 类型   | 描述
            ------------|------|---------|----------------
            _id         | 是   | string | 文件 ID   
            from        | 是   | string | 上传人 ID    
            fileName    | 是   | string | 文件名称    
            filePath    | 是   | string | 文件路径    
            fileSize    | 是   | string | 文件大小    
            mimetype    | 是   | string | 文件格式    
            imgPath     | 是   | string | 背景图路径    
            meta        | 是   | string | 时间对象    
            ___
            * meta

                参数名称 | 必需 | 类型   | 描述
                ------------|------|---------|----------------
                updateAt    | 是   | string | 文件更新时间   
                createAt    | 是   | string | 文件创建时间


    1. 成功返回的数据
    ```json
    {
        "status": true,
        "allFile": [
            {
                "_id": "5a3bb3400309f67e93e99cbd",
                "from": "5a27e247970a925f4e5aa844",
                "fileName": "1513861952608Screenshot_2017-12-02-12-09-33-607_com.valvesoftw.png",
                "filePath": "/Users/zhubotai/Documents/class/design_p/大项目/E-learning/server/前4个功能/uploads/1513861952608Screenshot_2017-12-02-12-09-33-607_com.valvesoftw.png",
                "fileSize": "219.25KB",
                "mimetype": "",
                "imgPath": "",
                "__v": 0,
                "meta": {
                    "updateAt": "2017-12-21T13:12:32.609Z",
                    "createAt": "2017-12-21T13:12:32.609Z"
                }
            },
            {
                "_id": "5a3c6ed6f315bd83af1f6566",
                "from": "5a27e247970a925f4e5aa844",
                "fileName": "151390997410320d269c79aa0776bdab445b9fac7e7f5.jpeg",
                "filePath": "/Users/zhubotai/Documents/class/design_p/大项目/E-learning/server/前4个功能/uploads/151390997410320d269c79aa0776bdab445b9fac7e7f5.jpeg",
                "fileSize": "178.21KB",
                "__v": 0,
                "meta": {
                    "updateAt": "2017-12-22T02:32:54.112Z",
                    "createAt": "2017-12-22T02:32:54.112Z"
                }
            },
            {
                "_id": "5a3c6ed6f315bd83af1f6567",
                "from": "5a27e247970a925f4e5aa844",
                "fileName": "1513909974105TIM截图20171208141619.png",
                "filePath": "/Users/zhubotai/Documents/class/design_p/大项目/E-learning/server/前4个功能/uploads/1513909974105TIM截图20171208141619.png",
                "fileSize": "13.30KB",
                "__v": 0,
                "meta": {
                    "updateAt": "2017-12-22T02:32:54.118Z",
                    "createAt": "2017-12-22T02:32:54.118Z"
                }
            }
        ]
    }
    ```

    2. 失败返回的数据
    ```json
    {
        "status": false,
        "msg": "文件数据查询失败"
    }
    {
        "status": false,
        "msg": "文件无数据"
    }
    ```

11. 查找单个文件
	--------

	- **接口地址 http://ip:port/file/detail/:fileid**

    - **请求方法: GET**

    - **请求参数**

        参数名称 | 必需 | 类型   | 描述
        ----------|------|--------|--------------
        fileid    | 是   | string | 文件 ID
        
        

    - **响应参数**

        参数名称 | 必需 | 类型   | 描述
        ------------|------|---------|----------------
        status      | 是   | boolean | 判断状态信息
        fromName    | 是   | string  | 上传用户名字
        fileName    | 是   | string  | 文件名字
        fileSize    | 是   | string  | 文件大小
        date        | 是   | string  | 文件上传日期
        


    1. 成功返回的数据
    ```json
    {
        "status": true,
        "fromName": "admin",
        "fileName": "1513861952608Screenshot_2017-12-02-12-09-33-607_com.valvesoftw.png",
        "fileSize": "219.25KB",
        "date": "2017-12-21T13:12:32.609Z"
    }
    ```

    2. 失败返回的数据
    ```json
    {
        "status": false,
        "msg": "文件查询失败"
    }
    {
        "status": false,
        "msg": "文件无数据"
    }
    {
        "status": false,
        "msg": "用户查询失败"
    }
    {
        "status": false,
        "msg": "用户无数据"
    }
    ```

12. 发布评论
	--------

	- **接口地址 http://ip:port/comment/release**

    - **请求方法: POST**

    - **请求参数**

        参数名称 | 必需 | 类型   | 描述
        ----------|------|--------|--------------
        fileid    | 是   | string | 文件 ID
        comment   | 是   | string | 评论内容
        

    - **响应参数**

        参数名称 | 必需 | 类型   | 描述
        ------------|------|---------|----------------
        status      | 是   | boolean | 判断状态信息
        msg         | 是   | string  | 返回信息

    1. 成功返回的数据
    ```json
    {
        
    }
    ```

    2. 失败返回的数据
    ```json
    {

    }
    ```

13. 获取所有评论
	--------

	- **接口地址 http://ip:port/comment/results/:fileid**

    - **请求方法: GET**

    - **请求参数**

        参数名称 | 必需 | 类型   | 描述
        ----------|------|--------|--------------
        fileid    | 是   | string | 文件 ID
        

    - **响应参数**

        参数名称 | 必需 | 类型   | 描述
        ------------|------|---------|----------------
        status      | 是   | boolean | 判断状态信息
        comment     | 是   | Object  | 评论信息
        ___
        * comment

            参数名称 | 必需 | 类型   | 描述
            ------------|------|---------|----------------
            from    | 是   | string | 评论者 id   
            to      | 是   | string | 被评论的视频 id
            content | 是   | string | 评论内容
            meta    | 是   | string | 评论时间
            ___
            * meta

                参数名称 | 必需 | 类型   | 描述
                ------------|------|---------|----------------
                updateAt    | 是   | string | 更新时间   
                createAt    | 是   | string | 创建时间


    1. 成功返回的数据
    ```json
    {
        
    }
    ```

    2. 失败返回的数据
    ```json
    {

    }
    ```