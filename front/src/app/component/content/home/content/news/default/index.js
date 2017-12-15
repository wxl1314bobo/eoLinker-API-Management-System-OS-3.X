(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [消息内页相关指令js] [Message on page related instructions js]
     * @version  3.0.2
     * @service  $scope [注入作用域服务] [inject scope service]
     * @service  $rootScope [注入根作用域服务] [inject rootScope service]
     * @service  CommonResource [注入通用接口服务] [inject common API service]
     * @service  $state [注入路由服务] [inject state service]
     * @service  $sce [注入$sce服务] [inject $sce service]
     * @service  $filter [注入过滤器服务] [inject filter service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
    angular.module('eolinker')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('home.news.default', {
                    url: '/',
                    template: '<news-default></news-default>'
                });
        }])
        .component('newsDefault', {
            templateUrl: 'app/component/content/home/content/news/default/index.html',
            controller: indexController
        })

    indexController.$inject = ['$scope', '$rootScope', 'CommonResource', '$state', '$sce', '$filter', 'CODE'];

    function indexController($scope, $rootScope, CommonResource, $state, $sce, $filter, CODE) {
        var vm = this;
        vm.data = {
            info: {
                pagination: {
                    pages: '',
                    maxSize: 5,
                    pageSize: 15,
                    page: 1,
                    msgCount: 0,
                    jumpPage: ""
                },
                filter: {
                    system: $filter('translate')('0116'),
                    project: $filter('translate')('0117'),
                }
            },
            interaction: {
                request: {},
                response: {
                    query: []
                }
            },
            fun: {
                delete: null, 
                read: null, 
                clean: null, 
                pageChanged: null, 
                init: null 
            }
        }
        /**
         * @function [初始化功能函数]
         */
        vm.data.fun.init = function() {
            $scope.$emit('$WindowTitleSet', { list: [$filter('translate')('0110')] });
            var template = {
                request: { page: vm.data.info.pagination.page },
                promise: null
            }
            template.promise = CommonResource.Message.Query(template.request).$promise;
            template.promise.then(function(response) {
                switch (response.statusCode) {
                    case CODE.COMMON.SUCCESS:
                        {
                            vm.data.interaction.response.query = response.messageList;
                            angular.forEach(vm.data.interaction.response.query, function(val, key) {
                                val.msg = $sce.trustAsHtml($filter('XssFilter')(val.msg, { whiteList: { b: ['style'], p: [], a: ['style', 'href'], br: [] } }));
                            });
                            vm.data.info.pagination.pages = response.pageCount;
                            vm.data.info.pagination.msgCount = response.msgCount;
                            break;
                        }
                    default:
                        {
                            vm.data.interaction.response.query = [];
                            break;
                        }
                }
            })
            return template.promise;
        }

        /**
         * @function [页数更改]
         */
        vm.data.fun.pageChanged = function() {
            vm.data.fun.init();
        }

        /**
         * @function [清空消息功能函数]
         */
        vm.data.fun.clean = function() {
            $rootScope.EnsureModal($filter('translate')('0111'), false, $filter('translate')('0119'), {}, function(callback) {
                if (callback) {
                    CommonResource.Message.Clean().$promise
                        .then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        $rootScope.InfoModal($filter('translate')('01110'), 'success');
                                        $scope.$emit('$translateferStation', { state: '$EoNavbarNewsRead', data: true });
                                        vm.data.fun.init();
                                        break;
                                    }
                            }
                        })
                }
            });
        }

        /**
         * @function [阅读功能函数]
         */
        vm.data.fun.read = function(arg) {
            var template = {
                request: { msgID: arg.item.msgID }
            }
            arg.item.isClick = !arg.item.isClick;
            if (arg.item.isRead != 1) {
                CommonResource.Message.Read(template.request).$promise
                    .then(function(response) {
                        switch (response.statusCode) {
                            case CODE.COMMON.SUCCESS:
                                {
                                    arg.item.isRead = 1;
                                    $scope.$emit('$translateferStation', { state: '$EoNavbarNewsRead', data: false });
                                    break;
                                }
                        }
                    })
            }
        }

        /**
         * @function [删除功能函数]
         */
        vm.data.fun.delete = function(arg) {
            var template = {
                request: {
                    msgID: arg.item.msgID
                }
            }
            $rootScope.EnsureModal($filter('translate')('01111'), false, $filter('translate')('01112'), {}, function(callback) {
                if (callback) {
                    CommonResource.Message.Delete(template.request).$promise
                        .then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        vm.data.interaction.response.query.splice(arg.$index, 1);
                                        $rootScope.InfoModal($filter('translate')('01113'), 'success');
                                        break;
                                    }
                            }
                        })
                }
            });
        }
    }
})();
