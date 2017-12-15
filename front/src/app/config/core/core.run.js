(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [核心配置模块] [Core configuration module]
     * @version  3.0.2
     * @service  $rootScope [注入根作用域] [inject rootScope service]
     * @service  $state [注入路由服务] [inject state service]
     * @service  CommonResource [注入通用接口服务] [inject common API service]
     * @constant AUTH_EVENTS [注入权限事件常量] [inject authority event constant service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
    angular
        .module('eolinker')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', 'CommonResource', 'AUTH_EVENTS', 'CODE'];

    function appRun($rootScope, $state, CommonResource, AUTH_EVENTS, CODE) {
        var data = {
            info: {
                title: {
                    root: $rootScope.title
                },
                _hmt:[]
            },
            fun: {}
        };

        /**
         * @function [监听路由改变功能函数] [watch route change]
         * @param    {[obj]}   _default [原生传参 Native parameter]
         * @param    {[obj]}   arg [{auth:值为真时表示该页面在未登录状态下可以访问 When the value is true, it indicates that the page can be accessed without login}]
         */
        $rootScope.$on('$stateChangeStart', function(_default, arg) {
            window.scrollTo(0, 0);
            if (!arg.auth) {
                CommonResource.Guest.Check().$promise.then(function(response) {
                    switch (response.statusCode) {
                        case CODE.COMMON.UNLOGIN:
                            {
                                if ($state.current.name.indexOf('transaction') > -1) {
                                    $state.go('index');
                                } else {
                                    $rootScope.$broadcast(AUTH_EVENTS.UNAUTHENTICATED);
                                }
                                break;
                            }
                        case CODE.COMMON.UNAUTH:
                            {
                                $rootScope.$broadcast(AUTH_EVENTS.UNAUTHORIZED);
                                break;
                            }
                    }
                })
            }
        });

        /**
         * @function [转换交互功能函数] [Conversion interaction]
         * @param    {[obj]}   _default [原生传参 Native parameter]
         * @param    {[obj]}   arg [自定义传参 customized parameter]
         */
        $rootScope.$on('$translateferStation', function(_default, arg) { 
            $rootScope.$broadcast(arg.state, arg.data);
        });

        /**
         * @function [设置title功能函数] [Setting title]
         * @param    {[obj]}   _default [原生传参] [原生传参 Native parameter]
         * @param    {[obj]}   arg [{list:title列表项 Title list item}]
         */
        $rootScope.$on('$WindowTitleSet', function(_default, arg) { 
            arg = arg || { list: [] };
            if (arg.list.length > 0) {
                window.document.title = arg.list.join('-') + (arg.list.length >= 1 ? '-' : '') +$rootScope.title;
            } else {
                window.document.title = $rootScope.title;
            }
        });

        /**
         * @function [监听服务器出错功能函数] [watch server error]
         * @param    {[obj]}   _default [原生传参 Native parameter]
         */
        $rootScope.$on(AUTH_EVENTS.SYSTEM_ERROR, function(_default) {
            console.log("error");
        })

        /**
         * @function [监听未认证权限功能函数] [watch unauthorized authority]
         * @param    {[obj]}   _default [原生传参 Native parameter]
         */
        $rootScope.$on(AUTH_EVENTS.UNAUTHENTICATED, function(_default) {
            $state.go('index');
        })

        /**
         * @function [监听未登录功能函数] [watch not logged in]
         * @param    {[obj]}   _default [原生传参 Native parameter]
         */
        $rootScope.$on(AUTH_EVENTS.UNAUTHORIZED, function(_default) {
            $state.go('index');
        })
    }

})();
