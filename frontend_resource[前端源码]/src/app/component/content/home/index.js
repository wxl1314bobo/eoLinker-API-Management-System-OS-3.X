(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [项目内页相关指令js] [The project is related to the instruction js]
     * @version  3.0.2
     * @service  $scope [注入作用域服务] [inject scope service]
     * @service  $state [注入$state服务] [inject state service]
     */
    angular.module('eolinker')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    template: '<home></home>'
                });
        }])
        .component('home', {
            templateUrl: 'app/component/content/home/index.html',
            controller: indexController,
        })
    indexController.$inject = ['$scope', '$state'];

    function indexController($scope, $state) {
        var vm = this;
        vm.data = {
            info: {
                shrinkObject: {},
                sidebarShow: null
            },
            fun: {
                $Home_ShrinkSidebar: null,
                init: null 
            }
        }
        /**
         * @function [初始化功能函数] [initialization]
         */
        vm.data.fun.init = function(arg) {
            if (!/inside/.test(arg.key.toLowerCase())) {
                vm.data.info.sidebarShow = true;
            } else {
                vm.data.info.sidebarShow = false;
            }
        }

        /**
         * @function [设置侧边栏收缩功能函数] [Set the sidebar to shrink]
         */
        vm.data.fun.$Home_ShrinkSidebar = function(_default, arg) {
            vm.data.info.shrinkObject.isShrink = arg.shrink;
        }
        vm.data.fun.init({ key: window.location.href });
        $scope.$on('$stateChangeSuccess', function() {
            if (!/inside/.test($state.current.name.toLowerCase())) {
                vm.data.info.sidebarShow = true;
            } else {
                vm.data.info.sidebarShow = false;
            }
        })
        $scope.$on('$Home_ShrinkSidebar', vm.data.fun.$Home_ShrinkSidebar);
    }
})();