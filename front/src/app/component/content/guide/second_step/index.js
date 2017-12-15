(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [安装引导页step two] [Installation step two page]
     * @version  3.0.2
     * @service  $scope [注入作用域服务] [inject scope service]
     * @service  CommonResource [注入通用接口服务] [inject common API service]
     * @service  $state [注入路由服务] [inject state service]
     * @service  $window [注入window服务] [inject window service]
     * @service  $filter [注入过滤器服务] [inject filter service]
     * @constant CODE [注入状态码常量] [inject status code constant]
     */
    angular.module('eolinker')
        .config(['$stateProvider','RouteHelpersProvider', function($stateProvider,helper) {
            $stateProvider
                .state('guide.second_step', {
                    url: '/second_step',
                    template: '<second></second>',
                    auth: true // 页面权限，值为true时在未登录状态可以显示页面，默认为假 When the value is true, the page can be displayed without login. The default is false
                });
        }])
        .component('second', {
            templateUrl: 'app/component/content/guide/second_step/index.html',
            controller: secondCtroller
        })

        secondCtroller.$inject = ['$scope', 'CommonResource', '$state', '$window', '$filter', 'CODE'];
        
    function secondCtroller($scope, CommonResource, $state, $window, $filter, CODE) {
        var vm = this;
        vm.data = {
            info: {
                submited: false
            },
            fun: {
                init: null,
                enterThird: null
            }
        }

        /**
         * @function [初始化功能函数，检测是否已安装，若已安装则跳转首页] [Initialize, check whether it is installed, if it is installed, jump home page]
         */
        vm.data.fun.init = function() {
            vm.info = {};
            CommonResource.Install.Config().$promise.then(function(data) {
                if (data.statusCode == CODE.COMMON.SUCCESS) {
                    $state.go('index');
                }
            });

            if (window.localStorage['INSTALLINFO']) {
                try {
                    var info = JSON.parse(window.localStorage['INSTALLINFO']);
                    vm.info.dbURL = info.master;
                    vm.info.dbName = info.name;
                    vm.info.dbUser = info.userName;
                    vm.info.dbPassword = info.password;
                    vm.info.pageTitle = info.pageTitle;
                } catch (e) {
                    vm.info.dbURL = 'localhost';
                    vm.info.dbName = 'eolinker_os';
                    vm.info.dbUser = '';
                    vm.info.dbPassword = '';
                    vm.info.pageTitle = $filter('translate')('0015');
                }
            } else {
                vm.info.dbURL = 'localhost';
                vm.info.dbName = 'eolinker_os';
                vm.info.dbUser = '';
                vm.info.dbPassword = '';
                vm.info.pageTitle = $filter('translate')('0015');
            }
        }
        vm.data.fun.init();

        /**
         * @function [判断信息是否填写完整，若完整则存入缓存，并跳转第三步]
         * @function [Determine whether the information is complete, if the complete is stored in the cache, and jump the third step]
         */
        vm.data.fun.enterThird = function() {// 跳转安装第三步 Jump to install the third step
            if ($scope.secondForm.$valid) {
                var userInfo = {
                    master: vm.info.dbURL,
                    name: vm.info.dbName,
                    userName: vm.info.dbUser,
                    password: vm.info.dbPassword,
                    pageTitle:vm.info.pageTitle
                }
                window.localStorage.setItem('INSTALLINFO', JSON.stringify(userInfo));
                $state.go('guide.third_step');
            }
            else{
                vm.data.submited = true;
            }
        }
    }
})();