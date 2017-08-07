/**
 * Created by Administrator on 2017/8/7.
 */
define(function (require,exports,module) {
    let common = require("common");
    let jQuery = require("lib/jQuery-1.11.0");
    let jscookie = require("lib/js-cookie");
    main(common);
});

function main(common){
    $(function () {
        //页面初始化
        let inint_item=
            [common.headerLoadA,
                common.bottomLoadB,
                common.pageInit,
                formInit];

        common.pageInit(inint_item);

    });
}

//===================================Function=========================================

function formInit(){
    let code = refCode();
    $(".item-box a").click(function () {code = refCode();});
    $(".login-btn").click(function () {
        let username = $("#username").val();
        let password = $("#password").val();
       $.post("json/user.json",function (data) {
           for(let i in data){
               if(data[i]["username"] == username && data[i]["password"] == password){
                   window.open("index.html","_blank");
               }
           }
       });
    });
}

function refCode(){
    let code = "" + getRandomChar() + getRandomChar() + getRandomChar() + getRandomChar();
    $(".code-show").html(code);
/*    $.removeCookie("ins");
    console.log( $.cookie("ins"));*/
    return code;
}

function getRandomChar(){
    if(Math.floor(Math.random()*2)){
        return String.fromCharCode(Math.floor(Math.random()*26+65));
    }else{
        return Math.floor(Math.random()*10);
    }
}