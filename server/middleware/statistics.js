var ranaly = require('node_ranaly');
var now = require('moment')();

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
Logging.prototype.get = function(tableName,date){
    date = date || now.format('YYYYMMDD');
    return new Promise (function(resolve,reject){
        this.statistics[tableName].get(date,(err,result)=>{
            resolve(err,result);
        })
    })

}
Logging.prototype.getAll =async function(date){
    let result = null;
    for(ele in this.statistics){
        try{
            //这种解决方案相当于阻塞了线程，并发是否能提高性能，待研究
            result[ele] = await this.get(ele,date);
        }catch(err){
            console.log(err);
        }
    }
    return result;
}


function convert(str){
    return str[0].toUpperCase()+str.substring(1);
}

LoggingObj = Logging.getInstance(6379,"localhost",["user"])

module.exports = LoggingObj;