/**
 * Created by Administrator on 2017/8/8.
 */
define(function (require,exports,module) {
    let common = require("js/common");
    let jQuery = require("lib/jQuery-1.11.0");
    let jscookie = require("lib/js-cookie");
    main(common);
    function main(common){
        $(function () {
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

        let $phone = $("#phonenumber");
        let $email = $("#email");
        let $code = $("#code");
        let $pas = $("#password");
        let $confpas = $("#conf-password");
        let $check = $("#checkA");

        let code = refCode();
        let acArr = [];

        $("#phonetype").click(function () {
            $(".item-box.phone-box").show();
            $(".item-box.email-box").hide();
            phoneCheck();
            canReg();
        });
        $("#emailtype").click(function () {
            $(".item-box.phone-box").hide();
            $(".item-box.email-box").show();
            emailCheck();
            canReg();
        });
        $(".i-r a").click(function () {code = refCode();});
        $phone.blur(function () {phoneCheck();});
        $email.blur(function () {emailCheck();});
        $code.blur(function () {codeCheck(code);});
        $pas.blur(function () {passwordCheck();});
        $confpas.blur(function () {confirmPasswordCheck();});
        $check.click(function () {checkboxIsSel();});
        $(".reg-btn").click(function () {
            let username = "";
            if($("#phonetype").is(":checked")){
                usernameCheck = phoneCheck;
                username = $phone.val();
            }else{
                usernameCheck = emailCheck;
                username = $email.val();
            }
            switch (false){
                case usernameCheck():
                    break;
                case codeCheck():
                    break;
                case passwordCheck():
                    break;
                case confirmPasswordCheck():
                    break;
                case checkboxIsSel():
                    break;
                default:
                    Cookies.set("isLogin",username);
                    location.assign("index.html");
            }
        });

        //手机号检查
        function phoneCheck(){
            return check(
                $phone,
                ! /^(1[3578])\d{9}$/.test($phone.val()),
                "请填写手机号！",
                "请输入以13/15/17/18 开头的11位手机号",0);

        }

        //是否点亮注册按钮
        function canReg(){
            console.log(acArr.join(""));
            if(acArr.join("") == "11111"){
                $(".reg-btn").addClass("active");
            }else{
                $(".reg-btn").removeClass("active");
            }
        }

        //邮箱检查
        function emailCheck(){
            return check($email,
                ! /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test($email.val()),
                "请填写邮箱！",
                "请填写正确的邮箱地址！",0);
        }

        //验证码检查
        function codeCheck(){
            return check($code,
                $code.val() != code,
                "请填写验证码！",
                "验证码填写不正确！",1);
        }

        //密码检查
        function passwordCheck(){
            return check($pas,
                ! (/[a-z].*[A-Z]|[A-Z].*[a-z]/.test($pas.val()) && $pas.val().length >=6),
                "请输入密码！",
                "长度6-18位必须包含大小写字母",2);
        }

        //确认密码检查
        function confirmPasswordCheck(){
            return check($confpas,
                $confpas.val() != $pas.val(),
                "请输入确认密码！",
                "确认密码与原密码不一致！",3);
        }

        //复选框确认勾选
        function checkboxIsSel(){
            if($check.is(":checked")){
                acArr[4] = 1;
                canReg();
                return true;
            }else{
                acArr[4] = 0;
                canReg();
                return false;
            }
        }

        //check
        function check($obj,conditon,msg1,msg2,index){
            let $itemBoxTips = $obj.parents(".item-box").find(".tips");
            if($obj.val().trim() == ""){
                $itemBoxTips.html(" <i class='iconfont'>&#xe61c;</i> " + msg1);
                acArr[index] = 0;
                canReg();
                return false;
            }else if(conditon){
                $itemBoxTips.html(" <i class='iconfont'>&#xe61c;</i>" + msg2);
                acArr[index] = 0;
                canReg();
                return false;
            }else {
                $itemBoxTips.html("");
                acArr[index] = 1;
                canReg();
                return true;
            }
        }
    }




//刷新验证码
    function refCode(){
        let code = "" + getRandomChar() + getRandomChar() + getRandomChar() + getRandomChar();
        $(".code-show").html(code);
        return code;
    }

//随机字母 or 数字
    function getRandomChar(){
        if(Math.floor(Math.random()*2)){
            return String.fromCharCode(Math.floor(Math.random()*26+65));
        }else{
            return Math.floor(Math.random()*10);
        }
    }
});
