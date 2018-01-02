var express = require('express');
var router = express.Router();
var Logging = require('../middleware/statistics');

router.get('/', function(req, res, next) {
    Logging.add('user');
    res.sendfile('./dist/index.html');
});

module.exports = router;