(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [api修改模块相关js] [api modify module related js]
     * @version  3.0.2
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $rootScope [注入根作用域服务] [Injection rootscope service]
     * @service  ApiManagementResource [注入接口管理接口服务] [inject ApiManagement API service]
     * @service  $state [注入路由服务] [Injection state service]
     * @service  GroupService [注入GroupService服务] [Injection GroupService service]
     * @service  $filter [注入过滤器服务] [Injection filter service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     * @constant HTTP_CONSTANT [注入HTTP相关常量集] [inject HTTP related constant service]
     */
    angular.module('eolinker')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('home.project.inside.api.edit', {
                    url: '/edit?groupID?childGroupID?apiID?type',
                    template: '<home-project-inside-api-edit></home-project-inside-api-edit>',
                    resolve: helper.resolveFor('WANG_EDITOR', 'MARKDOWN')
                });
        }])
        .component('homeProjectInsideApiEdit', {
            templateUrl: 'app/component/content/home/content/project/content/inside/content/api/edit/index.html',
            controller: homeProjectInsideApiEditController
        })

    homeProjectInsideApiEditController.$inject = ['$scope', '$rootScope', 'ApiManagementResource', '$state', 'GroupService', '$filter', 'CODE', 'HTTP_CONSTANT'];

    function homeProjectInsideApiEditController($scope, $rootScope, ApiManagementResource, $state, GroupService, $filter, CODE, HTTP_CONSTANT) {
        var vm = this;
        vm.data = {
            constant: {
                requestHeader: HTTP_CONSTANT.REQUEST_HEADER,
                requestParamLimit: HTTP_CONSTANT.REQUEST_PARAM
            },
            info: {
                input: {
                    submited: false
                },
                menu: 0, //0：基础信息、1：详细说明、2：高级mock 0: basic information, 1: detailed description, 2: advanced mock
                timer: {
                    fun: null
                },
                filter: {
                    apiList: $filter('translate')('01210010'),
                    returnTodetails: $filter('translate')('01210011'),
                },
                sort: {
                    requestParamForm: {
                        containment: '.request-form-ul',
                        child: {
                            containment: '.request-param-form-ul'
                        }
                    },
                    headerForm: {
                        containment: '.header-form-ul'
                    },
                    responseParamForm: {
                        containment: '.response-form-ul',
                        child: {
                            containment: '.response-param-form-ul'
                        }
                    }
                },
                jsonToParamObject: { //自动匹配json获取response params Automatic matching json get response params
                    headerItem: {
                        "headerName": '',
                        "headerValue": ''
                    },
                    resultItem: {
                        "paramNotNull": true,
                        "paramName": "",
                        "paramKey": "",
                        "type": "0",
                        "paramType": "0",
                        "paramValueList": []
                    },
                    resultValueItem: {
                        "value": "",
                        "valueDescription": ""
                    },
                    requestItem: {
                        "paramNotNull": true,
                        "paramType": "0",
                        "paramName": "",
                        "paramKey": "",
                        "paramValue": "",
                        "paramLimit": "",
                        "paramNote": "",
                        "paramValueList": [],
                        "default": 0
                    },
                    requestValueItem: {
                        "value": "",
                        "valueDescription": ""
                    }
                },
                group: {
                    parent: [],
                    child: []
                },
                reset: {
                    projectID: $state.params.projectID,
                    groupID: $state.params.groupID,
                    childGroupID: $state.params.childGroupID,
                    apiID: $state.params.apiID,
                    type: $state.params.type
                }
            },
            interaction: {
                response: {
                    apiInfo: {
                        projectID: $state.params.projectID,
                        groupID: $state.params.groupID,
                        childGroupID: $state.params.childGroupID,
                        apiID: $state.params.apiID,
                        apiRichNote: '',
                        apiMarkdownNote: '',
                        apiNoteRaw: '',
                        apiNoteType: '0',
                        apiRequestParamType: '0',
                        apiRequestRaw: '',
                        apiHeader: [],
                        apiRequestParam: [],
                        apiResultParam: [],
                        starred: 0
                    }
                }
            },
            fun: {
                init: null, 
                load: null, 
                requestProcessing: null, 
                menu: null, 
                change: {
                    group: null, 
                    noteType: null, 
                    requestType: null, 
                },
                storage: null, 
                headerList: {
                    add: null, 
                    delete: null, 
                },
                requestList: {
                    add: null, 
                    delete: null, 
                },
                requestParamList: {
                    add: null, 
                    delete: null, 
                },
                resultList: {
                    add: null, 
                    delete: null, 
                },
                resultParamList: {
                    add: null, 
                    delete: null, 
                },
                last: {
                    header: null,  
                    request: null,  
                    response: null,  
                    requestParam: null,  
                    responseParam: null,  
                },
                back: null, 
                more: {
                    request: null, 
                    response: null, 
                }
            },
            assistantFun: {
                init: null, 
                confirm: null, 
                keep: null, 
                quickEdit: null, 
                edit: null 
            }
        }

        /**
         * @function [菜单功能函数] [menu]
         */
        vm.data.fun.menu = function(arg) {
            vm.data.info.menu = arg.switch;
            if (vm.data.interaction.response.apiInfo.apiNoteType == '1' && arg.switch == 1) {
                $scope.$broadcast('$changeNoteType');
            }
        }

        /**
         * @function [更改父分组] [Change parent grouping]
         */
        vm.data.fun.change.group = function() {
            for (var i = 0; i < vm.data.info.group.parent.length; i++) {
                var val = vm.data.info.group.parent[i];
                if (val.groupID == vm.data.interaction.response.apiInfo.groupID) {
                    vm.data.info.group.child = [{
                        groupID: -1,
                        groupName: $filter('translate')('012100141')
                    }].concat(val.childGroupList);
                    vm.data.interaction.response.apiInfo.childGroupID = -1;
                    break;
                }
            }
        }

        /**
         * @function [更改备注说明类型] [Change the note description type]
         */
        vm.data.fun.change.noteType = function() {
            $scope.$broadcast('$changeNoteType');
        }

        /**
         * @function [切换星标状态功能函数] 【Switch the star status
         */
        vm.data.fun.storage = function() {
            switch (vm.data.interaction.response.apiInfo.starred) {
                case 0:
                    {
                        vm.data.interaction.response.apiInfo.starred = 1;
                        break;
                    }
                case 1:
                    {
                        vm.data.interaction.response.apiInfo.starred = 0;
                        break;
                    }
            }
        }

        /**
         * @function [最后一个头部 item 输入框内容改变功能函数] 【The last header item input box contents change the function function
         */
        vm.data.fun.last.header = function(arg) {
            if (arg.$last) {
                vm.data.fun.headerList.add();
            }
        }

        /**
         * @function [添加头部功能函数][Add head]
         */
        vm.data.fun.headerList.add = function() {
            var info = {
                "headerName": '',
                "headerValue": ''
            }
            vm.data.interaction.response.apiInfo.apiHeader.push(info);
        }

        /**
         * @function [删除头部功能函数] [Delete the head]
         */
        vm.data.fun.headerList.delete = function(arg) {
            vm.data.interaction.response.apiInfo.apiHeader.splice(arg.$index, 1);
        }

        /**
         * @function [最后一个请求参数 item 输入框内容改变功能函数] [The last request parameter item input box contents change]
         */
        vm.data.fun.last.request = function(arg) {
            if (arg.$last) {
                vm.data.fun.requestList.add();
            }
        }

        /**
         * @function [更多请求参数] [More request parameters]
         */
        vm.data.fun.more.request = function(arg) {
            var template = {
                modal: {
                    item: arg.item,
                    sort: { requestParamForm: vm.data.info.sort.requestParamForm.child },
                    constant: vm.data.constant.requestParamLimit,
                    fun: {
                        paramAdd: vm.data.fun.last.requestParam,
                        delete: vm.data.fun.requestParamList.delete
                    }
                }
            }
            arg.item.paramValueList = arg.item.paramValueList || [];
            if (arg.item.paramValueList.length == 0 || arg.item.paramValueList[arg.item.paramValueList.length - 1].value) {
                vm.data.fun.requestParamList.add({ item: arg.item });
            }
            $rootScope.RequestParamEditModal(template.modal, function(callback) {
                if (callback) {
                    vm.data.interaction.response.apiInfo.apiRequestParam.splice(arg.$index, 1, callback.item);
                }
            })
        }

        /**
         * @function [添加请求参数功能函数] [Add the request parameters]
         */
        vm.data.fun.requestList.add = function() {
            var template = {
                item: {
                    "paramNotNull": true,
                    "paramType": "0",
                    "paramName": "",
                    "paramKey": "",
                    "paramValue": "",
                    "paramLimit": "",
                    "paramNote": "",
                    "paramValueList": [],
                    "default": 0
                }
            }
            vm.data.interaction.response.apiInfo.apiRequestParam.push(template.item);
            vm.data.info.input.submited = false;
        }

        /**
         * @function [删除请求参数功能函数] [Delete request]
         */
        vm.data.fun.requestList.delete = function(arg) {
            vm.data.interaction.response.apiInfo.apiRequestParam.splice(arg.$index, 1);
        }

        /**
         * @function [最后一个请求参数值可能性 item 输入框内容改变功能函数] [The last request parameter value possibility item input box contents change]
         */
        vm.data.fun.last.requestParam = function(arg) {
            if (arg.$last) {
                vm.data.fun.requestParamList.add({ item: arg.item });
            }
        }

        /**
         * @function [添加请求参数值功能函数] [Add the request parameter value]
         */
        vm.data.fun.requestParamList.add = function(arg) {
            arg = arg || {};
            arg.item.paramValueList.push({
                "value": "",
                "valueDescription": ""
            });
        }

        /**
         * @function [删除请求参数值功能函数] [Delete the request parameter value]
         */
        vm.data.fun.requestParamList.delete = function(arg) {
            arg = arg || {};
            arg.item.paramValueList.splice(arg.$index, 1);
            if (arg.$index < arg.item.default) {
                arg.item.default--;
            } else if (arg.$index == arg.item.default) {
                arg.item.default = -1;
            }
        }

        /**
         * @function [最后一个返回参数 item 输入框内容改变功能函数] [The last return parameter item input box contents change]
         */
        vm.data.fun.last.response = function(arg) {
            if (arg.$last) {
                vm.data.fun.resultList.add();
            }
        }

        /**
         * @function [添加返回参数功能函数] [Add a return parameter]
         */
        vm.data.fun.resultList.add = function() {
            var template = {
                item: {
                    "paramNotNull": true,
                    "paramName": "",
                    "paramKey": "",
                    "paramType": '0',
                    "paramValueList": []
                }
            }
            vm.data.interaction.response.apiInfo.apiResultParam.push(template.item);
            vm.data.info.input.submited = false;
        }

        /**
         * @function [删除返回参数功能函数] [Delete the return parameter]
         */
        vm.data.fun.resultList.delete = function(arg) {
            vm.data.interaction.response.apiInfo.apiResultParam.splice(arg.$index, 1);
        }

        /**
         * @function [更多返回参数] [More return parameters]
         */
        vm.data.fun.more.response = function(arg) {
            var template = {
                modal: {
                    item: arg.item,
                    sort: { responseParamForm: vm.data.info.sort.responseParamForm.child },
                    fun: {
                        paramAdd: vm.data.fun.last.responseParam,
                        delete: vm.data.fun.resultParamList.delete
                    }
                }
            }
            arg.item.paramValueList = arg.item.paramValueList || [];
            if (arg.item.paramValueList.length == 0 || arg.item.paramValueList[arg.item.paramValueList.length - 1].value) {
                vm.data.fun.resultParamList.add({ item: arg.item });
            }
            $rootScope.ResponseParamEditModal(template.modal, function(callback) {
                if (callback) {
                    vm.data.interaction.response.apiInfo.apiResultParam.splice(arg.$index, 1, callback.item);
                }
            })
        }

        /**
         * @function [最后一个返回参数值可能性 item 输入框内容改变功能函数]
         * @function [The last return parameter value possibility item input box contents change function function]
         */
        vm.data.fun.last.responseParam = function(arg) {
            if (arg.$last) {
                vm.data.fun.resultParamList.add({ item: arg.item });
            }
        }

        /**
         * @function [添加返回参数值功能函数] [Add the return parameter value]
         */
        vm.data.fun.resultParamList.add = function(arg) {
            arg = arg || {};
            var template = {
                item: {
                    "value": "",
                    "valueDescription": ""
                }
            }
            arg.item.paramValueList.push(template.item);
        }

        /**
         * @function [删除返回参数值功能函数] [Delete the return parameter value]
         */
        vm.data.fun.resultParamList.delete = function(arg) {
            arg = arg || {};
            arg.item.paramValueList.splice(arg.$index, 1);
        }

        /**
         * @function [返回功能函数] [back]
         */
        vm.data.fun.back = function() {
            if (vm.data.info.reset.apiID) {
                $state.go('home.project.inside.api.detail', {
                    'groupID': vm.data.info.reset.groupID,
                    'childGroupID': vm.data.info.reset.childGroupID,
                    'apiID': vm.data.info.reset.apiID
                });
            } else {
                $state.go('home.project.inside.api.list', {
                    'groupID': vm.data.info.reset.groupID,
                    'childGroupID': vm.data.info.reset.childGroupID
                });
            }
        }

        /**
         * @function [mock状态更改] [mock状态更改]
         */
        vm.data.fun.change.requestType = function() {
            if (vm.data.interaction.response.apiInfo.apiRequestType != '0' && vm.data.interaction.response.apiInfo.apiRequestType != '2') {
                vm.data.interaction.response.apiInfo.apiRequestParamType = vm.data.interaction.response.apiInfo.apiRequestParamType == '1' ? '0' : vm.data.interaction.response.apiInfo.apiRequestParamType;
            }
        }

        /**
         * @function [辅助确认功能函数] [Auxiliary confirmation]
         */
        vm.data.assistantFun.confirm = function() {
            var info = {
                projectID: vm.data.info.reset.projectID,
                groupID: vm.data.interaction.response.apiInfo.childGroupID > 0 ? vm.data.interaction.response.apiInfo.childGroupID : vm.data.interaction.response.apiInfo.groupID,
                apiID: vm.data.info.reset.apiID,
                apiRequestParam: '',
                apiResultParam: '',
                starred: vm.data.interaction.response.apiInfo.starred,
                apiStatus: vm.data.interaction.response.apiInfo.apiStatus,
                apiProtocol: vm.data.interaction.response.apiInfo.apiProtocol,
                apiRequestType: vm.data.interaction.response.apiInfo.apiRequestType,
                apiURI: vm.data.interaction.response.apiInfo.apiURI,
                apiName: vm.data.interaction.response.apiInfo.apiName,
                apiSuccessMock: vm.data.interaction.response.apiInfo.apiSuccessMock,
                apiFailureMock: vm.data.interaction.response.apiInfo.apiFailureMock,
                apiHeader: vm.data.interaction.response.apiInfo.apiHeader,
                apiNote: vm.data.interaction.response.apiInfo.apiNoteType == '1' ? vm.data.interaction.response.apiInfo.apiMarkdownNote : vm.data.interaction.response.apiInfo.apiRichNote,
                apiNoteRaw: vm.data.interaction.response.apiInfo.apiNoteRaw,
                apiNoteType: vm.data.interaction.response.apiInfo.apiNoteType,
                apiRequestParamType: vm.data.interaction.response.apiInfo.apiRequestParamType,
                apiRequestRaw: vm.data.interaction.response.apiInfo.apiRequestRaw,
                mockRule: vm.data.interaction.response.apiInfo.mockRule,
                mockResult: vm.data.interaction.response.apiInfo.mockResult
            }
            var template = {
                apiRequestParam: [],
                apiResultParam: [],
                apiHeader: []
            };
            angular.copy(vm.data.interaction.response.apiInfo.apiRequestParam, template.apiRequestParam);
            angular.copy(vm.data.interaction.response.apiInfo.apiResultParam, template.apiResultParam);
            angular.copy(vm.data.interaction.response.apiInfo.apiHeader, template.apiHeader);
            var i = 0,
                j = 0;
            vm.check = false;
            for (i = template.apiHeader.length - 1; i >= 0; i--) { //请求头部 Request head
                if (!template.apiHeader[i].headerName) {
                    if (!template.apiHeader[i].headerValue) {
                        template.apiHeader.splice(i, 1);
                    } else {
                        vm.check = true;
                    }
                }
            }
            if (!vm.check) {
                for (i = 0; i < template.apiRequestParam.length; i++) { //请求参数 Request parameter
                    if (template.apiRequestParam[i].paramType == '1') {
                        template.apiRequestParam[i].paramValueList = [];
                    }
                    template.apiRequestParam[i].paramNotNull = template.apiRequestParam[i].paramNotNull ? '0' : '1';
                    if (!template.apiRequestParam[i].paramKey) {
                        if (template.apiRequestParam[i].paramName) {
                            vm.check = true;
                            break;
                        } else {
                            template.apiRequestParam.splice(i, 1);
                            vm.check = false;
                            i--;
                        }
                    }
                }
            }
            if (!vm.check) {
                for (i = 0; i < template.apiResultParam.length; i++) { //返回参数 Return parameter
                    template.apiResultParam[i].paramNotNull = template.apiResultParam[i].paramNotNull ? '0' : '1';
                    if (!template.apiResultParam[i].paramKey) {
                        if (template.apiResultParam[i].paramName) {
                            vm.check = true;
                            break;
                        } else {
                            template.apiResultParam.splice(i, 1);
                            vm.check = false;
                            i--;
                        }
                    }
                }
            }
            if (!vm.check) {
                info.apiHeader = JSON.stringify(template.apiHeader, function(key, value) {
                    if (/(\$\$hashKey)|(mouseLeave)|(labelIsClick)|(headerID)/.test(key)) {
                        return undefined;
                    }
                    return value;
                });
                info.apiRequestParam = JSON.stringify(template.apiRequestParam, function(key, value) {
                    if (/(\$\$hashKey)|(paramID)|(mouseLeave)|(moreParam)|(valueID)/.test(key)) {
                        return undefined;
                    }
                    return value;
                });
                info.apiResultParam = JSON.stringify(template.apiResultParam, function(key, value) {
                    if (/(\$\$hashKey)|(paramID)|(valueID)/.test(key)) {
                        return undefined;
                    }
                    return value;
                });
                info.mockRule = JSON.stringify(vm.data.interaction.response.apiInfo.mockRule, function(key, value) {
                    if (/(\$\$hashKey)|(paramID)|(valueID)|(paramNotNull)|(paramName)|(paramValueList)/.test(key)) {
                        return undefined;
                    }
                    return value;
                });
            }
            return info;
        }

        /**
         * @function [编辑相关系列按钮功能函数] [Edit the associated series button]
         */
        vm.data.fun.load = function(arg) {
            return arg.promise;
        }

        /**
         * @function [发送存储请求时预处理功能函数] [Preprocessing when sending storage requests]
         */
        vm.data.fun.requestProcessing = function(arg) { //arg status:（0：继续添加 1：快速保存，2：编辑（修改/新增））arg status: (0: continue adding 1: fast save, 2: edit (modify / add))
            var template = {
                request: vm.data.assistantFun.confirm(),
                promise: null
            }
            if ($scope.editForm.$valid && !vm.check) {
                switch (arg.status) {
                    case 0:
                        {
                            template.promise = vm.data.assistantFun.keep({
                                request: template.request
                            });
                            break;
                        }
                    case 1:
                        {
                            template.promise = vm.data.assistantFun.quickEdit({
                                request: template.request
                            });
                            break;
                        }
                    case 2:
                        {
                            template.promise = vm.data.assistantFun.edit({
                                request: template.request
                            });
                            break;
                        }
                }
            } else {
                $rootScope.InfoModal($filter('translate')('012100142'), 'error');
                vm.data.info.input.submited = true;
            }
            $scope.$emit('$translateferStation', {
                state: '$LoadingInit',
                data: {promise:template.promise}
            });
            return template.promise;
        }

        /**
         * @function [辅助继续添加功能函数] [Auxiliary continues to add]
         */
        vm.data.assistantFun.keep = function(arg) {
            var template = {
                promise: null
            }
            template.promise = ApiManagementResource.Api.Add(arg.request).$promise;
            template.promise.then(function(response) {
                switch (response.statusCode) {
                    case CODE.COMMON.SUCCESS:
                        {

                            $rootScope.InfoModal($filter('translate')('012100143'), 'success');
                            vm.data.interaction.response.apiInfo = {
                                projectID: vm.data.info.reset.projectID,
                                groupID: vm.data.info.reset.groupID == '-1' ? vm.data.info.group.parent[0].groupID : parseInt(vm.data.info.reset.groupID),
                                apiHeader: [],
                                apiRequestParam: [],
                                apiResultParam: [],
                                starred: 0
                            };
                            if (vm.data.info.reset.groupID > 0) {
                                for (var i = 0; i < vm.data.info.group.parent.length; i++) {
                                    var val = vm.data.info.group.parent[i];
                                    if (val.groupID == vm.data.info.reset.groupID) {
                                        vm.data.info.group.child = [{
                                            groupID: -1,
                                            groupName: $filter('translate')('012100141')
                                        }].concat(val.childGroupList);
                                        break;
                                    }
                                }
                            } else {
                                vm.data.info.group.child = [{
                                    groupID: -1,
                                    groupName: $filter('translate')('012100141')
                                }].concat(vm.data.info.group.parent[0].childGroupList);
                            }
                            if (vm.data.info.reset.childGroupID) {
                                vm.data.interaction.response.apiInfo.childGroupID = parseInt(vm.data.info.reset.childGroupID);
                            } else {
                                vm.data.interaction.response.apiInfo.childGroupID = -1;
                            }
                            vm.data.interaction.response.apiInfo.apiStatus = '0';
                            vm.data.interaction.response.apiInfo.apiProtocol = '0';
                            vm.data.interaction.response.apiInfo.apiRequestType = '0';
                            vm.data.interaction.response.apiInfo.apiRequestParamType = "0";
                            vm.data.interaction.response.apiInfo.apiNoteType = "0";
                            vm.data.interaction.response.apiInfo.apiRichNote = '';
                            $scope.$broadcast('$resetWangEditor');
                            vm.data.interaction.response.apiInfo.apiMarkdownNote = '';
                            $scope.$broadcast('$resetMarkdown');
                            vm.data.info.input.submited = false;
                            window.scrollTo(0, 0);
                            vm.data.info.menu = 0;
                            vm.data.fun.headerList.add();
                            vm.data.fun.requestList.add();
                            vm.data.fun.resultList.add();
                            break;
                        }
                    case CODE.PROJECT_API.EXIST:
                        {
                            try {
                                $scope.editForm.uri.$invalid = true;
                            } catch (e) {}
                            vm.data.info.input.submited = true;
                            $rootScope.InfoModal($filter('translate')('012100144'), 'error');
                            break;
                        }
                }
            })
            return template.promise;
        }

        /**
         * @function [辅助快速保存功能函数] [Auxiliary fast save]
         */
        vm.data.assistantFun.quickEdit = function(arg) {
            var template = {
                promise: null
            }
            template.promise = ApiManagementResource.Api.Update(arg.request).$promise;
            template.promise.then(function(response) {
                switch (response.statusCode) {
                    case CODE.COMMON.SUCCESS:
                        {
                            $state.go('home.project.inside.api.detail', {
                                'groupID': vm.data.info.reset.groupID,
                                'childGroupID': vm.data.info.reset.childGroupID,
                                'apiID': vm.data.info.reset.apiID
                            });
                            $rootScope.InfoModal($filter('translate')('012100145'), 'success');
                            break;
                        }
                    case CODE.PROJECT_API.EXIST:
                        {
                            try {
                                $scope.editForm.uri.$invalid = true;
                            } catch (e) {}
                            vm.data.info.input.submited = true;
                            $rootScope.InfoModal($filter('translate')('012100144'), 'error');
                        }
                }
            })
            return template.promise;
        }

        /**
         * @function [编辑功能函数] [edit]
         */
        vm.data.assistantFun.edit = function(arg) {
            var template = {
                promise: null
            }
            template.promise = ApiManagementResource.Api.Add(arg.request).$promise;
            template.promise.then(function(response) {
                switch (response.statusCode) {
                    case CODE.COMMON.SUCCESS:
                    {
                        $state.go('home.project.inside.api.detail', {
                            'groupID': vm.data.info.reset.groupID,
                            'childGroupID': vm.data.info.reset.childGroupID,
                            'apiID': response.apiID
                        });
                        $rootScope.InfoModal($filter('translate')('012100143'), 'success');
                        break;
                    }
                    case CODE.PROJECT_API.EXIST:
                    {
                        try {
                            $scope.editForm.uri.$invalid = true;
                        } catch (e) {}
                        vm.data.info.input.submited = true;
                        $rootScope.InfoModal($filter('translate')('012100144'), 'error');
                    }
                }
            })
            return template.promise;
        }

        $scope.$on('$SidebarFinish', function() {
            vm.data.fun.init();
        })
        $scope.$on('$stateChangeStart', function() {
            if (vm.data.info.timer.fun) {
                clearInterval(vm.data.info.timer.fun);
            }
        });

        /**
         * @function [辅助初始化功能函数] [Auxiliary initialization]
         */
        vm.data.assistantFun.init = function() {
            var apiGroup = GroupService.get();
            vm.data.info.group.parent = apiGroup;
            if (vm.data.interaction.response.apiInfo.groupID > 0) {
                for (var i = 0; i < vm.data.info.group.parent.length; i++) {
                    var val = vm.data.info.group.parent[i];
                    if (val.groupID == vm.data.interaction.response.apiInfo.groupID) {
                        vm.data.info.group.child = [{
                            groupID: -1,
                            groupName: $filter('translate')('012100141')
                        }].concat(val.childGroupList);
                        break;
                    }
                }
            } else {
                vm.data.info.group.child = [{
                    groupID: -1,
                    groupName: $filter('translate')('012100141')
                }].concat(vm.data.info.group.parent[0].childGroupList);
            }
            if (vm.data.info.reset.apiID || vm.data.interaction.response.apiInfo.groupID > 0) {
                vm.data.interaction.response.apiInfo.groupID = parseInt(vm.data.interaction.response.apiInfo.groupID);
                if (vm.data.interaction.response.apiInfo.childGroupID) {
                    vm.data.interaction.response.apiInfo.childGroupID = parseInt(vm.data.interaction.response.apiInfo.childGroupID);
                } else {
                    vm.data.interaction.response.apiInfo.childGroupID = -1;
                }
            } else {
                vm.data.interaction.response.apiInfo.groupID = vm.data.info.group.parent[0].groupID;
                vm.data.interaction.response.apiInfo.childGroupID = -1;
            }
            vm.data.fun.headerList.add();
            vm.data.fun.requestList.add();
            vm.data.fun.resultList.add();
        }

        /**
         * @function [初始化功能函数] [initialization]
         */
        vm.data.fun.init = function() {
            var template = {
                cache: {
                    group: GroupService.get()
                }
            }
            if (template.cache.group) {
                if (vm.data.info.reset.apiID) {
                    ApiManagementResource.Api.Detail({
                        apiID: vm.data.info.reset.apiID,
                        groupID: vm.data.info.reset.childGroupID || vm.data.info.reset.groupID,
                        projectID: vm.data.info.reset.projectID
                    }).$promise.then(function(response) {
                        switch (response.statusCode) {
                            case CODE.COMMON.SUCCESS:
                                {
                                    vm.data.interaction.response.apiInfo = response.apiInfo.baseInfo;
                                    vm.data.interaction.response.apiInfo.apiHeader = response.apiInfo.headerInfo;
                                    vm.data.interaction.response.apiInfo.apiRequestParam = response.apiInfo.requestInfo;
                                    vm.data.interaction.response.apiInfo.apiResultParam = response.apiInfo.resultInfo;
                                    vm.data.interaction.response.apiInfo.apiStatus = "" + vm.data.interaction.response.apiInfo.apiStatus;
                                    vm.data.interaction.response.apiInfo.apiProtocol = "" + vm.data.interaction.response.apiInfo.apiProtocol;
                                    vm.data.interaction.response.apiInfo.apiRequestType = "" + vm.data.interaction.response.apiInfo.apiRequestType;
                                    vm.data.interaction.response.apiInfo.apiRequestParamType = "" + vm.data.interaction.response.apiInfo.apiRequestParamType;
                                    vm.data.interaction.response.apiInfo.apiNoteType = "" + vm.data.interaction.response.apiInfo.apiNoteType;
                                    vm.data.interaction.response.apiInfo.apiRichNote = vm.data.interaction.response.apiInfo.apiNoteType == '0' ? vm.data.interaction.response.apiInfo.apiNote : '';
                                    vm.data.interaction.response.apiInfo.apiMarkdownNote = vm.data.interaction.response.apiInfo.apiNoteType == '1' ? vm.data.interaction.response.apiInfo.apiNote : '';
                                    vm.data.interaction.response.apiInfo.mockRule = response.apiInfo.mockInfo ? response.apiInfo.mockInfo.rule : [];

                                    $scope.$emit('$WindowTitleSet', { list: [((vm.data.info.reset.type == 2 ? '[另存为]' : '[修改]') + vm.data.interaction.response.apiInfo.apiName), 'API接口', $state.params.projectName, '接口管理'] });
                                    if (!!vm.data.interaction.response.apiInfo.parentGroupID) {
                                        vm.data.interaction.response.apiInfo.childGroupID = response.apiInfo.baseInfo.groupID;
                                        vm.data.interaction.response.apiInfo.groupID = vm.data.interaction.response.apiInfo.parentGroupID;
                                    } else {
                                        vm.data.interaction.response.apiInfo.childGroupID = -1;
                                    }

                                    angular.forEach(vm.data.interaction.response.apiInfo.apiRequestParam, function(val, key) {
                                        switch (val.paramNotNull) {
                                            case '0':
                                            case 0:
                                                {
                                                    val.paramNotNull = true;
                                                    break;
                                                }
                                            default:
                                                {
                                                    val.paramNotNull = false;
                                                    break;
                                                }
                                        }
                                        val.paramType = "" + (val.paramType || 0);
                                    });
                                    angular.forEach(vm.data.interaction.response.apiInfo.apiResultParam, function(val, key) {
                                        switch (val.paramNotNull) {
                                            case '0':
                                            case 0:
                                                {
                                                    val.paramNotNull = true;
                                                    break;
                                                }
                                            default:
                                                {
                                                    val.paramNotNull = false;
                                                    break;
                                                }
                                        }

                                        val.paramType = "" + (val.paramType || 0);
                                        val.type = '0';
                                    })
                                    var template = [];
                                    angular.copy(vm.data.interaction.response.apiInfo.mockRule, template);
                                    vm.data.interaction.response.apiInfo.mockRule = vm.data.interaction.response.apiInfo.apiResultParam;
                                    try {
                                        angular.forEach(template, function(val, key) {
                                            vm.data.interaction.response.apiInfo.mockRule[key].value = val.value;
                                            vm.data.interaction.response.apiInfo.mockRule[key].type = val.type;
                                            vm.data.interaction.response.apiInfo.mockRule[key].rule = val.rule;
                                        })
                                    } catch (e) {

                                    }
                                    vm.data.assistantFun.init();
                                    break;
                                }
                        }
                    });
                } else {
                    vm.data.assistantFun.init();
                    $scope.$emit('$windowTitle', {
                        apiName: $filter('translate')('012100146')
                    });
                    vm.data.interaction.response.apiInfo.apiStatus = '0';
                    vm.data.interaction.response.apiInfo.apiProtocol = '0';
                    vm.data.interaction.response.apiInfo.apiRequestType = '0';
                    vm.data.interaction.response.apiInfo.apiRequestParamType = "0";
                    vm.data.interaction.response.apiInfo.apiNoteType = '0';
                    vm.data.interaction.response.apiInfo.mockRule = vm.data.interaction.response.apiInfo.apiResultParam;
                }
            }
        }
        vm.data.fun.init();
    }
})();
