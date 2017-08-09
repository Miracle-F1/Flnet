/**
 * Created by Administrator on 2017/8/5.
 */
define(function (require,exports,module) {
    let jQuery= require("lib/jQuery-1.11.0");
    let template = require("lib/template");

        //对外接口
        function headerLoadA(){
            $.ajaxSetup({cache: false}); //关闭AJAX相应的缓存
            $(".header-a").load("html-snippets/top-1.html",function () {
                rightNavInit();
            });
        }

        function headerLoadB(){
            $(".header-b").load("html-snippets/top-2.html",function () {
                searchInit();
                headerCartInit();
                newsInit();
                navInit();
            });
        }

        function bottomLoadA(){
            $(".bottom-a").load("html-snippets/bottom-1.html");
        }

        function bottomLoadB(){
            $(".bottom-b").load("html-snippets/bottom-2.html");
        }

        function getQueryString(name) {
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            let r = window.location.search.substr(1).match(reg);
            if (r != null) return (r[2]);
            return null;
        }


        //-----------------------------内部函数-----------------------------

        //页面初始化
        function pageInit(inint_item){
            if(inint_item){
                for(let i in inint_item){
                    inint_item[i]();
                }
            }
        }

        //搜索框
        function searchInit(){
            let $slideContent = $(".slide-content");
            $(".search-box").find("input").click(function () {
                $slideContent.fadeIn("fast");
            }).end().find(".r-t i").click(function () {
                $slideContent.fadeOut("fast");
            });
        }

        function headerCartInit(){

        }

        //主导航
        function navInit(){
            $.get("json/index.json",function (data) {
                let html = template("testTemp",data);
                $(".type_list ul").html(html);
            });
        }

        //右导航
        function rightNavInit(){
            $(".right-nav dd").eq(0).click(function () {
                $("body").animate({"scrollTop":0},400);
            });
            $(window).scroll(function () {
                if($(this).scrollTop()>600){
                    $(".right-nav dd").eq(0).fadeIn("fast");
                }else{
                    $(".right-nav dd").eq(0).fadeOut("fast");
                }
            });
        }

        //新闻
        function newsInit(){
            $.get("json/index.json",function (data) {
                let newsArr = data["news"];
                let oSpan = $(".header-news span");
                let i = 0;
                oSpan.html(newsArr[0]);
                setInterval(function () {
                    if(i>=newsArr.length-1){
                        i = 0;
                    }
                    else{
                        i++;
                    }
                    oSpan.fadeOut("fast",function () {
                        oSpan.html(newsArr[i]);
                        oSpan.show();
                    });
                },1500);
            });
        }

        module.exports = {
            //页面片段加载
            headerLoadA:headerLoadA,
            headerLoadB:headerLoadB,
            bottomLoadA:bottomLoadA,
            bottomLoadB:bottomLoadB,
            pageInit:pageInit,
            getQueryString:getQueryString
        }
    }
);