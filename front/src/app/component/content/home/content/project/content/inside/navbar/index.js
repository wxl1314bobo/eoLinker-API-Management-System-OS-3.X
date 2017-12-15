(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [顶部栏（navbar）相关服务js] [Top bar (navbar) related services js]
     * @version  3.0.2
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $state [注入路由服务] [Injection state service]
     * @service  $filter [注入过滤器服务] [Injection filter service]
     * @service  NavbarService [注入NavbarService服务] [Injection NavbarService service]
     */
    angular.module('eolinker')
        .component('homeProjectInsideNavbar', {
            templateUrl: 'app/component/content/home/content/project/content/inside/navbar/index.html',
            bindings: {
                shrinkObject: '<'
            },
            controller: homeProjectInsideNavbarController
        })

    homeProjectInsideNavbarController.$inject = ['$scope', '$state', '$filter', 'NavbarService'];

    function homeProjectInsideNavbarController($scope, $state, $filter, NavbarService) {
        var vm = this;
        vm.data = {
            service: {
                navbar: NavbarService
            },
            info: {
                menu: [
                    { href: '/api/',name: $filter('translate')('012130'), sref: 'home.project.inside.api', icon: 'icon-api', childSref: 'home.project.inside.api.list', key: 0 },
                    { href: '/code',name: $filter('translate')('012131'), sref: 'home.project.inside.code', childSref: 'home.project.inside.code.list', icon: 'icon-icocode', key: 1 },
                    {href: '/env', name: $filter('translate')('012132'), sref: 'home.project.inside.env', icon: 'icon-waibuhuanjing',params:{envID:null}, key: 2 },
                    { href: '/team',name: $filter('translate')('012133'), sref: 'home.project.inside.team', icon: 'icon-renyuanguanli', key: 4 },
                ]
            },
            fun: {
                initMenu: null, 
                menu: null, 
                shrink: null 
            }
        }

        /**
         * @function [菜单功能函数] [menu]
         */
        vm.data.fun.menu = function(arg) {
            vm.data.service.navbar.info.navigation.current = arg.item.name;
            if (arg.item.childSref) {
                $state.go(arg.item.childSref,arg.item.params);
            } else {
                $state.go(arg.item.sref,arg.item.params);
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
         * @function [初始化功能函数] [initialization]
         */
        vm.data.fun.initMenu = function(arg) {
            if (window.location.href.indexOf(arg.item.href) > -1) {
                vm.data.service.navbar.info.navigation = {
                    query: [{ name: $filter('translate')('012130'), sref: 'home.project.api.default' }, { name: $state.params.projectName }],
                    current: arg.item.name
                }
            }
        };
        $scope.$on('$locationChangeSuccess', function() {
            for (var key = 0; key < vm.data.info.menu.length; key++) {
                var val = vm.data.info.menu[key];
                if (window.location.href.indexOf(val.href) > -1) {
                    vm.data.service.navbar.info.navigation = {
                        query: [{ name: $filter('translate')('012130'), sref: 'home.project.api.default' }, { name: $state.params.projectName }],
                        current: val.name
                    }
                }
            }
        })
    }

})();