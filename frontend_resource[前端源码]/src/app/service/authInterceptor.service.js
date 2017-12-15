(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [交互拦截相关服务js] [Interception related services js]
     * @version  3.0.2
     * @service  $rootScope [注入根作用域服务] [inject rootScope service]
     * @service  $q [注入$q服务] [inject $q service]
     * @service  $filter [注入过滤器服务] [inject filter service]
     * @constant AUTH_EVENTS [注入权限事件常量] [inject authority event constant service]
     */
    angular.module('eolinker')
        .factory('AuthInterceptor', AuthInterceptor);

    AuthInterceptor.$inject = ['$rootScope', '$q', '$filter', 'AUTH_EVENTS']

    function AuthInterceptor($rootScope, $q, $filter, AUTH_EVENTS) {
        var Auth;
        var data = {
            info: {
                auth: null
            },
            fun: {
                request: null, 
                response: null, 
                responseError: null 
            }
        }
        /**
         * @function [交互请求功能函数] [Interactive request]
         * @param    {[obj]}   config [相关配置 Related configuration] 
         */
        data.fun.request = function(config) { 
            config.headers = config.headers || {};
            if (config.method == 'POST') {
            }
            return config;
        };

        /**
         * @function [交互响应功能函数] [Interactive response]
         * @param    {[obj]}   response [返回信息 returned messages]
         */
        data.fun.response = function(response) { 
            if (response.data) {
                $rootScope.$broadcast({
                    901: AUTH_EVENTS.UNAUTHENTICATED,
                    401: AUTH_EVENTS.UNAUTHORIZED
                }[response.data.code], response);
                try {
                    if (typeof response.data == 'object') {
                        response.data = JSON.parse($filter('HtmlFilter')(angular.toJson(response.data)));
                    }
                } catch (e) {
                    response.data = response.data;
                    $rootScope.$broadcast(AUTH_EVENTS.SYSTEM_ERROR);
                }
            }
            return $q.resolve(response);
        };

        /**
         * @function [交互响应出错功能函数] [Interaction response error]
         * @param    {[obj]}   rejection [拒绝信息 Reject information]
         */
        data.fun.responseError = function(rejection) { 
            $rootScope.$broadcast(AUTH_EVENTS.SYSTEM_ERROR);
            return rejection;
        };
        return data.fun;
    }
})();
