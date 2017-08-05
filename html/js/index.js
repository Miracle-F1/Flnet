/**
 * Created by Administrator on 2017/8/5.
 */
define(function (require,exports,module) {
    let jQuery= require("lib/jQuery-1.11.0");
    let common = require("common");
    main(jQuery,common);
});

function main(jQuery,common){
    $(function(){
        //页面初始化
        let inint_item=
            [common.headerLoadA,
            common.headerLoadB,
            common.bottomLoadA,
            common.bottomLoadB,
                rightNavInit,
                topADInit];

        pageInit(inint_item);


    });

    //===================================Function=========================================

    function pageInit(inint_item){
        if(inint_item){
            for(let i in inint_item){
                inint_item[i]();
            }
        }
    }

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

    //banner
    function bannerInit(){
        let bannerIMGjson = ["","","","","",""];

    }
}