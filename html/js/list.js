/**
 * Created by Administrator on 2017/8/8.
 */
define(function (require,exports,module) {
    let common = require("common");
    let jQuery = require("lib/jQuery-1.11.0");
    let jscookie = require("lib/js-cookie");
    let template = require("lib/template");

    main(common);

    function main(common,template){
        $(function () {
            let inint_item=
                [common.headerLoadA,
                    common.headerLoadB,
                    common.bottomLoadA,
                    common.bottomLoadB,
                    common.pageInit,
                    showPList];

            common.pageInit(inint_item);
        });
    }

//===================================Function=========================================

    function showPList(){
        $.post("json/products.json",function (data) {
            let html = template("productTemp",data);
            console.log(html);
        });
    }
});

