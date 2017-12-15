(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [安装引导失败页] [Installation failed page]
     * @version  3.0.2
     * @service  CommonResource [注入通用接口服务] [inject common API service]
     * @service  $state [注入路由服务] [inject $state service]
     * @service  $window [注入window服务] [inject window service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
    angular.module('eolinker')
        .config(['$stateProvider','RouteHelpersProvider', function($stateProvider,helper) {
            $stateProvider
                .state('guide.error', {
                    url: '/error', 
                    template: '<error></error>',
                    auth: true // 页面权限，值为true时在未登录状态可以显示页面，默认为假 When the value is true, the page can be displayed without login. The default is false
                });
        }])
        .component('error', {
            templateUrl: 'app/component/content/guide/error/index.html',
            controller: errorCtroller
        })

        errorCtroller.$inject = ['CommonResource', '$state', '$window', 'CODE'];

    function errorCtroller(CommonResource, $state, $window, CODE) {
        var vm = this;
        vm.data = {
            info: {},
            fun: {
                init: null
            }
        }

        /**
         * @function [初始化功能函数，检测是否已安装，若已安装则跳转首页] [Initialize, check whether it is installed, if it is installed, jump home page]
         */
        vm.data.fun.init = function() {
            if (window.localStorage['INSTALLINFO']) {
                try {
                    var info = JSON.parse(window.localStorage['INSTALLINFO']);
                    vm.data.info.master = info.master;
                    vm.data.info.name = info.name;
                    vm.data.info.userName = info.userName;
                    vm.data.info.password = info.password;
                } catch (e) {
                    vm.data.info.master = '';
                    vm.data.info.name = '';
                    vm.data.info.userName = '';
                    vm.data.info.password = '';
                }
            }
            CommonResource.Install.Config().$promise.then(function(data) {
                if (data.statusCode == CODE.COMMON.SUCCESS) {
                    $state.go('index');
                }
            });
        }
        vm.data.fun.init();
    }
})();