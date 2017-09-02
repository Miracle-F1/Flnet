let usercol = require("./mongoConnect").user;

function insertUser(json,fn){
    usercol.find({"username":json["username"]},function (err,result) {
        result.toArray((err,arr)=>{
            if(arr.length > 0){
                fn({"msg":1});
            }else{
                usercol.insertOne(json,function(err){
                    if(err){
                        fn({"msg":3});
                    }
                    fn({"msg":0});
                });
            }
        });
    });
}

function getUserByUAP(json,fn){
    usercol.find(json,function (err,result) {
        result.toArray((err,arr)=>{
            if(arr.length > 0){
                fn({"msg":0});
            }else{
                fn({"msg":1});
            }
        });
    });
}


module.exports = {
    insertUser,
    getUserByUAP
};