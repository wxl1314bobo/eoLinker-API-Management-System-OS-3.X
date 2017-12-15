(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [项目信息相关服务js] [Project information related services js]
     * @version  3.0.2
     */
    angular.module('eolinker')
        .factory('ProjectService', ProjectFactory);

    ProjectFactory.$inject = []

    function ProjectFactory() {
        var data = {
            info: {
                detail: null,//project详情存储变量 [project details store variables]
                list:null//project列表存储变量 [The project list stores variables]
            },
            fun: {
                detail:{
                    get:null,
                    set:null
                },
                list:{
                    get:null,
                    set:null
                }
            }
        }
        /**
         * @function [获取project详情功能函数] [Get the project details function]
         */
        data.fun.detail.get=function(){
            return data.info.detail;
        }
        /**
         * @function [设置project详情功能函数] [Set the project details function]
         */
        data.fun.detail.set=function(request){
            data.info.detail=request;
        }
        /**
         * @function [获取project list功能函数] [Get the project list function function]
         */
        data.fun.list.get=function(){
            return data.info.list;
        }

        /**
         * @function [设置project list功能函数] [Set the project list function]
         */
        data.fun.list.set=function(request){
            data.info.list=request;
        }
        return data.fun;
    }
})();
