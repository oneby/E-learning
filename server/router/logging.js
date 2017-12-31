const express = require('express')
const router = express.Router()
const Oauth = require('../middleware/user').oAuthAdmin;
const logging = require("../middleware/statistics");
router.get('/',Oauth,(req,res)=>{
    let date = req.param.date || null;
    res.json(logging.getAll(date));
})
router.get('/:table',Oauth,(req,res)=>{
    let date = req.param.date || null;    
    logging.get(table,date).then((err,result)=>{
        res.json(result);
    })
})

module.exports = router