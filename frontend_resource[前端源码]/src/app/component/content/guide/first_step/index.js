(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [安装引导页step one] [Installation step one page]
     * @version  3.0.2
     * @service  CommonResource [注入通用接口服务] [inject common API service]
     * @service  $state [注入路由服务] [inject $state service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
    angular.module('eolinker')
        .config(['$stateProvider','RouteHelpersProvider', function($stateProvider,helper) {
            $stateProvider
                .state('guide.first_step', {
                    url: '/first_step',
                    template: '<first></first>',
                    auth: true // 页面权限，值为true时在未登录状态可以显示页面，默认为假 When the value is true, the page can be displayed without login. The default is false
                });
        }])
        .component('first', {
            templateUrl: 'app/component/content/guide/first_step/index.html',
            controller: firstCtroller
        })
    firstCtroller.$inject = ['CommonResource', '$state', 'CODE'];
    
    function firstCtroller(CommonResource, $state, CODE) {
        var vm = this;
        vm.data = {
            fun: {
                init: null 
            }
        }
        /**
         * @function [初始化功能函数，检测是否已安装，若已安装则跳转首页] [Initialize, check whether it is installed, if it is installed, jump home page]
         */
        vm.data.fun.init = function() {
            CommonResource.Install.Config().$promise.then(function(data) {
                if (data.statusCode == CODE.COMMON.SUCCESS) {
                    $state.go('index');
                }
            });
        }
        vm.data.fun.init();
    }
})();