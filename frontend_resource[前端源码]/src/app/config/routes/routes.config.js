(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [路由配置模块] [Routing configuration module]
     * @version  3.0.2
     * @service  $stateProvider [注入路由服务] [inject $stateProvider service]
     * @service  $locationProvider [注入$locationProvider服务] [inject $locationProvider service]
     * @service  $urlRouterProvider [注入$urlRouterProvider服务] [inject $urlRouterProvider service]
     */
    angular
        .module('eolinker')
        .config(routesConfig)
        .run(routesRun);

    routesConfig.$inject = ['$httpProvider', '$locationProvider', '$urlRouterProvider'];

    function routesConfig($httpProvider, $locationProvider, $urlRouterProvider) {
        var data = {
            fun: {
                init: null
            }
        }
        /**
         * @function [初始化功能函数] [Initialization]
         */
        data.fun.init = function() {
            $httpProvider.interceptors.push([
                '$injector',
                function($injector) {
                    return $injector.get('AuthInterceptor');
                }
            ]);
            $locationProvider.html5Mode(false).hashPrefix('');
            $urlRouterProvider.otherwise('/index');
        }
        data.fun.init();
    }

    routesRun.$inject = [];

    function routesRun() {

    }
})();
