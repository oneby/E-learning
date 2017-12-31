var express = require('express');
var router = express.Router();
var users = require('../middleware/statistics').users;

router.get('/', function(req, res, next) {
    users.incr();
    res.sendfile('./dist/index.html');
});