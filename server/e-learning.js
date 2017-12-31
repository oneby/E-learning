const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const http = require('http');
const debug = require('debug')('server1:server');
const uuid = require('uuid/v4')

const index = require('./router/index')

const logging_api = require('./router/logging')
const user_api = require('./router/users')
const file_api = require('./router/files')
const comment_api = require('./router/comments')

const app = express()

// 连接数据库
const dbUrl = 'mongodb://localhost:27017/e-learning'
const db = mongoose.connect(dbUrl, { useMongoClient: true })

db.on("error", function(error) {
    console.log("数据库连接失败：" + error)
})
db.once("open", function() {
    console.log("------ 数据库连接成功！------")
})

// 设置请求头与跨域

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200);
        // 让options请求快速返回
    } else {
        next();
    }
});

app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(session({
    secret: uuid(),
    cookie: {
        maxAge: 60 * 1000 * 30, // 过期时间（毫秒）
        httpOnly: true
    },
    store: new MongoStore({
        url: dbUrl,
        touchAfter: 30 * 60
    })
}));

// app.use('/static', express.static('./picture'));
app.use(express.static('./uploads'));
app.use('/picture', express.static('./picture'));
app.use(express.static('./views/dist'));

app.use('/', index);
app.use('/user', user_api)
app.use('/file', file_api)
app.use('/comment', comment_api)
app.use('/logging',logging_api)

// 路由设置
const port = normalizePort(process.env.PORT || '3456');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

console.log(`Server running at http://localhost:${port}/`);
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
}