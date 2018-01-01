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


