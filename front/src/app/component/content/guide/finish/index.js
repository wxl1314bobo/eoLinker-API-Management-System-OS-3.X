(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [安装引导成功页] [Installation successfully page]
     * @version  3.0.2
     * @service  $window [注入window服务] [inject window service]
     * @service  $filter [注入过滤器服务] [inject filter service]
     */
    angular.module('eolinker')
        .config(['$stateProvider','RouteHelpersProvider', function($stateProvider,helper) {
            $stateProvider
                .state('guide.finish', {
                    url: '/finish', 
                    template: '<finish></finish>',
                    auth: true // 页面权限，值为true时在未登录状态可以显示页面，默认为假 When the value is true, the page can be displayed without login. The default is false
                });
        }])
        .component('finish', {
            templateUrl: 'app/component/content/guide/finish/index.html',
            controller: finishCtroller
        })

        finishCtroller.$inject = ['$window', '$filter'];

    function finishCtroller($window, $filter) {
        var vm = this;
        vm.data = {
            info: {
                pageTitle: null
            },
            fun: {
                init: null
            }
        }

        /**
         * @function [初始化功能函数，设置网页title] [Initialize,  set the page title]
         */
        vm.data.fun.init = function() {
            if (window.localStorage['INSTALLINFO']) {
                try {
                    vm.data.info.pageTitle = JSON.parse(window.localStorage['INSTALLINFO']).pageTitle;
                } catch (e) {
                    vm.data.info.pageTitle = $filter('translate')('0015');
                }
                window.localStorage.removeItem('INSTALLINFO');// 移除缓存中的安装信息 Remove the installation information in the cache
                window.localStorage.removeItem('lang');// 移除缓存中的安装信息 Remove the installation information in the cache
            } else {
                vm.data.info.pageTitle = $filter('translate')('0015');
            } 
            window.localStorage.setItem('TITLE', vm.data.info.pageTitle);
        }
        vm.data.fun.init();
        
    }
})();