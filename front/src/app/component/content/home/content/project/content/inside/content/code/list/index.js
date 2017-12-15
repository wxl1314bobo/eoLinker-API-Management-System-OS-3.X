(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [api sidebar模块相关js] [api sidebar module related js]
     * @version  3.0.2
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $rootScope [注入根作用域服务] [Injection rootscope service]
     * @service  ApiManagementResource [注入接口管理接口服务] [inject ApiManagement API service]
     * @service  $state [注入路由服务] [Injection state service]
     * @service  GroupService [注入GroupService服务] [Injection GroupService service]
     * @service  $filter [注入过滤器服务] [Injection filter service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
    angular.module('eolinker')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('home.project.inside.code.list', {
                    url: '/list?groupID?childGroupID?search',
                    template: '<home-project-inside-code-list power-object="$ctrl.powerObject"></home-project-inside-code-list>'
                });
        }])
        .component('homeProjectInsideCodeList', {
            templateUrl: 'app/component/content/home/content/project/content/inside/content/code/list/index.html',
            bindings: {
                powerObject: '<'
            },
            controller: homeProjectInsideCodeListController
        })

    homeProjectInsideCodeListController.$inject = ['$scope', '$rootScope', 'ApiManagementResource', '$state', 'GroupService', '$filter', 'CODE'];

    function homeProjectInsideCodeListController($scope, $rootScope, ApiManagementResource, $state, GroupService, $filter, CODE) {
        var vm = this;
        vm.data = {
            info: {
                batch: {
                    address: [],
                    disable: false
                }
            },
            interaction: {
                request: {
                    projectID: $state.params.projectID,
                    groupID: $state.params.groupID || -1,
                    childGroupID: $state.params.childGroupID,
                    tips: $state.params.search,
                    codeID: []
                },
                response: {
                    query: null
                }
            },
            fun: {
                init: null, 
                search: null, 
                edit: null, 
                delete: null, 
                click: null, 
                batch: {
                    sort: null, 
                    delete: null, 
                    default: null
                }
            }
        }

        /**
         * @function [初始化功能函数] [initialization]
         */
        vm.data.fun.init = function() {
            var template = {
                promise: null,
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    groupID: vm.data.interaction.request.childGroupID || vm.data.interaction.request.groupID,
                    tips: vm.data.interaction.request.tips
                }
            }
            $scope.$emit('$WindowTitleSet', { list: [$filter('translate')('0121111'), $state.params.projectName, $filter('translate')('0121112')] });
            if (template.request.tips) {
                template.promise = ApiManagementResource.Code.Search(template.request).$promise;
                template.promise.then(function(response) {
                    switch (response.statusCode) {
                        case CODE.COMMON.SUCCESS:
                            {
                                vm.data.interaction.response.query = response.codeList;
                                break;
                            }
                        default:
                            {
                                vm.data.interaction.response.query = [];
                            }
                    }
                })
            } else if (template.request.groupID == -1) {
                template.promise = ApiManagementResource.Code.All(template.request).$promise;
                template.promise.then(function(response) {
                    switch (response.statusCode) {
                        case CODE.COMMON.SUCCESS:
                            {
                                vm.data.interaction.response.query = response.codeList;
                                break;
                            }
                        default:
                            {
                                vm.data.interaction.response.query = [];
                            }
                    }
                })
            } else {
                template.promise = ApiManagementResource.Code.Query(template.request).$promise;
                template.promise.then(function(response) {
                    switch (response.statusCode) {
                        case CODE.COMMON.SUCCESS:
                            {
                                vm.data.interaction.response.query = response.codeList;
                                break;
                            }
                        default:
                            {
                                vm.data.interaction.response.query = [];
                            }
                    }
                })
            }
            return template.promise;
        }

        /**
         * @function [搜索功能函数] [search]
         */
        vm.data.fun.search = function() {
            var template = {
                uri: { search: vm.data.interaction.request.tips }
            }
            $state.go('home.project.inside.code.list', template.uri);
        }

        /**
         * @function [编辑功能函数] [edit]
         */
        vm.data.fun.edit = function(arg) {
            arg = arg || {};
            var template = {
                cache: GroupService.get(),
                modal: {
                    title: arg.item ? $filter('translate')('0121113') : $filter('translate')('0121114')
                }
            }
            if ((!template.cache) || (template.cache.length == 0)) {
                $rootScope.InfoModal($filter('translate')('0121115'), 'error');
            } else {
                if (arg.item) {
                    arg.item.projectID = vm.data.interaction.request.projectID;
                    arg.item.childGroupID = vm.data.interaction.request.childGroupID;
                    $rootScope.CodeModal(template.modal.title, arg.item, function(callback) {
                        if (callback) {
                            $rootScope.InfoModal(template.modal.title + $filter('translate')('0121116'), 'success');
                            $scope.$broadcast('$LoadingInit');
                        }
                    });
                } else {
                    arg.item = {
                        projectID: vm.data.interaction.request.projectID,
                        groupID: vm.data.interaction.request.groupID,
                        childGroupID: vm.data.interaction.request.childGroupID
                    }
                    $rootScope.CodeModal(template.modal.title, arg.item, function(callback) {
                        if (callback) {
                            $rootScope.InfoModal(template.modal.title + $filter('translate')('0121116'), 'success');
                        }
                        $scope.$broadcast('$LoadingInit');
                    });
                }
            }

        }

        /**
         * @function [删除功能函数] delete[]
         */
        vm.data.fun.delete = function(arg) {
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    codeID: '[' + arg.item.codeID + ']'
                }
            }
            $rootScope.EnsureModal($filter('translate')('0121117'), false, $filter('translate')('0121118'), {}, function(callback) {
                if (callback) {
                    ApiManagementResource.Code.Delete(template.request).$promise
                        .then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        vm.data.interaction.response.query.splice(arg.$index, 1);
                                        $rootScope.InfoModal($filter('translate')('0121119'), 'success');
                                        break;
                                    }
                            }
                        })
                }
            });
        }

        /**
         * @function [批量操作点击事件] [Batch operation click]
         */
        vm.data.fun.click = function(arg) {
            var template = {
                $index: vm.data.interaction.request.codeID.indexOf(arg.item.codeID)
            }
            if (vm.data.info.batch.disable) {
                arg.item.isClick = !arg.item.isClick;
                if (arg.item.isClick) {
                    vm.data.interaction.request.codeID.push(arg.item.codeID);
                    vm.data.info.batch.address.push(arg.$index);
                } else {
                    vm.data.interaction.request.codeID.splice(template.$index, 1);
                    vm.data.info.batch.address.splice(template.$index, 1);
                }
            }
        }

        /**
         * @function [存储位置排序] [Storage location sort]
         */
        vm.data.fun.batch.sort = function(pre, next) {
            return pre - next;
        }

        /**
         * @function [批量操作默认事件] [Batch operation default event]
         */
        vm.data.fun.batch.default = function() {
            if (vm.data.interaction.response.query && vm.data.interaction.response.query.length > 0) {
                vm.data.info.batch.disable = true;
                angular.forEach(vm.data.info.batch.address,function(val,key){
                    vm.data.interaction.response.query[val].isClick=false;
                })
                vm.data.info.batch.address=[];
                vm.data.interaction.request.codeID=[];
                $rootScope.InfoModal($filter('translate')('0121120'), 'success');
            } else {
                $rootScope.InfoModal($filter('translate')('0121121'), 'error');
            }
        }

        /**
         * @function [批量删除功能函数] [batch deletion]
         */
        vm.data.fun.batch.delete = function() {
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    codeID: JSON.stringify(vm.data.interaction.request.codeID)
                },
                loop: {
                    num: 0
                }
            }
            $rootScope.EnsureModal($filter('translate')('0121117'), false, $filter('translate')('0121122'), {}, function(callback) {
                if (callback) {
                    ApiManagementResource.Code.Delete(template.request).$promise
                        .then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        angular.forEach(vm.data.info.batch.address.sort(vm.data.fun.batch.sort), function(val, key) {
                                            val = val - template.loop.num++;
                                            vm.data.interaction.response.query.splice(val, 1);
                                        })
                                        vm.data.info.batch.disable = false;
                                        vm.data.interaction.request.codeID = [];
                                        vm.data.info.batch.address = [];
                                        $rootScope.InfoModal($filter('translate')('0121119'), 'success');
                                        break;
                                    }
                                default:
                                    {
                                        $rootScope.InfoModal($filter('translate')('0121123'), 'error');
                                        break;
                                    }
                            }
                        })
                }
            });
        }
    }
})();