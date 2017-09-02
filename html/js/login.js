/**
 * Created by Administrator on 2017/8/7.
 */
define(function (require,exports,module) {
    let common = require("common");
    let jQuery = require("lib/jQuery-1.11.0");
    let jscookie = require("lib/js-cookie");

    function start(){
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

//表单初始化及相关事件
    function formInit(){
        let code = refCode();
        $("#username").blur(function () {usernameCheck();});
        $("#password").blur(function () {passwordCheck();});
        $(".item-box a").click(function () {code = refCode();});
        $(".login-btn").click(function () {
            let username = $("#username").val();
            let password = $("#password").val();
            switch (false){
                case usernameCheck():
                    break;
                case passwordCheck():
                    break;
                case codeCheck(code):
                    break;
                default:
                    $.ajax({
                        url:"/user/login",
                        type:"POST",
                        data:{
                            "username":username + "",
                            "password":password + ""
                        },
                        dataType:"json",
                        success:function (data) {
                            switch (+data.msg){
                                case 0 :
                                    location.assign("index.html");
                                    break;
                                default :
                                    $(".tips").html("<i class='iconfont'>&#xe61c;</i> 您输入的用户名或密码不正确，请重新输入！");
                            }
                        }
                    });
            }
        });
    }
//刷新验证码
    function refCode(){
        let code = "" + getRandomChar() + getRandomChar() + getRandomChar() + getRandomChar();
        $(".code-show").html(code);
        return code;
    }

//用户名检查
    function usernameCheck(){
        if($("#username").val().trim() == ""){
            $(".tips").html("<i class='iconfont'>&#xe61c;</i> 请输入用户名！");
            return false;
        }else{
            $(".tips").html("");
            return true;
        }
    }

//密码检查
    function passwordCheck(){
        if($("#password").val() == ""){
            $(".tips").html("<i class='iconfont'>&#xe61c;</i> 请输入密码！");
            return false;
        }else{
            $(".tips").html("");
            return true;
        }
    }

//验证码检查
    function codeCheck(code){
        if($("#code").val() != code){
            $(".tips").html("<i class='iconfont'>&#xe61c;</i> 验证码错误！");
            return false;
        }else{
            $(".tips").html("");
            return true;
        }
    }

//产生随机字母 or 数字
    function getRandomChar(){
        if(Math.floor(Math.random()*2)){
            return String.fromCharCode(Math.floor(Math.random()*26+65));
        }else{
            return Math.floor(Math.random()*10);
        }
    }

    module.exports = {
        start:start
    }

});

