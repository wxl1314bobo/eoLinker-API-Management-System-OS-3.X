(function() {
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [全局navbar指令相关js] [Global navbar instruction related js]
     * @version  3.0.2
     * @service  $scope [注入作用域服务] [inject state service]
     * @service  NavbarService [注入NavbarService服务] [inject NavbarService service]
     */
    angular.module('eolinker')
        .component('eoNavbar2', {
            templateUrl: 'app/component/navbar/nav2/index.html',
            controller: navbar
        })

    navbar.$inject = ['$scope', 'NavbarService'];

    function navbar($scope, NavbarService) {

        var vm = this;
        vm.data = {
            service: {
                navbar: NavbarService,
            },
            info: {
            },
            interaction: {
                response: {
                }
            },
            fun: {
                logout: null, 
                storage: null, 
            }
        }
        
        /**
         * @function [退出登录功能函数]
         */
        vm.data.fun.logout = function() {
            vm.data.service.navbar.fun.logout();
        }

        /**
         * @function [存储当前用户项目状态]
         */
        vm.data.fun.storage = function(arg) {
            arg.loginCall = vm.data.service.navbar.info.userInfo.loginCall;
            window.localStorage.setItem('VERSIONINFO', angular.toJson(arg));
        }

        /**
         * @function [初始化功能函数，当路由改变时重新加载路由]
         */
        vm.$onInit = function() {
            vm.data.service.navbar.fun.$router();
            $scope.$on('$stateChangeSuccess', vm.data.service.navbar.fun.$router);
        }
    }

})();
