(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [数据库navbar模块相关js] [Database navbar module related js]
     * @version  3.0.2
     * @service  $state [注入$state服务] [inject state service]
     * @service  $scope [注入作用域服务] [inject scope service]
     * @service  NavbarService [注入NavbarService服务] [inject NavbarService service]
     * @service  $filter [注入过滤器服务] [inject filter service]
     */
    angular.module('eolinker')
        .component('databaseNavbar', {
            templateUrl: 'app/component/content/home/content/database/content/inside/navbar/index.html',
            bindings: {
                shrinkObject: '<'
            },
            controller: navbarController
        })

    navbarController.$inject = ['$scope', '$state', 'NavbarService', '$filter'];

    function navbarController($scope, $state, NavbarService, $filter) {
        var vm = this;
        vm.data = {
            service: {
                navbar: NavbarService
            },
            info: {
                menu: [
                    {href: '/table', icon: 'icon-ziliaoku', name: $filter('translate')('010126'), sref: 'home.database.inside.table.list', state: 0 },
                    {href: '/team', icon: 'icon-renyuanguanli', name: $filter('translate')('010127'), sref: 'home.database.inside.team', state: 1 }
                ]
            },
            fun: {
                menu: null, 
                shrink: null, 
                initMenu: null
            }
        }

        /**
         * @function [菜单功能函数] [Menu]
         */
        vm.data.fun.menu = function(arg) {
            if (arg.item.childSref) {
                $state.go(arg.item.childSref);
            } else {
                $state.go(arg.item.sref);
            }
        }

        /**
         * @function [收缩功能函数] [shrink]
         */
        vm.data.fun.shrink = function() {
            vm.shrinkObject.isShrink = !vm.shrinkObject.isShrink;
            $scope.$emit('$Home_ShrinkSidebar',{shrink:vm.shrinkObject.isShrink});
        }

        /**
         * @function [菜单初始化功能函数] [Menu initialization]
         */
        vm.data.fun.initMenu = function(arg) {
            if (window.location.href.indexOf(arg.item.href) > -1) {
                vm.data.service.navbar.info.navigation = {
                    query: [{ name: $filter('translate')('010128'), sref: 'home.database.list' }],
                    current: arg.item.name
                }
            }
        };
        $scope.$on('$locationChangeSuccess', function() {
            for (var key = 0; key < vm.data.info.menu.length; key++) {
                var val = vm.data.info.menu[key];
                if (window.location.href.indexOf(val.href) > -1) {
                    vm.data.service.navbar.info.navigation = {
                        query: [{ name: $filter('translate')('010128'), sref: 'home.database.list' }],
                        current: val.name
                    }
                }
            }
        })
    }

})();
