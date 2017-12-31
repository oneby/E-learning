const express = require('express')
const router = express.Router()
const Oauth = require('../middleware/user').oAuthAdmin;
const logging = require("../middleware/statistics");
router.get('/',Oauth,(req,res)=>{
    res.json(logging.getAll());
})