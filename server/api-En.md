Interface documentation
============
### user permission 
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

1. Login interface
	--------

	- **Interface address ：http://ip:port/user/login**

    - **request method:POST**

    - **request parameter**

        Parameter Name | need | type   | Description
        ------------|------|--------|--------------
        loginNum    | Yes   | string | The user student id
        loginPsd    | Yes   | string | User Login Password

    - ** response parameter**

        Parameter Name | need | type   | Description
        ------------|------|---------|----------------
        status      | Yes   | boolean | Judgment state
        name        | Yes   | string  | nickname
        accountnum  | Yes   | string  | Login Id
        role        | Yes   | string  | user permission 
        msg         | Yes   | string  | Return message


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

2. Appropriate interface
	--------

	- **Interface address http://ip:port/user/signout**

    - **request method:POST**

    - **request parameter**

        Parameter Name | need | type   | Description
        ------------|------|--------|--------------
        无

    - ** response parameter**

        Parameter Name | need | type   | Description
        ------------|------|---------|----------------
        status      | Yes   | boolean | Judgment state
        msg         | Yes   | string  | Return message


    1. 成功返回的数据
    ```json
    {
        "status": true,
        "msg": "登出成功！"
    }
    ```

3. Query the user name by id
	--------

	- **Interface address http://ip:port/user/getusername/:userid**

    - **request method:GET**

    - **request parameter**

        Parameter Name | need | type   | Description
        ------------|------|--------|--------------
        userid      | Yes   | string | User id

    - ** response parameter**

        Parameter Name | need | type   | Description
        ------------|------|---------|----------------
        status      | Yes   | boolean | Judgment state
        userName    | Yes   | string  | nickname
        userrole    | Yes   | string  | user permission 


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

	- **Interface address http://ip:port/user/userinfo/:usernum**

    - **request method:GET**

    - **request parameter**

        Parameter Name | need | type   | Description
        ------------|------|--------|--------------
        usernum     | Yes   | string | The user student id

    - ** response parameter**

        Parameter Name | need | type   | Description
        ----------------|------|---------|----------------
        status          | Yes   | boolean | Judgment state
        userid          | Yes   | string  | The user student id
        username        | Yes   | string  | nickname
        usersex         | Yes   | string  | User Sex
        userrole        | Yes   | string  | user permission 
        userLearnTime   | Yes   | string  | Total learning duration
        userExp         | Yes   | string  | experience
        userAction      | Yes   | string  | attention
        userFans        | Yes   | string  | the number of fans 
        userCon         | Yes   | string  | integral 


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


5.  Enter the user interface
	--------

	- **Interface address http://ip:port/user/typein**

    - **request method:POST**

    - **request parameter**

        Parameter Name | need | type   | Description
        ------------|------|--------|--------------
        typeinName      | Yes   | string | nickname
        typeinAccount   | Yes   | string | The user student id
        typeinPassword  | Yes   | string | User Password
        typeinRole      | Yes   | string | user permission 
        typeinSex       | Yes   | string | User Sex
        

    - ** response parameter**

        Parameter Name | need | type   | Description
        ------------|------|---------|----------------
        status      | Yes   | boolean | Judgment state
        name        | Yes   | string  | nickname
        accountnum  | Yes   | string  | The user student id
        role        | Yes   | string  | user permission 
        sex         | Yes   | string  | User Sex     
        msg         | Yes   | string  | Return message


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

6.  The user changes his password
	--------

	- **Interface address http://ip:port/user/update/pwd**

    - **request method:POST**

    - **request parameter**

        Parameter Name | need | type   | Description
        ------------|------|--------|--------------
        userId         | Yes   | string | The user student id
        userLastPass   | Yes   | string | User's old password
        userNewPass    | Yes   | string | User's new password

        

    - ** response parameter**

        Parameter Name | need | type   | Description
        ------------|------|---------|----------------
        status      | Yes   | boolean | Judgment state  
        msg         | Yes   | string  | Return message


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



7.  File upload interface
	--------

	- **Interface address http://ip:port/file/upload**

    - **request method:POST**

    - **request parameter**

        Parameter Name | need | type   | Description
        ----------|------|--------|--------------
        name      | Yes   | string |  Upload the file field name
        
        

    - ** response parameter**

        Parameter Name | need | type   | Description
        ------------|------|---------|----------------
        status      | Yes   | boolean | Judgment state
        fileId      | Yes   | string  | Document ID
        fileName    | Yes   | string  | Doucument Name
        fromId      | Yes   | string  | uploader  ID
        msg         | Yes   | string  | Return message        


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
        "msg": "user permission 不足"
    }
    {
        "status": false,
        "msg": "无Document"
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

8.  Upload users to delete their own files
	--------

	- **Interface address http://ip:port/file/delete/:fileid**

    - **request method: DELETE**

    - **request parameter**

        Parameter Name | need | type   | Description
        ----------|------|--------|--------------
        fileid    | Yes   | string | Document ID
        
        

    - ** response parameter**

        Parameter Name | need | type   | Description
        ------------|------|---------|----------------
        status      | Yes   | boolean | Judgment state
        msg         | Yes   | string  | Return message        


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
        "msg": "Document查询失败"
    }
    {
        "status": false,
        "msg": "Document无数据"
    }
    {
        "status": false,
        "msg": "数据库Document删除失败"
    }
    {
        "status": false,
        "msg": "本地Document查询失败"
    }
    ```

9. Document DownLoad interface
	--------

	- **Interface address http://ip:port/file/download/:fileid**

    - **request method: GET**

    - **request parameter**

        Parameter Name | need | type   | Description
        ----------|------|--------|--------------
        fileid    | Yes   | string | Document ID
        
        

    - ** response parameter**

        Parameter Name | need | type   | Description
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
        "msg": "Document查询失败"
    }
    {
        "status": false,
        "msg": "Document无数据"
    }
    {
        "status": false,
        "msg": "Document下载失败"
    }
    ```

10. Find all uploaded files
	--------

	- **Interface address http://ip:port/file/alldata**

    - **request method: GET**

    - **request parameter**

        Parameter Name | need | type   | Description
        ----------|------|--------|--------------
        无
        
        

    - ** response parameter**

        Parameter Name | need | type   | Description
        ------------|------|---------|----------------
        status    | Yes    | string | status messages    
        allFile    | Yes   | Object | Document ResultObject    
        
        ___
        * allFile

            Parameter Name | need | type   | Description
            ------------|------|---------|----------------
            _id         | Yes   | string | Document ID   
            from        | Yes   | string | admin ID    
            fileName    | Yes   | string | Document name    
            filePath    | Yes   | string | Document path    
            fileSize    | Yes   | string | Document size   
            mimetype    | Yes   | string | Document perform    
            imgPath     | Yes   | string | Background map path   
            meta        | Yes   | Object | Date Objects    
            ___
            * meta

                Parameter Name | need | type   | Description
                ------------|------|---------|----------------
                updateAt    | Yes   | string | Document Update time   
                createAt    | Yes   | string | Document creat time


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
        "msg": "Document数据查询失败"
    }
    {
        "status": false,
        "msg": "Document无数据"
    }
    ```

