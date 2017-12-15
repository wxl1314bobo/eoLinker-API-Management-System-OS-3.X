(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [api详情相关服务js] [api details related services js]
     * @version  3.0.2
     */
    angular.module('eolinker')
        .factory('ApiDetailService', ApiDetailFactory);

    ApiDetailFactory.$inject = []

    function ApiDetailFactory() {
        var data = {
            info: {
                apiDetail: null//api详情存储变量 api details store variables
            },
            fun: {
                get: null, 
                set: null 
            }
        }
        /**
         * @function [获取api详情功能函数] [Get the api detail function]
         */
        data.fun.get=function(){
            return data.info.apiDetail;
        }
        /**
         * @function [设置api详情功能函数] [Set the api details function]
         */
        data.fun.set=function(request){
            data.info.apiDetail = request;
        }
        return data.fun;
    }
})();
