/**
 * Created by Administrator on 2017/8/5.
 */

define(function (require,exports,module) {
    let jQuery= require("lib/jQuery-1.11.0");
    let template = require("lib/template");
    let jscookie = require("lib/js-cookie");

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

        function recentLook(){
            let ck = Cookies.get("rensentItem");
            if(ck){
                let cArr = JSON.parse(ck);
                for(let i in cArr){
                    getProductImgID(cArr[i],function (data) {
                        $(".resent_look ul li").eq(i).append(
                            "<a href='detail.html?pid="+data["pid"]+"'><img src='"+data["img"]
                            +"'><p>"+data["title"]+"</p> <div class='price'>￥"+data["price"]+"</div></a>");
                    });
                }
            }
            $(".resent_look h4 span").click(function () {
                Cookies.remove("rensentItem");
                $(".resent_look ul li").html("");
            });
        }

        function getProductImgID(pid,fn){
            $.get("json/productlist.json",function (data) {
                console.log(data);
                for(let i in data["list"]){
                    if(i == pid){
                        fn({"title":data["list"][i]["title"],
                            "img":data["list"][i]["imgArr"][0],
                            "price":data["list"][i]["edition"][0]["price"],
                            "pid":pid});
                        return;
                    }
                }
            });
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
            getCartJson(function (data) {
                console.log("aaaaa"+data);
                let html = template("scartTemp",data);
                $(".cart_item_list ul").html(html);
                $(".cil-f .item_num span,#show-num").html( $(".cart_item_list ul li").length);
                let sum = 0;
                $(".cart_item_list li").each(function () {
                    sum+=$(this).find(".item_info .num").html()*$(this).find(".item_info .price").html();
                });
                $(".item_total_price span").html(sum);
                $(".cart_item_list ul li .del-btn").click(function () {
                    $(this).parents("li").remove();
                    $(".cil-f .item_num span,#show-num").html( $(".cart_item_list ul li").length);
                    let sum = 0;
                    $(".cart_item_list li").each(function () {
                        sum+=$(this).find(".item_info .num").html()*$(this).find(".item_info .price").html();
                    });
                    $(".item_total_price span").html(sum);
                    delCartItem($(this).attr("data-pid"));
                });
            });
        }


        function delCartItem(pid){
            let ckArr = Cookies.getJSON("cart");
            for(let i in ckArr){
                console.log(ckArr[i]["pid"],pid);
                if(ckArr[i]["pid"] == pid){
                    ckArr.splice(i,1);
                    Cookies.set("cart",ckArr);
                    return
                }
            }
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

    function addCartByPid(pid,num,edtion,price){
        let cartC = Cookies.getJSON("cart");
        console.log(cartC);
        if(cartC){
            for(let i in cartC){
                if(cartC[i]["pid"] == pid){
                    cartC[i]["num"] = +cartC[i]["num"] + +num;
                    Cookies.set("cart",cartC);
                    return;
                }
            }
            cartC.push({"pid":pid,"num":num,"edtion":edtion,"price":price});
            Cookies.set("cart",cartC);
        }else{
            Cookies.set("cart",[{"pid":pid,"num":num,"edtion":edtion,"price":price}]);
        }
    }

    function getCartJson(fn){
        $.get("json/productlist.json",function (data) {
            let CJson = {"list":[]};
            let carCookie = Cookies.getJSON("cart");
            console.log(data);
            for(let i in carCookie){
                CJson["list"][i] = {};
                data["list"][carCookie[i]["pid"]]["cprice"] = carCookie[i]["price"];
                data["list"][carCookie[i]["pid"]]["cedition"] = carCookie[i]["edtion"];
                data["list"][carCookie[i]["pid"]]["num"] = carCookie[i]["num"];
                CJson["list"][i][carCookie[i]["pid"]] = data["list"][carCookie[i]["pid"]];
            }
            fn(CJson);
        });
    }

        module.exports = {
            //页面片段加载
            headerLoadA:headerLoadA,
            headerLoadB:headerLoadB,
            bottomLoadA:bottomLoadA,
            bottomLoadB:bottomLoadB,
            pageInit:pageInit,
            getQueryString:getQueryString,
            recentLook:recentLook,
            addCartByPid:addCartByPid,
            getCartJson:getCartJson
        }
    }
);