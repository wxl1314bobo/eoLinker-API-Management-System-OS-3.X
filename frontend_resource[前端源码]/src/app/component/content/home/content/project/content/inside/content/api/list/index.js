(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [api列表模块相关js] [api list module related js]
     * @version  3.0.2
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $rootScope [注入根作用域服务] [Injection rootScope service]
     * @service  ApiManagementResource [注入接口管理接口服务] [inject ApiManagement API service]
     * @service  $state [注入路由服务] [Injection state service]
     * @service  GroupService [注入GroupService服务] [Injection GroupService service]
     * @service  HomeProject_Service [注入HomeProject_Service服务] [Injection HomeProject_Service service]
     * @service  $filter [注入过滤器服务] [Injection filter service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
    angular.module('eolinker')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('home.project.inside.api.list', {
                    url: '/list?groupID?childGroupID?search',
                    template: '<home-project-inside-api-list power-object="$ctrl.powerObject"></home-project-inside-api-list>'
                });
        }])
        .component('homeProjectInsideApiList', {
            templateUrl: 'app/component/content/home/content/project/content/inside/content/api/list/index.html',
            bindings: {
                powerObject: '<',
            },
            controller: homeProjectInsideApiListController
        })

    homeProjectInsideApiListController.$inject = ['$scope', '$rootScope', 'ApiManagementResource', '$state', 'GroupService', 'HomeProject_Service', '$filter', 'CODE'];

    function homeProjectInsideApiListController($scope, $rootScope, ApiManagementResource, $state, GroupService, HomeProject_Service, $filter, CODE) {
        var vm = this;
        vm.data = {
            service:{
                home:HomeProject_Service,
            },
            info: {
                more:parseInt(window.localStorage['PROJECT_MORETYPE'])||1,
                template: {
                    envModel: []
                },
                sort: {
                    query:[{name:$filter('translate')('012100224'),asc:0,orderBy:3},{name:$filter('translate')('012100225'),asc:0,orderBy:1},{name:$filter('translate')('012100226'),asc:0,orderBy:0},{name:$filter('translate')('012100227'),asc:0,orderBy:2}],
                    current:JSON.parse(window.localStorage['PROJECT_SORTTYPE']||'{"orderBy":3,"asc":0}')
                },
                batch: {
                    address: [],
                    disable: false
                },
                filter: {
                    ascending: $filter('translate')('012100210'),
                    descending: $filter('translate')('012100211'),
                    updated: $filter('translate')('012100214'),
                    grouped: $filter('translate')('012100215'),
                    updatedTime: $filter('translate')('012100216'),
                    deleteTime: $filter('translate')('012100217'),
                }
            },
            interaction: {
                request: {
                    projectID: $state.params.projectID,
                    groupID: $state.params.groupID || -1,
                    childGroupID: $state.params.childGroupID,
                    tips: $state.params.search,
                    apiID: []
                }
            },
            fun: {
                init: null, 
                search: null, 
                sort: null, 
                import: null, 
                setMore: null, 
                recover: null, 
                clean: null, 
                enter: null, 
                batch: {
                    sort: null, 
                    delete: null, 
                    remove: null, 
                    recover: null, 
                    default: null, 
                }
            },
            assistantFun: {
                init: null 
            }
        }
        /**
         * @function [切换缩略和详细功能函数] [Toggle thumbnails and details]
         */
        vm.data.fun.setMore=function(arg){
            vm.data.info.more=arg.switch;
            window.localStorage.setItem('PROJECT_MORETYPE', arg.switch);
        }

        /**
         * @function [导入文档] [Import the document]
         */
        vm.data.fun.import = function() {
            var template = {
                modal: {
                    title: $filter('translate')('012100228'),
                    status: 1,
                    request: {
                        projectID: vm.data.interaction.request.projectID,
                        groupID: vm.data.interaction.request.childGroupID || vm.data.interaction.request.groupID
                    }
                }
            }
            $rootScope.ImportModal(template.modal, function(callback) {
                if (callback) {
                    $scope.$broadcast('$LoadingInit');
                }
            });
        }

        /**
         * @function [搜索功能函数] [search]
         */
        vm.data.fun.search = function() {
            if ($scope.searchForm.$valid) {
                $state.go('home.project.inside.api.list', { search: vm.data.interaction.request.tips });
            }
        }

        /**
         * @function [编辑函数] [edit]
         */
        vm.data.fun.edit = function(arg) {
            arg = arg || {};
            if (arg.$event) {
                arg.$event.stopPropagation();
            }
            var template = {
                cache: GroupService.get()
            }
            if ((!template.cache) || (template.cache.length == 0)) {
                $rootScope.InfoModal($filter('translate')('012100229'), 'error');
            } else {
                if (!arg.item) {
                    $state.go('home.project.inside.api.edit', { groupID: vm.data.interaction.request.groupID, childGroupID: vm.data.interaction.request.childGroupID });
                } else {
                    $state.go('home.project.inside.api.edit', { groupID: vm.data.interaction.request.groupID, childGroupID: vm.data.interaction.request.childGroupID, apiID: arg.item.apiID })
                }
            }
        }

        /**
         * @function [排序功能函数] [sort]
         */
        vm.data.fun.sort = function(arg) {
            arg.item.asc=arg.item.asc==0?1:0;
            vm.data.info.sort.current=arg.item;
            window.localStorage.setItem('PROJECT_SORTTYPE', angular.toJson(arg.item));
            $scope.$broadcast('$LoadingInit', { boolean: true });
        }

        /**
         * @function [切换星标状态功能函数] [Switch the star status]
         */
        vm.data.fun.storage = function(arg) {
            arg = arg || {};
            if (arg.$event) {
                arg.$event.stopPropagation();
            }
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    apiID: arg.item.apiID
                }
            }
            switch (arg.item.starred) {
                case 0:
                    {
                        ApiManagementResource.Star.Add(template.request).$promise
                        .then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        arg.item.starred = 1;
                                        break;
                                    }
                            }
                        });
                        break;
                    }
                case 1:
                    {
                        ApiManagementResource.Star.Delete(template.request).$promise
                        .then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        arg.item.starred = 0;
                                        break;
                                    }
                            }
                        });
                        break;
                    }
            }
        }

        /**
         * @function [删除功能函数] [delete]
         */
        vm.data.fun.delete = function(arg) {
            arg = arg || {};
            if (arg.$event) {
                arg.$event.stopPropagation();
            }
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    apiID: '[' + arg.item.apiID + ']'
                }
            }
            switch (arg.switch) {
                case 0:
                    {
                        $rootScope.EnsureModal($filter('translate')('012100230'), false, $filter('translate')('012100231'), {}, function(callback) {
                            if (callback) {
                                ApiManagementResource.Api.Delete(template.request).$promise
                                    .then(function(response) {
                                        switch (response.statusCode) {
                                            case CODE.COMMON.SUCCESS:
                                                {
                                                    vm.data.service.home.envObject.object.model.splice(arg.$index, 1);
                                                    $rootScope.InfoModal($filter('translate')('012100232'), 'success');
                                                    break;
                                                }
                                            default:
                                                {
                                                    $rootScope.InfoModal($filter('translate')('012100233'), 'error');
                                                    break;
                                                }
                                        }
                                    })
                            }
                        });
                        break;
                    }
                case 1:
                    {
                        $rootScope.EnsureModal($filter('translate')('012100234'), false, $filter('translate')('012100235'), {}, function(callback) {
                            if (callback) {
                                ApiManagementResource.Trash.Delete(template.request).$promise
                                    .then(function(response) {
                                        switch (response.statusCode) {
                                            case CODE.COMMON.SUCCESS:
                                                {
                                                    vm.data.service.home.envObject.object.model.splice(arg.$index, 1);
                                                    $rootScope.InfoModal($filter('translate')('012100236'), 'success');
                                                    break;
                                                }
                                            default:
                                                {
                                                    $rootScope.InfoModal($filter('translate')('012100233'), 'error');
                                                    break;
                                                }
                                        }
                                    })
                            }
                        });
                        break;
                    }
            }
        }

        /**
         * @function [恢复功能函数] [recover]
         */
        vm.data.fun.recover = function(arg) {
            arg = arg || {};
            if (arg.$event) {
                arg.$event.stopPropagation();
            }
            var template = {
                modal: {
                    group: {
                        parent: GroupService.get(),
                        title: $filter('translate')('012100237')
                    }
                },
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    apiID: '[' + arg.item.apiID + ']',
                    groupID: ''
                }
            }
            if (!template.modal.group.parent) {
                $rootScope.InfoModal($filter('translate')('012100238'), 'error');
                return;
            }
            $rootScope.ApiRecoverModal(template.modal, function(callback) {
                if (callback) {
                    template.request.groupID = callback.groupID;
                    ApiManagementResource.Trash.Recover(template.request).$promise
                        .then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        $rootScope.InfoModal($filter('translate')('012100239'), 'success');
                                        vm.data.service.home.envObject.object.model.splice(arg.$index, 1);
                                        break;
                                    }
                            }
                        })
                }
            });
        }

        /**
         * @function [清空功能函数] [clean]
         */
        vm.data.fun.clean = function() {
            var template = {
                request: { projectID: vm.data.interaction.request.projectID }
            }
            $rootScope.EnsureModal($filter('translate')('012100240'), false, $filter('translate')('012100241'), {}, function(callback) {
                if (callback) {
                    ApiManagementResource.Trash.Clean(template.request).$promise
                        .then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        $rootScope.InfoModal($filter('translate')('012100242'), 'success');
                                        vm.data.service.home.envObject.object.model = [];
                                        break;
                                    }
                            }
                        })
                }
            });
        }

        /**
         * @function [查看详情功能函数] [see details]
         */
        vm.data.fun.enter = function(arg) {
            var template = {
                uri: {
                    groupID: vm.data.interaction.request.groupID,
                    childGroupID: vm.data.interaction.request.childGroupID,
                    apiID: arg.item.apiID
                },
                $index: vm.data.interaction.request.apiID.indexOf(arg.item.apiID)
            }
            if (vm.data.info.batch.disable) {
                arg.item.isClick = !arg.item.isClick;
                if (arg.item.isClick) {
                    vm.data.interaction.request.apiID.push(arg.item.apiID);
                    vm.data.info.batch.address.push(arg.$index);
                } else {
                    vm.data.interaction.request.apiID.splice(template.$index, 1);
                    vm.data.info.batch.address.splice(template.$index, 1);
                }
            } else {
                $state.go('home.project.inside.api.detail', template.uri);
            }
        }

        /**
         * @function [存储位置排序] [Storage location sort]
         */
        vm.data.fun.batch.sort = function(pre, next) {
            return pre - next;
        }

        /**
         * @function [默认切换函数] [Default switch function]
         */
        vm.data.fun.batch.default = function() {
            if (vm.data.service.home.envObject.object.model && vm.data.service.home.envObject.object.model.length > 0) {
                vm.data.info.batch.disable = true;
                angular.forEach(vm.data.info.batch.address,function(val,key){
                    vm.data.service.home.envObject.object.model[val].isClick=false;
                })
                vm.data.info.batch.address=[];
                vm.data.interaction.request.apiID=[];
                $rootScope.InfoModal($filter('translate')('012100243'),'success');
            }else{
                $rootScope.InfoModal($filter('translate')('012100244'),'error');
            }
        }

        /**
         * @function [批量删除功能函数] [batch deletion]
         */
        vm.data.fun.batch.delete = function() {
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    apiID: JSON.stringify(vm.data.interaction.request.apiID)
                },
                loop: {
                    num: 0
                }
            }
            $rootScope.EnsureModal($filter('translate')('012100234'), false, $filter('translate')('012100235'), {}, function(callback) {
                if (callback) {
                    ApiManagementResource.Trash.Delete(template.request).$promise
                        .then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        angular.forEach(vm.data.info.batch.address.sort(vm.data.fun.batch.sort), function(val, key) {
                                            val = val - template.loop.num++;
                                            vm.data.service.home.envObject.object.model.splice(val, 1);
                                        })
                                        vm.data.interaction.request.apiID = [];
                                        vm.data.info.batch.address = [];
                                        vm.data.info.batch.disable = false;
                                        $rootScope.InfoModal($filter('translate')('012100236'), 'success');
                                        break;
                                    }
                                default:
                                    {
                                        $rootScope.InfoModal($filter('translate')('012100233'), 'error');
                                        break;
                                    }
                            }
                        })
                }
            });
        }

        /**
         * @function [批量恢复功能函数] [Batch recovery]
         */
        vm.data.fun.batch.recover = function() {
            var template = {
                modal: {
                    group: {
                        parent: GroupService.get(),
                        title: $filter('translate')('012100237')
                    }
                },
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    apiID: JSON.stringify(vm.data.interaction.request.apiID),
                    groupID: ''
                },
                loop: {
                    num: 0
                }
            }
            if (!template.modal.group.parent) {
                $rootScope.InfoModal($filter('translate')('012100238'), 'error');
                return;
            }
            $rootScope.ApiRecoverModal(template.modal, function(callback) {
                if (callback) {
                    template.request.groupID = callback.groupID;
                    ApiManagementResource.Trash.Recover(template.request).$promise
                        .then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        angular.forEach(vm.data.info.batch.address.sort(vm.data.fun.batch.sort), function(val, key) {
                                            val = val - template.loop.num++;
                                            vm.data.service.home.envObject.object.model.splice(val, 1);
                                        })
                                        vm.data.info.batch.disable = false;
                                        vm.data.interaction.request.apiID = [];
                                        vm.data.info.batch.address = [];
                                        $rootScope.InfoModal($filter('translate')('012100245'), 'success');
                                        break;
                                    }
                            }
                        })
                }
            });
        }

        /**
         * @function [批量移入回收站功能函数] [Move in bulk to the Recycle Bin]
         */
        vm.data.fun.batch.remove = function() {
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    apiID: JSON.stringify(vm.data.interaction.request.apiID)
                },
                loop: {
                    num: 0
                }
            }
            $rootScope.EnsureModal($filter('translate')('012100230'), false, $filter('translate')('012100231'), {}, function(callback) {
                if (callback) {
                    ApiManagementResource.Api.Delete(template.request).$promise
                        .then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        angular.forEach(vm.data.info.batch.address.sort(vm.data.fun.batch.sort), function(val, key) {
                                            val = val - template.loop.num++;
                                            vm.data.service.home.envObject.object.model.splice(val, 1);
                                        })
                                        vm.data.info.batch.disable = false;
                                        vm.data.interaction.request.apiID = [];
                                        vm.data.info.batch.address = [];
                                        $rootScope.InfoModal($filter('translate')('012100232'), 'success');
                                        break;
                                    }
                                default:
                                    {
                                        $rootScope.InfoModal($filter('translate')('012100233'), 'error');
                                        break;
                                    }
                            }
                        })
                }
            });
        }


        /**
         * @function [辅助初始化功能函数] [Auxiliary initialization]
         */
        vm.data.assistantFun.init = function() {
            var template = {
                promise: null,
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    groupID: vm.data.interaction.request.childGroupID || vm.data.interaction.request.groupID,
                    orderBy: vm.data.info.sort.current.orderBy,
                    asc: vm.data.info.sort.current.asc,
                    tips: vm.data.interaction.request.tips
                }
            }
            $scope.$emit('$WindowTitleSet', { list: [$filter('translate')('012100247'), $state.params.projectName, $filter('translate')('012100248')] });
            if (vm.data.interaction.request.groupID == -2) {
                $scope.$emit('$tabChange', { apiName: $filter('translate')('012100249'), type: 1 });
                template.promise = ApiManagementResource.Trash.Query(template.request).$promise;
                template.promise.then(function(response) {
                    switch (response.statusCode) {
                        case CODE.COMMON.SUCCESS:
                            {
                                vm.data.service.home.envObject.object.model = response.apiList;
                                break;
                            }
                    }
                    vm.data.info.template.envModel = vm.data.service.home.envObject.object.model;
                    $scope.$emit('$translateferStation', { state: '$EnvInitReady', data: { status: 0 } });
                })
            } else {
                $scope.$emit('$tabChange', { apiName: $filter('translate')('012100250'), type: 0 });
                if (vm.data.interaction.request.tips) {
                    template.promise = ApiManagementResource.Api.Search(template.request).$promise;
                    template.promise.then(function(response) {
                        switch (response.statusCode) {
                            case CODE.COMMON.SUCCESS:
                                {
                                    vm.data.service.home.envObject.object.model = response.apiList;
                                    break;
                                }
                        }
                        vm.data.info.template.envModel = vm.data.service.home.envObject.object.model;
                        $scope.$emit('$translateferStation', { state: '$EnvInitReady', data: { status: 0 } });
                    })
                } else if (vm.data.interaction.request.groupID == -1) {
                    template.promise = ApiManagementResource.Api.All(template.request).$promise;
                    template.promise.then(function(response) {
                        switch (response.statusCode) {
                            case CODE.COMMON.SUCCESS:
                                {
                                    vm.data.service.home.envObject.object.model = response.apiList;
                                    break;
                                }
                        }
                        vm.data.info.template.envModel = vm.data.service.home.envObject.object.model;
                        $scope.$emit('$translateferStation', { state: '$EnvInitReady', data: { status: 0 } });
                    })
                } else {
                    template.promise = ApiManagementResource.Api.Query(template.request).$promise;
                    template.promise.then(function(response) {
                        switch (response.statusCode) {
                            case CODE.COMMON.SUCCESS:
                                {
                                    vm.data.service.home.envObject.object.model = response.apiList;
                                    break;
                                }
                        }
                        vm.data.info.template.envModel = vm.data.service.home.envObject.object.model;
                        $scope.$emit('$translateferStation', { state: '$EnvInitReady', data: { status: 0 } });
                    })
                }
            }
            return template.promise;
        }

        /**
         * @function [初始化功能函数] [initialization]
         */
        vm.data.fun.init = function(arg) {
            arg = arg || {};
            var template = {
                promise: null
            }
            if (arg.boolean) {
                template.promise = vm.data.assistantFun.init();
            } else {
                template.promise = vm.data.assistantFun.init();
            }
            return template.promise;
        }
    }
})();
