(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [顶部栏（navbar）相关服务js] [Top bar (navbar) related services js]
     * @version  3.0.2
     * @service  $state [注入路由服务] [inject state service]
     * @service  CommonResource [注入通用接口服务] [inject common API service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     * @return   data [服务相关对象] [Service related object]
     */
    angular.module('eolinker')
        .factory('NavbarService', NavbarService);

    NavbarService.$inject = ['$state', 'CommonResource', 'CODE']

    function NavbarService($state, CommonResource, CODE) {
        var data = {
            info: {
                status: 0, //登录状态 Login status 0：没登录 Not logged in ，1：已登录 Has logged
                userInfo: {
                    unreadMsgNum: null
                },
                navigation: {
                    query: [],
                    current: ''
                }
            },
            fun: {
                logout: null, 
                $router: null 
            }
        }

        /**
         * @function [退出登录功能函数] [Exit the login function function]
         */
        data.fun.logout = function() {
            var template = {
                promise: null
            }
            template.promise = CommonResource.User.LoginOut().$promise;
            template.promise.then(function(response) {
                switch (response.statusCode) {
                    case CODE.COMMON.SUCCESS:
                        {
                            if (/(project)|(home)|(database)|(gateway)/.test($state.current.name)) { //window.location.href
                                $state.go('index');
                            } else {
                                $state.reload();
                            }
                            data.info.status = 0;
                            break;
                        }
                }
            })
            return template.promise;
        }

        /**
         * @function [路由更换功能函数] [Routing replacement function function]
         */
        data.fun.$router = function() {
            var template = {
                promise: null
            }
            if (data.info.status == 1) {
                template.promise = CommonResource.Message.UnReadNum().$promise
                template.promise.then(function(response) {
                    switch (response.statusCode) {
                        case CODE.COMMON.SUCCESS:
                            {
                                if (data.info.userInfo.unreadMsgNum != response.unreadMsgNum) {
                                    data.info.userInfo.unreadMsgNum = response.unreadMsgNum;
                                }
                                break;
                            }
                        case CODE.COMMON.UNLOGIN:
                            {
                                data.info.status = 0;
                                break;
                            }
                        default:
                            {
                                data.info.unreadMsgNum = 0;
                                break;
                            }
                    }
                });
            } else {
                template.promise = CommonResource.User.Info().$promise;
                template.promise.then(function(response) {
                    switch (response.statusCode) {
                        case CODE.COMMON.SUCCESS:
                            {
                                data.info.userInfo = response.userInfo;
                                data.info.status = 1;
                                break;
                            }
                        default:
                            {
                                data.info.status = 0;
                            }
                    }
                });
            }
            return template.promise;
        }
        
        return data;
    }
})();