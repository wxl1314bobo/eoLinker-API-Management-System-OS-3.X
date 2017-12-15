(function() {
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [全局sidebar指令相关js] [Global sidebar instruction related js]
     * @version  3.0.2
     * @service  $scope [注入作用域服务] [inject scope service]
     * @service  $state [注入路由服务] [inject state service]
     * @service  NavbarService [注入NavbarService服务] [inject NavbarService service]
     * @service  $filter [注入过滤器服务] [inject filter service]
     */
    angular.module('eolinker')
        .component('eoSidebar', {
            templateUrl: 'app/component/sidebar/index.html',
            controller: sidebarController,
            bindings: {
                shrinkObject: '<'
            }
        })

    sidebarController.$inject = ['$scope', '$state', 'NavbarService', '$filter'];

    function sidebarController($scope, $state, NavbarService, $filter) {

        var vm = this;
        vm.data = {
            service: {
                default: NavbarService,
            },
            info: {
                current: null,
                menu: [{
                        name: $filter('translate')('2209'),
                        sref: 'home.project',
                        icon: 'icon-api',
                        childSref: 'home.project.api.default',
                        isShow: -1
                    }, {
                        name: $filter('translate')('22010'),
                        sref: 'home.database',
                        icon: 'icon-ziliaoku',
                        childSref: 'home.database.list',
                        isShow: -1 
                    }, {
                        name: $filter('translate')('22011'),
                        sref: 'home.user',
                        icon: 'icon-yonghu',
                        childSref: 'home.user.basic',
                        isShow: -1 
                    }, {
                        name: $filter('translate')('22012'),
                        sref: 'home.news',
                        icon: 'icon-xiaoxi',
                        childSref: 'home.news.default',
                        isShow: -1,
                        status: 1
                    }, {
                        name: $filter('translate')('22013'),
                        href: 'https://www.eolinker.com/#/',
                        icon: 'icon-ONLINEkaifa',
                        isShow: -1,
                        divide: 1 //是否有分割线 Whether there is a dividing line 0：默认无 Default none，1：有 yes
                    }
                ]
            },
            fun: {
                childMenu: null, 
                $Sidebar_ResetCurrent: null, 
                initMenu: null, 
                initChildMenu: null, 
                menu: null, 
                shrink: null, 
            }
        }

        /**
         * @function [子级菜单功能函数] [Submenu function function]
         * @param    {[obj]}   arg [{item:传值列表项 Pass the list item}]
         */
        vm.data.fun.childMenu = function(arg) {
            vm.data.service.default.info.navigation.current = arg.item.name;
            if (arg.item.childSref) {
                $state.go(arg.item.childSref, arg.item.params);
            } else if (arg.item.sref) {
                $state.go(arg.item.sref, arg.item.params);
            } else {
                window.open(arg.item.href);
            }
        }
        /**
         * @function [菜单功能函数] [menu]
         * @param    {[obj]}   arg [{item:传值列表项 Pass the list item}]
         */
        vm.data.fun.menu = function(arg) {
            if(arg.item.disable&&vm.data.service.pro.info.isExpire) return;
            var template = {
                storage: JSON.parse(window.localStorage['VERSIONINFO'] || '{}')
            }
            if (!arg.item.href) {
                vm.data.info.current = arg.item;
                vm.data.info.current.back = false;
                vm.shrinkObject.isShrink = false;
                if (arg.item.childList) {
                    vm.data.service.default.info.navigation = {
                        query: [{ name: arg.item.name }],
                        current: arg.item.childList[0].name
                    }
                } else {
                    vm.data.service.default.info.navigation = {
                        current: arg.item.name
                    }
                }
            }
            if (arg.item.childSref) {
                if (arg.item.otherChildSref && template.storage.companyHashKey) {
                    $state.go(arg.item.otherChildSref, { companyHashKey: template.storage.companyHashKey });
                } else {
                    $state.go(arg.item.childSref, { companyHashKey: template.storage.companyHashKey });
                }
            } else if (arg.item.sref) {
                $state.go(arg.item.sref, { companyHashKey: template.storage.companyHashKey });
            } else {
                window.open(arg.item.href);
            }
        }

        /**
         * @function [初始化菜单功能函数] [Initialize the menu]
         * @param    {[obj]}   arg [{item:传值列表项 Pass the list item}]
         */
        vm.data.fun.initMenu = function(arg) {
            if($state.current.name.toUpperCase().indexOf('INSIDE')>-1) return;
            if ($state.current.name.indexOf(arg.item.sref) > -1) {
                vm.data.info.current = arg.item;
                if (arg.item.childList) {
                    vm.data.service.default.info.navigation = {
                        query: [{ name: arg.item.name }]
                    }
                } else {
                    vm.data.service.default.info.navigation = {
                        current: arg.item.name
                    }
                }

            }
        }

        /**
         * @function [初始化子菜单功能函数] [Initialize submenu]
         * @param    {[obj]}   arg [{item:传值列表项 Pass the list item}]
         */
        vm.data.fun.initChildMenu = function(arg) {
            if ($state.current.name.indexOf(arg.item.sref) > -1) {
                vm.data.service.default.info.navigation.current = arg.item.name;
            }
        }

        /**
         * @function [广播重置当前状态功能函数] [The broadcast resets the current state]
         * @param    {[obj]}   _default [原生传参 Native parameter]
         */
        vm.data.fun.$Sidebar_ResetCurrent = function(_default) {
            vm.data.info.current = vm.data.info.menu[0];
            vm.data.service.default.info.navigation = {
                current: vm.data.info.menu[0].name
            }
            vm.data.service.pro.fun.init();
        }

        /**
         * @function [收缩功能函数] [shrink]
         */
        vm.data.fun.shrink = function() {
            vm.shrinkObject.isShrink = !vm.shrinkObject.isShrink;
        }

        /**
         * @function [初始化功能函数，默认sidebar不收缩，监听$Sidebar_ResetCurrent事件]
         * @function [Initialize, the default sidebar does not shrink, listen for the $ Sidebar_ResetCurrent event]
         */
        vm.$onInit=function(){
            $scope.$on('$Sidebar_ResetCurrent', vm.data.fun.$Sidebar_ResetCurrent)
            vm.shrinkObject.isShrink=false;
        }
    }

})();