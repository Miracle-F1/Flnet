/**
 * Created by Administrator on 2017/8/8.
 */
define(function (require,exports,module) {
    let common = require("common");
    let jQuery = require("lib/jQuery-1.11.0");
    let jscookie = require("lib/js-cookie");
    let template = require("lib/template");

    function start(){
        $(function () {
            let inint_item=
                [common.headerLoadA,
                    common.headerLoadB,
                    common.bottomLoadA,
                    common.bottomLoadB,
                    common.pageInit,
                    common.recentLook,
                    showPList];

            common.pageInit(inint_item);
        });
    }

//===================================Function=========================================

    function showPList(){
        let pageSize =12;
        let $pl = $(".product_list");
        getDataByItemLength("json/productlist.json",0,pageSize,function (data,itemnum) {
            let html = template("productTemp",data);
            $pl.html(html).find("li img").click(function () {
                let id = $(this).parents("li").attr("data-pid");
                location.assign("detail.html?pid="+id);
            });
            pageBtnInit(itemnum,pageSize);
        },true);
    }

    //分页按钮初始化
    function pageBtnInit(itemnum,pageSize){
        let $pages_nav = $(".pages_nav");
        let pagenum = Math.ceil(itemnum/pageSize);
        let html = "<li class='active'>"+1+"</li>";
        for(let i = 2 ;i<pagenum+1;i++){
            html+= "<li>"+i+"</li>";
        }
        $pages_nav.find("ul").html(html);
        $pages_nav.find(".a_btn.prev").click(function () {
            let aindex = $pages_nav.find("ul li.active").index();
            if(aindex != 0){
                setItemList(aindex-1,pageSize);
            }
        });
        $pages_nav.find(".a_btn.next").click(function () {
            let aindex = $pages_nav.find("ul li.active").index();
            if(aindex + 1 != pagenum){
                setItemList(aindex+1,pageSize);
            }
        });
        $pages_nav.find("ul li").click(function () {
            if($(this).is(":not(.active)")){
                setItemList($(this).index(),pageSize);
            }
        });

    }

    //设置商品列表内容
    function setItemList(index,pageSize){
        $(".pages_nav li").eq(index).addClass("active").siblings().removeClass("active");
        getDataByItemLength("json/productlist.json",index * pageSize,pageSize,function (data) {
            let html = template("productTemp",data);
            $(".product_list").html(html).find("li img").click(function () {
                let id = $(this).parents("li").attr("data-pid");
                location.assign("detail.html?pid="+id);
            });
        });
    }

    //分页获取数据
    function getDataByItemLength(path,begin,pagesize,fn,flag){
        $.post(path,function (data) {
            let adata = {"list": {}};
            let i = 0;
            for(let index in data["list"]){
                if(i >= begin){
                    if(i<(pagesize+begin)){
                        adata["list"][index] = data["list"][index];
                    }else{
                        break;
                    }
                }
                i++;
            }
            if(flag){
                let i = 0;
                for(let index in data["list"]){
                    i++;
                };
                fn(adata,i);
            }else{
                fn(adata);
            }
        });
    }
    module.exports = {
        start:start
    }
});

