// 简单工厂模式

const checkPassword = function() {
    this.intro = 'this is check'
}

checkPassword.prototype = {
    checkPwd: (password, userRes) => {
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
}

const hashPassword = function() {
    this.intro = 'this is hash'
}

hashPassword.prototype = {
    hashPwd: (password) => {
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
}


const passwordFactory = function(action) {
    switch (action) {
        case 'checkPwd':
            return new checkPassword();
        case 'hashPwd':
            return new hashPassword();
    }
}

const check = new passwordFactory('checkPwd')
const hash = new passwordFactory('hashPwd')

module.exports = {
    check,
    hash
}