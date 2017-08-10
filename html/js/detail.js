/**
 * Created by Administrator on 2017/8/9.
 */
define(function (require,exports,module) {
    let common = require("common");
    let jQuery = require("lib/jQuery-1.11.0");
    let jscookie = require("lib/js-cookie");
    let template = require("lib/template");

    function start() {
        $(function () {
            let inint_item =
                [common.headerLoadA,
                    common.headerLoadB,
                    common.bottomLoadA,
                    common.bottomLoadB,
                    common.pageInit,
                    common.recentLook,
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
        $.get("json/productdetail.json",function (data) {
            let html = "";
            let spdata = data["list"][idArr[0]];
            $pbr.find("h5").html(spdata["subtitle"]);
            for(let i in spdata["detailImgArr"]){
                html +=  "<img src='"+spdata["detailImgArr"][i]+"'>";
            }
            $(".main-content").html(html);
            //-----color加载-----
            if(spdata["type"].length >1){
                html = "<div class='select-bar color'> <div class='title'>颜色:</div>";
                for(let i in spdata["type"]){
                    html += "<div class='type-item' data-id='"+spdata["type"][i]["id"]+"'>"+spdata["type"][i]["name"]+"</div>"
                }
                html+="</div>";
            }else{
                html = "<div class='select-bar color'> <div class='title'>颜色:</div>"
                +"<div class='type-item' data-id='"+spdata["type"][0]["id"]+"'>默认</div>"
                +"</div>"
            }
            $selectins1.append(html);
            $(".select-bar.color .type-item").click(function () {
                $(this).addClass("active").siblings().removeClass("active");
                setRecentP($(this).attr("data-id"));
                getDetail($(this).attr("data-id"));
            }).filter("[data-id="+idArr[0] + "-" + idArr[1]+"]").click();
            let numinp = $("#numipt");
            $(".buy-t").find(".jian").click(function () {
                let num = numinp.val();
                if(num > 1){
                    numinp.val(num -1);
                }
            }).end().find(".jia").click(function () {
                numinp.val(+numinp.val()+1);
            });
            zoomInit();
            otherInit();
        });

        //弹层初始化及加入购物车初始化
        function otherInit(){
            let $cover = $(".cover");
            $cover.find(".btn1,i").click(function () {
                $cover.hide();
            });
            $cover.find(".btn2").click(function () {
                location.assign("cart.html");
            });

            $(".buy-b .bb-btn").click(function () {
                $cover.show();
                common.addCartByPid(
                    $(".select-bar.color .type-item.active").attr("data-id"),
                    $("#numipt").val(),
                    $(".select-bar.edition .type-item.active").html(),
                    $(".pt-1 span").filter("[data-price]").attr("data-price"));
            });

        }

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

        function setRecentP(pid){
            let ck = Cookies.get("rensentItem");
            if(ck){
                let cArr = JSON.parse(ck);
                for(let i in cArr){
                    if(cArr[i] == pid){
                        cArr.splice(i,1);
                        break;
                    }
                }
                cArr.unshift(pid);
                if(cArr.length>5){
                    cArr.pop();
                }
                Cookies.set("rensentItem",cArr);
            }else{
                Cookies.set("rensentItem",[pid]);
            }
        }

        //辅数据加载 ---edition
        function getDetail(pid){
            $.get("json/productlist.json",function (data) {
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
                    $(".pt-1 span:nth-child(2)").html("￥ "+spdata["edition"][$(this).index()-1]["price"]).attr("data-price",spdata["edition"][$(this).index()-1]["price"]);
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

    //加载评论
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
            let lv3num = data["lv3"]["list"].length;
            let lv2num = data["lv2"]["list"].length;
            let lv1num = data["lv1"]["list"].length;
            let sum = lv3num + lv2num + lv1num;

            let lcl3 = Math.round((lv3num/sum)*100);
            let lcl2 = Math.round((lv2num/sum)*100);
            let lcl1 = Math.round((lv1num/sum)*100);
            let cArr = [lcl3,lcl2,lcl1];

            $(".msg-nav li").click(function () {
               $(this).addClass("active").siblings().removeClass("active");
               console.log($(this).index());
                $(".msg_list").eq($(this).index()).show().siblings(".msg_list").hide();
            }).eq(0).find("span").html(lv3num)
                .end().end().eq(1).find("span").html(lv2num)
                .end().end().eq(2).find("span").html(lv1num);

            for(let i in cArr){
                $(".p2 .p2-item").eq(i).find(".process-bar")
                    .css({"background":"linear-gradient(to right,#3F85D0 "+cArr[i]+"%, #B6B5B5 "+cArr[i]+"%)"})
                    .end().find("span").html(cArr[i]+"%");
            }
            $(".p1 span").html(lcl3+"%");

            let html = template("commontTemp",data["lv3"]);
            $(".msg_list.lv3").html(html).show();
            html = template("commontTemp",data["lv2"]);
            $(".msg_list.lv2").html(html);
            html = template("commontTemp",data["lv1"]);
            $(".msg_list.lv1").html(html);
        });
    }
        https://miracle-f1.github.io/Flnet/
    module.exports = {
        start:start
    }
}
);