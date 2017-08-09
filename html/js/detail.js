/**
 * Created by Administrator on 2017/8/9.
 */
define(function (require,exports,module) {
    let common = require("common");
    let jQuery = require("lib/jQuery-1.11.0");
    let jscookie = require("lib/js-cookie");
    let template = require("lib/template");

    main();

    function main() {
        $(function () {
            let inint_item =
                [common.headerLoadA,
                    common.headerLoadB,
                    common.bottomLoadA,
                    common.bottomLoadB,
                    common.pageInit,
                    showPDetail,
                    loadCommont];

            common.pageInit(inint_item);
        });
    }

//===================================Function=========================================

    function showPDetail(){
        let $pbl = $(".pb-l");
        let $pbr = $(".pb-r");
        let $selectins1 = $("#select-ins1");
        let $selectins2 = $("#select-ins2");
        let idArr= common.getQueryString("pid").split("-");

        //主数据加载--color加载
        $.post("json/productdetail.json",function (data) {
            let html = "";
            let spdata = data["list"][idArr[0]];
            $pbr.find("h5").html(spdata["subtitle"]);
            for(let i in spdata["detailImgArr"]){
                html +=  "<img src='"+spdata["detailImgArr"][i]+"'>";
            };
            $(".main-content").html(html);
            //-----color加载-----
            if(spdata["type"].length >1){
                html = "<div class='select-bar color'> <div class='title'>颜色:</div>";
                for(let i in spdata["type"]){
                    html += "<div class='type-item' data-id='"+spdata["type"][i]["id"]+"'>"+spdata["type"][i]["name"]+"</div>"
                }
                html+="</div>";
                $selectins1.append(html);
                $(".select-bar.color .type-item").click(function () {
                    $(this).addClass("active").siblings().removeClass("active");
                    getDetail($(this).attr("data-id"));
                }).filter(":nth-child(2)").click();

            };
            getDetail(idArr[0] + "-" + idArr[1]);
            zoomInit();
            let numinp = $("#numipt");
            $(".buy-t").find(".jian").click(function () {
                let num = numinp.val();
                if(num > 1){
                    numinp.val(num -1);
                }
            }).end().find(".jia").click(function () {
                numinp.val(+numinp.val()+1);
            });
        });


        //放大镜初始化
        function zoomInit(){
            let $azoom = $(".a-zoom");
            let $zoom = $(".zoom");
            $(".img_box").mouseover(function () {
                $azoom.show();
                $zoom.show();
            }).mouseout(function () {
                $azoom.hide();
                $zoom.hide();
            }).mousemove(function (e) {
                let evt = e || window.event;
                let cwid =  $(this).width()  - 310;
                let chei =  $(this).height()  - 310;
                let hei = evt.pageY - $(this).offset().top -155;
                let wid = evt.pageX - $(this).offset().left -155;
                if(hei<0){
                    hei=0;
                }else if(hei>chei){
                    hei =chei;
                }
                if(wid<0){
                    wid=0;
                }else if(wid>cwid){
                    wid=cwid;
                }
                $azoom.css({"left":wid,"top":hei});
                $zoom.css({
                    "backgroundPositionX":-$zoom.width()*wid/$azoom.width(),
                    "backgroundPositionY":-$zoom.height()*hei/$azoom.height(),
                });
            });
        }

        //辅数据加载 ---edition
        function getDetail(pid){
            $.post("json/productlist.json",function (data) {
                let spdata = data["list"][pid];
                $pbr.find("h3").html(data["list"][pid]["title"]);
                //edition遍历
                let html = "<div class='select-bar edition'><div class='title'>类型:</div>";
                for(let i in spdata["edition"]){
                    html += "<div class='type-item'>"+spdata["edition"][i]["type"]+"</div>";
                }
                html+="</div>";
                $selectins2.html(html);
                $(".select-bar.edition .type-item").click(function () {
                    $(this).addClass("active").siblings().removeClass("active");
                    $(".pt-1 span:nth-child(2)").html("￥ "+spdata["edition"][$(this).index()-1]["price"]);
                }).filter(":nth-child(2)").click();

                html= "";
                for(let i in spdata["imgArr"]){
                    if(i>4){
                        break;
                    }
                    html += "<li><img src='"+spdata["imgArr"][i]+"'></li>";
                }
                $(".small_img_bar ul").html(html).find("li").click(function () {
                    $(this).addClass("active").siblings().removeClass("active");
                    $(".img_box img").attr("src",$(this).find("img").attr("src"));
                    $pbl.find(".zoom").css({"backgroundImage":"url("+$(this).find("img").attr("src")+")"})
                }).filter(":first-child").click();
            });
        }
    }
    function loadCommont(){
        $(".main-title-bar").find("li:first-child").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            $(".main-content").show();
            $(".main-msg").hide();
        }).siblings().click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            $(".main-content").hide();
            $(".main-msg").show();
        });
        $.get("json/comment.json",function (data) {
            
        });
    }



}
);