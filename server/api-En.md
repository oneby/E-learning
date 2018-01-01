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
