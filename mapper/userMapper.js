let mongoose = require("../service/mongoConnect");

let UserScheme =new mongoose.Schema({
    username:{type:String},
    password:{type:String}
});

let UserEntity = mongoose.model('UserEntity',UserScheme,'user');//指定在数据库中的collection名称为user
module.exports = UserEntity;//导出实体
