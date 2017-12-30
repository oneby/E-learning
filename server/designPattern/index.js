/*Decorator.js*/
var util = require("util");
var SelectName = require('./../middleware/user');

function Decorator() {
    SelectName.call(this);
    this.selectName = function() {
        SelectName.selectName()
        3
    }
}

// 继承
util.inherits(Decorator, SelectName);


module.exports = Decorator;