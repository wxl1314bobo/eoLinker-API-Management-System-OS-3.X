(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [安装引导页step three] [Installation step three page]
     * @version  3.0.2
     * @service  $state [注入路由服务] [inject state service]
     * @service  $window [注入window服务] [inject window service]
     * @service  CommonResource [注入通用接口服务] [inject common API service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
    angular.module('eolinker')
        .config(['$stateProvider','RouteHelpersProvider', function($stateProvider,helper) {
            $stateProvider
                .state('guide.third_step', {
                    url: '/third_step',
                    template: '<third></third>',
                    auth: true // 页面权限，值为true时在未登录状态可以显示页面，默认为假 When the value is true, the page can be displayed without login. The default is false
                });
        }])
        .component('third', {
            templateUrl: 'app/component/content/guide/third_step/index.html',
            controller: thirdCtroller
        })

        thirdCtroller.$inject = ['$state', '$window', 'CommonResource', 'CODE'];

    function thirdCtroller($state, $window, CommonResource, CODE) {
        var vm = this;
        vm.data = {
            info: {
                installing: false,
                check: {
                    fileWrite: '',
                    curl: '',
                    db: ''
                },
            },
            interaction: {
                request: {},
                response: {
                    query: []
                }
            },
            fun: {
                checkConfig: null, 
                enterSecond: null, 
                install: null, 
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
            
            if (window.localStorage['INSTALLINFO']) {
                try {
                    var info = JSON.parse(window.localStorage['INSTALLINFO']);
                    vm.data.interaction.request.dbURL = info.master;
                    vm.data.interaction.request.dbName = info.name;
                    vm.data.interaction.request.dbUser = info.userName;
                    vm.data.interaction.request.dbPassword = info.password;
                    vm.data.interaction.request.websiteName = info.pageTitle;
                    vm.data.interaction.request.language = window.localStorage.lang;
                } catch (e) {
                    $state.go('guide.second_step');
                }
            } else {
                $state.go('guide.second_step');
            }
            vm.data.fun.checkConfig();
        }

        /**
         * @function [检测配置功能函数] [Detects configuration]
         */
        vm.data.fun.checkConfig = function() {
            CommonResource.Install.Check(vm.data.interaction.request).$promise.then(function(data) {
                if (data.statusCode == CODE.COMMON.SUCCESS) {
                    vm.data.interaction.response.query = data.envStatus;
                    if (data.envStatus.fileWrite == 1) {
                        vm.data.info.check.fileWrite = 'ok';
                    } else {
                        vm.data.info.check.fileWrite = 'error';
                    }
                    if (data.envStatus.curl == 1) {
                        vm.data.info.check.curl = 'ok';
                    } else {
                        vm.data.info.check.curl = 'error';
                    }
                    if (data.envStatus.db == 1) {
                        vm.data.info.check.db = 'ok';
                    } else {
                        vm.data.info.check.db = 'error';
                    }
                }
            });
        }

        vm.data.fun.init();
       
        /**
         * @function [返回上一步功能函数] [Return to the previous step]
         */
        vm.data.fun.enterSecond = function() {
            $state.go('guide.second_step');
        }

        /**
         * @function [安装功能函数] [installation]
         */
        vm.data.fun.install = function() {
            vm.data.info.installing = true;
            CommonResource.Install.Post(vm.data.interaction.request).$promise.then(function(data) {
                if (data.statusCode == CODE.COMMON.SUCCESS) {
                    $state.go('guide.finish');
                } else {
                    $state.go('guide.error');
                }
            })
        }
    }
})();