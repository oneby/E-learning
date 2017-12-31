var ranaly = require('node_ranaly');
var client = ranaly.createClient(6379,"localhost");
var users = new client.Amount('Users');

let statistics = {
    users
}
module.exports =statistics;