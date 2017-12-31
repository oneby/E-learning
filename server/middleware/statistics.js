var ranaly = require('node_ranaly');

var Logging = function(host,port,DataArr){
    this.host = host;
    this.port = port;
    this.statistics = null;
    init(host,port,DataArr);
}
Logging.getInstance = (function(){
    var instance = null;
    return function(host,port,DataArr){
        if(!instance){
            instance = new Logging(host,port,DataArr);
        }
        return instance;
    }
})
Logging.prototype.init = function(DataArr){
    ranaly.createClient(this.port,this.port);
    DataArr.forEach(element => {
        this.statistics[element] = new this.client.Amount(convert(element));
    });
}
Logging.prototype.add = function(tableName,count){
    count = count||1;
    this.statistics[tableName].incr(count);
}

function convert(str){
    return str[0].toUpperCase()+str.substring(1);
}

LoggingObj = Logging.getInstance(6379,"localhost",["user"])

module.exports = LoggingObj;