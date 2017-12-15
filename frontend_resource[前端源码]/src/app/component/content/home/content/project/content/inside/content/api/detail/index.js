(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [api详情模块相关js] [api details module related js]
     * @version  3.0.2
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $rootScope [注入根作用域服务] [Injection rootscope service]
     * @service  ApiManagementResource [注入接口管理接口服务] [inject ApiManagement API service]
     * @service  $state [注入路由服务] [Injection state service]
     * @service  $sce [注入$sce服务] [Injection sce service]
     * @service  $filter [注入过滤器服务] [Injection filter service]
     * @service  ApiDetailService [注入ApiDetailService服务] [Injection ApiDetailService service]
     * @service  HomeProject_Service [注入HomeProject_Service服务] [Injection HomeProject_Service service]
     * @service  GroupService [注入GroupService服务] [Injection GroupService service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
    angular.module('eolinker')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('home.project.inside.api.detail', {
                    url: '/detail?groupID?childGroupID?apiID',
                    template: '<home-project-inside-api-detail power-object="$ctrl.powerObject" ></home-project-inside-api-detail>',
                    resolve: helper.resolveFor('MARKDOWN_CSS')
                });
        }])
        .component('homeProjectInsideApiDetail', {
            templateUrl: 'app/component/content/home/content/project/content/inside/content/api/detail/index.html',
            bindings: {
                powerObject: '<'
            },
            controller: homeProjectInsideApiDetailController
        })

    homeProjectInsideApiDetailController.$inject = ['$scope', '$rootScope', 'ApiManagementResource', '$state', '$sce', '$filter', 'ApiDetailService', 'HomeProject_Service', 'GroupService', 'CODE'];

    function homeProjectInsideApiDetailController($scope, $rootScope, ApiManagementResource, $state, $sce, $filter, ApiDetailService, HomeProject_Service, GroupService, CODE) {
        var vm = this;
        vm.data = {
            service: {
                home: HomeProject_Service,
                detail: ApiDetailService
            },
            info: {
                template: {
                    envModel: null
                },
                mock: {
                    isFailure: false
                },
                spreed:{
                    header:true,
                    request:true,
                    response:true,
                    example:true,
                    note:true
                },
                filter: {
                    shrink: $filter('translate')('012100010'),
                    open: $filter('translate')('012100011'),
                    yes: $filter('translate')('012100033'),
                }
            },
            interaction: {
                request: {
                    apiID: $state.params.apiID,
                    projectID: $state.params.projectID,
                    groupID: $state.params.groupID,
                    childGroupID: $state.params.childGroupID
                }
            },
            fun: {
                init: null, 
                test: null, 
                delete: null, 
                recover: null, 
                deleteCompletely: null, 
                storage: null, 
                show: {
                    request: null, 
                    response: null, 
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
                    apiID: vm.data.interaction.request.apiID
                }
            }

            template.promise = ApiManagementResource.Api.Detail(template.request).$promise;
            template.promise.then(function(response) {
                switch (response.statusCode) {
                    case CODE.COMMON.SUCCESS:
                        {
                            vm.data.service.home.envObject.object.model = response.apiInfo;
                            $scope.$emit('$WindowTitleSet', { list: [$filter('translate')('012100035') + vm.data.service.home.envObject.object.model.baseInfo.apiName, $filter('translate')('012100036'), $state.params.projectName, $filter('translate')('012100037')] });
                            switch (response.apiInfo.baseInfo.apiProtocol) {
                                case 0:
                                    vm.data.service.home.envObject.object.model.baseInfo.protocol = 'HTTP';
                                    break;
                                case 1:
                                    vm.data.service.home.envObject.object.model.baseInfo.protocol = 'HTTPS';
                                    break;
                            }
                            switch (response.apiInfo.baseInfo.apiStatus) {
                                case 0:
                                    vm.data.service.home.envObject.object.model.baseInfo.status = $filter('translate')('012100038');
                                    break;
                                case 1:
                                    vm.data.service.home.envObject.object.model.baseInfo.status = $filter('translate')('012100039');
                                    break;
                                case 2:
                                    vm.data.service.home.envObject.object.model.baseInfo.status = $filter('translate')('012100040');
                                    break;
                            }
                            vm.data.service.home.envObject.object.model.resultInfo = $filter('paramLevelFilter')(vm.data.service.home.envObject.object.model.resultInfo);
                            vm.data.service.home.envObject.object.model.requestInfo = $filter('paramLevelFilter')(vm.data.service.home.envObject.object.model.requestInfo);
                            vm.data.service.home.envObject.object.model.baseInfo.apiNoteHtml = $sce.trustAsHtml($filter('XssFilter')(vm.data.service.home.envObject.object.model.baseInfo.apiNote, {
                                onIgnoreTagAttr: function(tag, name, value, isWhiteAttr) {
                                    if (/(class)|(id)|(name)/.test(name)) {
                                        return name + '="' + value + '"';
                                    }
                                }
                            }));
                            vm.data.service.home.envObject.object.model.baseInfo.successMockCode = 'http://result.eolinker.com/' + vm.data.service.home.envObject.object.model.baseInfo.mockCode;
                            vm.data.service.home.envObject.object.model.baseInfo.failureMockCode = 'http://result.eolinker.com/' + vm.data.service.home.envObject.object.model.baseInfo.mockCode + '&resultType=failure';
                            vm.data.service.home.envObject.object.model.headers = response.apiInfo.headerInfo;
                            vm.data.info.template.envModel = vm.data.service.home.envObject.object.model;
                            $scope.$emit('$translateferStation', { state: '$EnvInitReady', data: { status: 1, param: angular.toJson(vm.data.service.home.envObject.object.model) } });
                            break;
                        }
                }
            })
            return template.promise;
        }

        /**
         * @function [进入测试界面] [Go to the test interface]
         */
        vm.data.fun.test = function() {
            var template = {
                uri: {
                    groupID: vm.data.interaction.request.groupID,
                    childGroupID: vm.data.interaction.request.childGroupID,
                    apiID: vm.data.interaction.request.apiID
                }
            }
            vm.data.service.detail.set(vm.data.info.template.envModel);
            $state.go('home.project.inside.api.test', template.uri);

        }

        /**
         * @function [显示请求参数个例详情]
         */
        vm.data.fun.show.request = function(arg) {
            if (!(arg.item.paramLimit || (arg.item.paramValueList && arg.item.paramValueList.length > 0) || arg.item.paramValue)) return;
            var template = {
                modal: {
                    item: arg.item
                }
            }
            $rootScope.RequestParamDetailModal(template.modal, function(callback) {

            })
        }

        /**
         * @function [显示返回结果个例详情] [Show return results]
         */
        vm.data.fun.show.response = function(arg) {
            if (!(arg.item.paramValueList || arg.item.paramValueList.length > 0)) return;
            var template = {
                modal: {
                    item: arg.item
                }
            }
            $rootScope.ResponseParamDetailModal(template.modal, function(callback) {

            })
        }

        /**
         * @function [移入回收站功能函数] [Move into the Recycle Bin function function]
         */
        vm.data.fun.delete = function() {
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    apiID: '[' + vm.data.interaction.request.apiID + ']'
                },
                uri: {
                    groupID: vm.data.interaction.request.groupID,
                    childGroupID: vm.data.interaction.request.childGroupID
                }
            }
            $rootScope.EnsureModal($filter('translate')('012100041'), false, $filter('translate')('012100042'), {}, function(callback) {
                if (callback) {
                    ApiManagementResource.Api.Delete(template.request).$promise
                        .then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        $state.go('home.project.inside.api.list', template.uri);
                                        $rootScope.InfoModal($filter('translate')('012100043'), 'success');
                                        break;
                                    }
                            }
                        })
                }
            });
        }

        /**
         * @function [恢复功能函数] [Restore function function]
         */
        vm.data.fun.recover = function() {
            var template = {
                modal: {
                    group: {
                        parent: GroupService.get(),
                        title: $filter('translate')('012100044')
                    }
                },
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    apiID: '[' + vm.data.interaction.request.apiID + ']',
                    groupID: ''
                },
                uri: {
                    groupID: vm.data.interaction.request.groupID,
                    childGroupID: vm.data.interaction.request.childGroupID
                }
            }
            if (!template.modal.group.parent) {
                $rootScope.InfoModal($filter('translate')('012100045'), 'error');
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
                                        $rootScope.InfoModal($filter('translate')('012100046'), 'success');
                                        $state.go('home.project.inside.api.list', template.uri);
                                        break;
                                    }
                            }
                        })
                }
            });

        }

        /**
         * @function [彻底删除功能函数] [Completely remove the function function]
         */
        vm.data.fun.deleteCompletely = function() {
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    apiID: '[' + vm.data.interaction.request.apiID + ']'
                },
                uri: {
                    groupID: vm.data.interaction.request.groupID,
                    childGroupID: vm.data.interaction.request.childGroupID
                }
            }
            $rootScope.EnsureModal($filter('translate')('012100047'), false, $filter('translate')('012100048'), {}, function(callback) {
                if (callback) {
                    ApiManagementResource.Trash.Delete(template.request).$promise
                        .then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        $state.go('home.project.inside.api.list', template.uri);
                                        $rootScope.InfoModal($filter('translate')('012100049'), 'success');
                                        break;
                                    }
                                default:
                                    {
                                        $rootScope.InfoModal($filter('translate')('012100050'), 'error');
                                        break;
                                    }
                            }
                        })
                }
            });
        }

        /**
         * @function [星标功能函数] [Switch star]
         */
        vm.data.fun.storage = function() {
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    apiID: vm.data.interaction.request.apiID
                }
            }
            switch (vm.data.service.home.envObject.object.model.baseInfo.starred) {
                case 0:
                    {
                        ApiManagementResource.Star.Add(template.request).$promise
                        .then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        vm.data.service.home.envObject.object.model.baseInfo.starred = 1;
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
                                        vm.data.service.home.envObject.object.model.baseInfo.starred = 0;
                                        break;
                                    }
                            }
                        });
                        break;
                    }
            }
        }
    }
})();
