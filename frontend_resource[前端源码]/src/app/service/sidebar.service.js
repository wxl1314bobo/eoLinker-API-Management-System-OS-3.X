(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [侧边栏（sidebar）相关服务js] [Sidebar (sidebar) related services js]
     * @version  3.0.2
     * @service  $state [注入路由服务] [Inject state service]
     */
    angular.module('eolinker')
        .factory('SavbarService', SavbarService);

    SavbarService.$inject = ['$state']

    function SavbarService($state) {
        var data = {
            fun: {
                menu: null, 
                shrink:null,
            }
        }
        /**
         * @function [菜单功能函数] [menu]
         * @param    {[obj]}   arg [侧边栏信息 Sidebar information]
         */
        vm.data.fun.menu = function(arg) {
            if (arg.item.childSref) {
                $state.go(arg.item.childSref);
            } else if (arg.item.sref) {
                $state.go(arg.item.sref);
            } else {
                window.open(arg.item.href);
            }
        }

        /**
         * @function [收缩功能函数] [shrink]
         * @param    {[obj]}   arg [{shrinkObject:收缩信息 Shrink information}]
         */
        vm.data.fun.shrink = function(arg) {
            arg.shrinkObject.isShrink = !arg.shrinkObject.isShrink;
        }
        return data;
    }
})();
