let mongodb = require('mongodb');

let server = new mongodb.Server("127.0.0.1", 27017, {auto_reconnect: true});
let db = new mongodb.Db("dev", server, {safe: true});
db.open();

module.exports = {
    user:db.collection("user"),
};
