/**
 * Created by Administrator on 2017/8/5.
 */
define(function (require,exports,module) {
    let jQuery= require("lib/jQuery-1.11.0");

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
            });
        }

        function bottomLoadA(){
            $(".bottom-a").load("html-snippets/bottom-1.html");
        }

        function bottomLoadB(){
            $(".bottom-b").load("html-snippets/bottom-2.html");
        }

        //内部函数
        function searchInit(){
            let $slideContent = $(".slide-content");
            $(".search-box").mouseleave(function () {
                $slideContent.fadeOut("fast");
            }).find("input").click(function () {
                $slideContent.fadeIn("fast");
            });
        }

        function headerCartInit(){

        }

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

        module.exports = {
            //页面片段加载
            headerLoadA:headerLoadA,
            headerLoadB:headerLoadB,
            bottomLoadA:bottomLoadA,
            bottomLoadB:bottomLoadB
        }
    }
);