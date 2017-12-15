(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [分组相关服务js] [Group related services js]
     * @version  3.0.2
     * @service  $rootScope [注入根作用域服务] [Inject rootscope service]
     */ 
    angular.module('eolinker')
        .factory('GroupService', GroupFactory);

    GroupFactory.$inject = ['$rootScope']

    function GroupFactory($rootScope) {
        var data = {
            info: {
                group: null //分组列表 Group list
            },
            fun: {
                get: null, 
                set: null, 
                clear:null,
            }
        }
        /**
         * @function [获取分组] [Get the grouping]
         */
        data.fun.get = function() {
            return data.info.group;
        }
        /**
         * @function [设置分组] [Separate Group]
         * @param    {[string]}   request [分组内容 Grouping content]
         * @param    {[boolean]}   boolean [是否需要初始化 Whether it needs to be initialized]
         */
        data.fun.set = function(request, boolean) {
            data.info.group = request;
            if (boolean) {
                $rootScope.$broadcast('$SidebarFinish');
            }
        }

        /**
         * @function [清空分组服务信息] [Empty the packet service information]
         */
        data.fun.clear = function() {
            data.info.group=null;
        }
        return data.fun;
    }
})();
