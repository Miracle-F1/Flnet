let express = require('express');
let router = express.Router();
let userSv = require("../service/userServeice");
let querystr = require("querystring");


//注册接口
router.use('/reg', function(req, res) {
    let str ="";
    req.on("data",function(chunk){
        str+=chunk;
    });
    req.on("end",function () {
        userSv.insertUser(querystr.parse(str),function (data) {
            res.send(data);
        });
    });
});

//登录接口
router.use("/login",function (req, res) {
    let str ="";
    req.on("data",function(chunk){
        str+=chunk;
    });
    req.on("end",function () {
        userSv.getUserByUAP(querystr.parse(str),function (data) {
            if(data["msg"] == 0){
                req.session["user_id"] = querystr.parse(str).username;
                console.log(req.session["user_id"]);
            }
            res.send(data);
        });
    });
});

//退出登录接口
router.use("/logout",function (req, res) {
    req.session["user_id"] = undefined;
    res.end();
});

//判断用户是否登录接口
router.use("/judge",function (req,res) {
    if(req.session["user_id"]){
        res.send({"flag":true,"username":req.session["user_id"]});
    }else{
        res.send({"flag":false});
    }
});

module.exports = router;
