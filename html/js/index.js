/**
 * Created by Administrator on 2017/8/5.
 */
define(function (require,exports,module) {
    let jQuery= require("lib/jQuery-1.11.0");
    let common = require("common");
    let template = require("lib/template");

    main(common,template);
});

function main(common,template){
    $(function(){
        //页面初始化
        let inint_item=
            [common.headerLoadA,
            common.headerLoadB,
            common.bottomLoadA,
            common.bottomLoadB,
            common.pageInit,
                rightNavInit,
                topADInit,
                bannerInit];

        common.pageInit(inint_item);

    });

    //===================================Function=========================================

    //左边导航栏
    function rightNavInit(inint_item){
        $(window).scroll(function () {
            let $leftNav = $(".left_sub_nav");
            if($(this).scrollTop()>700){
                $leftNav.fadeIn(500);
            }else{
                $leftNav.fadeOut(500);
            }
        });
    }

    //顶部广告
    function topADInit(){
        $("#ad-hide-btn").click(function () {
            $(this).parent().fadeOut("fast");
        })
    }

    //Banner
    function bannerInit(){
        let html = [];
        let i = 0;
        let showIndex=0;
        let timer = null;
        $.get("json/index.json",function (data) {
            let html = template("bannerTemp",data);
            $(".pic_show").html(html);
            let $picLi = $(".pic_show li");
            $picLi.eq(0).show();
            timer = getTimer();
            $(".pic_nav li").click(function () {
                clickShow($(this).index());
            });

            $("#banner").find(".prev").click(function () {
                if(showIndex == 0){
                    clickShow(data["BannerURL"].length-1);
                }else{
                    clickShow(showIndex-1);
                }
            }).end().find(".next").click(function () {
                if(showIndex == data["BannerURL"].length-1){
                    clickShow(0);
                }else{
                    clickShow(showIndex+1);
                }
            });

            function clickShow(index){
                $(".pic_nav li").removeClass("active").eq(index).addClass("active");
                $picLi.finish().hide().eq(index).fadeIn("fast");
                i = showIndex = index;
                timer = getTimer();
            }

            function getTimer(){
                clearInterval(timer);
                return setInterval(function () {
                    $(".pic_nav li").removeClass("active").eq(showIndex).addClass("active");
                    $picLi.eq(i).fadeIn("fast",function () {
                        i++;
                        if(i >= data["BannerURL"].length+1){
                            $picLi.hide().eq(0).show();
                            i=1;
                        }
                        showIndex = i;
                        if(i == data["BannerURL"].length){
                            showIndex = 0;
                        }
                    });
                },1500);
            }
        });
    }
}