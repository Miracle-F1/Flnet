/**
 * Created by Administrator on 2017/8/10.
 */
define(function (require,exports,module) {
    let common = require("js/common");
    let jQuery = require("lib/jQuery-1.11.0");
    let jscookie = require("lib/js-cookie");
    let template = require("lib/template");

    main();

    function main() {
        $(function () {
            let inint_item =
                [common.headerLoadA,
                    common.bottomLoadB,
                    common.pageInit,
                    showCartDom];

            common.pageInit(inint_item);
        });
    }

    //购物车初始化
    function showCartDom(){
        common.getCartJson(function (data) {
            let $cartItem = $(".cart_item");
            let html = template("cartTemp",data);
            $cartItem.html(html);


            for(let i = 0;i< $(".cart_item .item").length;i++){
                ItemChange(i);
            }

            //购物车加减-----------------------------------------------------
            $(".li-5").find(".jia").click(function () {
                $(this).siblings("input").val(+$(this).siblings("input").val()+1);
                ItemChange( $(this).parents(".item").index());
                if($(this).parents(".item").find("[type=checkbox]").is(":checked")){
                    cartBottomChange();
                }
            }).end().find(".jian").click(function () {
                if($(this).siblings("input").val() != 1){
                    $(this).siblings("input").val(+$(this).siblings("input").val()-1);
                    ItemChange( $(this).parents(".item").index());
                    if($(this).parents(".item").find("[type=checkbox]").is(":checked")){
                        cartBottomChange();
                    }
                }
        });

            let $cover = $(".cover");

            $cover.find(".btn2,i").click(function () {
                $cover.hide();
            });

            $(" .cart_item .li-7 span").click(function () {
                    let oIt = $(this).parents(".item");
                $cover.show().find(".btn1").off().click(function () {
                    //单个删除---------------------------------------------------
                    oIt.remove();
                    cartBottomChange();
                    $cover.hide();
                });
            });

            $(".cart_item [type=checkbox]").click(function () {
                cartBottomChange();
                if($(".cart_item :checked").length == $(".cart_item [type=checkbox]").length){
                    $(".selall")[0].checked = true;
                }else{
                    $(".selall")[0].checked = false;
                }
            });

            $(".selall").click(function () {
                console.log($(this).is(":checked"));
                if($(this).is(":checked")){
                    console.log("aa");
                    $(".cart_item [type=checkbox]").each(function () {
                        this.checked = true;
                    });
                }else{
                    console.log("bb");
                    $(".cart_item [type=checkbox]").each(function () {
                        this.checked = false;
                    });
                }
                cartBottomChange();
            });

            //删除所选----------------------------------------------------
            $(".cart_footer .i3 span").click(function () {
                $(".cart_item [type=checkbox]:checked");
            });


            function cartBottomChange(){
                let $Arr= $cartItem.find(":checked");
                let sum = 0;
                for(let i = 0;i<$Arr.length;i++){
                    sum += +$Arr.eq(i).parents(".item").find(".li-6 span").html();
                }
                $(".cart_footer").find(".i4 span").html(sum).end().find(".i6 span").html($Arr.length);

            }


        });
    }


    function ItemChange(index){
        let $thisItem  = $(".cart_item li").eq(index);
        $thisItem.find(".li-6 span").html($thisItem.find(".li-5-a span").html()*$thisItem.find(".li-5 input").val());
    }


});