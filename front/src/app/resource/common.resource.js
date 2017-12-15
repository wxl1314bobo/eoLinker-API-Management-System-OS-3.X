(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [公用接口resource服务定义js] [Common API resource service definition js]
     * @version  3.0.2
     * @service  $resource [注入$resource服务] [Inject the $resource service]
     * @constant serverUrl [注入前缀URL] [Inject the prefix URL]
     */
    angular.module('eolinker.resource')

    .factory('CommonResource', CommonResource)

    CommonResource.$inject = ['$resource', 'serverUrl'];

    function CommonResource($resource, serverUrl) {
        var data = {
            info: {
                api: [],
                method: 'POST'
            }
        }

        data.info.api['Install'] = $resource(serverUrl + '?g=Web&c=Install&o=:operate', {

        }, {
            Config: {
                params: { operate: 'checkConfig' },
                method: data.info.method
            },
            Check: {
                params: { operate: 'checkoutEnv' },
                method: data.info.method
            },
            Post: {
                params: { operate: 'start' },
                method: data.info.method
            },
        });
    
        data.info.api['Guest'] = $resource(serverUrl + '?g=Web&c=Guest&o=:operate', {

        }, {
            Check: {
                params: { operate: 'checkLogin' },
                method: data.info.method
            },
            Login: {
                params: { operate: 'login' },
                method: data.info.method
            }
        });

        data.info.api['Index'] = $resource(serverUrl + '?g=Web&c=Index&o=:operate', {

        }, {
            Allow: {
                params: { operate: 'allowRegister' },
                method: data.info.method
            }
        });

        data.info.api['GuestRegister'] = $resource(serverUrl + '?g=Web&c=Guest&o=:operate', {

            }, {
                Name: {
                    params: { operate: 'register' },
                    method: data.info.method
                },
                Check: {
                    params: { operate: 'checkUserNameExist' },
                    method: data.info.method
                }
            }

        );

        data.info.api['User'] = $resource(serverUrl + '?g=Web&c=User&o=:operate', {

        }, {
            LoginOut: {
                params: { operate: 'logout' },
                method: data.info.method
            },
            Password: {
                params: { operate: 'changePassword' },
                method: data.info.method
            },
            Info: {
                params: { operate: 'getUserInfo' },
                method: data.info.method
            },
            Nickname: {
                params: { operate: 'changeNickName' },
                method: data.info.method
            }
        });

        data.info.api['Message'] = $resource(serverUrl + '?g=Web&c=Message&o=:operate', {

            }, {
                Query: {
                    params: { operate: 'getMessageList' },
                    method: data.info.method
                },
                Clean: {
                    params: { operate: 'cleanMessage' },
                    method: data.info.method
                },
                Read: {
                    params: { operate: 'readMessage' },
                    method: data.info.method
                },
                Delete: {
                    params: { operate: 'delMessage' },
                    method: data.info.method
                },
                UnReadNum: {
                    params: { operate: 'getUnreadMessageNum' },
                    method: data.info.method
                }
            }

        );

        return data.info.api;
    }
})();
