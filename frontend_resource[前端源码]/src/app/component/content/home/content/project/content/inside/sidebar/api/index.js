(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [api sidebar模块相关js] [sidebar module related js]
     * @version  3.0.2
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $rootScope [注入根作用域服务] [Injection rootscope service]
     * @service  ApiManagementResource [注入接口管理接口服务] [inject ApiManagement API service]
     * @service  $state [注入路由服务] [Injection state service]
     * @service  GroupService [注入GroupService服务] [Injection GroupService service]
     * @service  HomeProjectSidebarService [注入HomeProjectSidebarService服务] [Injection HomeProjectSidebarService service]
     * @service  $filter [注入过滤器服务] [Injection filter service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
     angular.module('eolinker')
     .component('homeProjectInsideApiSidebar', {
        templateUrl: 'app/component/content/home/content/project/content/inside/sidebar/api/index.html',
        bindings: {
            powerObject: '<'
        },
        controller: homeProjectInsideApiSidebarController
    })

     homeProjectInsideApiSidebarController.$inject = ['$scope', '$rootScope', 'ApiManagementResource', '$state', 'GroupService', 'HomeProjectSidebarService', '$filter', 'CODE'];

     function homeProjectInsideApiSidebarController($scope, $rootScope, ApiManagementResource, $state, GroupService, HomeProjectSidebarService, $filter, CODE) {
        var vm = this;
        vm.data = {
            service:HomeProjectSidebarService,
            static: {
                query: [{ groupID: -1, groupName: $filter('translate')('0121408') }, { groupID: -2, groupName: $filter('translate')('0121409') }]
            },
            info: {
                sidebarShow: null,
                sort: {
                    isDisable: false,
                    originQuery: [],
                    groupForm: {
                        containment: '.group-form-ul',
                        child: {
                            containment: '.child-group-form-ul'
                        }
                    }
                }
            },
            interaction: {
                request: {
                    projectID: $state.params.projectID,
                    groupID: $state.params.groupID || -1,
                    childGroupID: $state.params.childGroupID,
                    apiID: $state.params.apiID,
                    orderList: []
                },
                response: {
                    query: []
                }
            },
            fun: {
                init: null, 
                more: null, 
                spreed:null,
                sort: {
                    copy: null, 
                    confirm: null, 
                    cancle: null, 
                }, 
                click: {
                    parent: null, 
                    child: null 
                },
                edit: {
                    parent: null, 
                    child: null 
                },
                delete: {
                    parent: null, 
                    child: null 
                }
            }
        }

        /**
         * @function [初始化功能函数]
         */
         vm.data.fun.init = function() {
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    groupID: vm.data.interaction.request.groupID,
                    childGroupID: vm.data.interaction.request.childGroupID,
                    apiID: vm.data.interaction.request.apiID
                },
                query: [],
                sort: {
                    _default: [],
                    array: [],
                    childArray: []
                },
                loop: {
                    parent: 0,
                    child: 0
                }
            }
            vm.data.service.fun.clear();
            angular.copy(vm.data.static.query, vm.data.interaction.response.query);
            if ($state.current.name.indexOf('edit') > -1) {
                vm.data.info.sidebarShow = false;
            } else {
                vm.data.info.sidebarShow = true;
            }
            ApiManagementResource.ApiGroup.Query(template.request).$promise.then(function(response) {
                switch (response.statusCode) {
                    case CODE.COMMON.SUCCESS:
                    {
                        try {
                            template.sort._default = JSON.parse(response.groupOrder);
                            angular.forEach(response.groupList, function(val, key) {
                                template.sort.childArray = [];
                                angular.forEach(val.childGroupList, function(childVal, childKey) {
                                    childVal.$order = template.sort._default[childVal.groupID];
                                    template.loop.child = childVal.$order > (template.sort.childArray.length - 1) ? (template.sort.childArray.length - 1) : childVal.$order;
                                    if (template.loop.child >= 0) {
                                        for (; template.loop.child >= 0; template.loop.child--) {
                                            if (template.sort.childArray[template.loop.child].$order <= childVal.$order) {
                                                break;
                                            }
                                        }
                                        template.sort.childArray.splice(template.loop.child + 1, 0, childVal);
                                    } else {
                                        template.sort.childArray.push(childVal);
                                    }
                                })
                                val.isSpreed=true;
                                val.childGroupList = template.sort.childArray;
                                val.$order = template.sort._default[val.groupID];
                                template.loop.parent = val.$order > (template.sort.array.length - 1) ? (template.sort.array.length - 1) : val.$order;
                                if (template.loop.parent >= 0) {
                                    for (; template.loop.parent >= 0; template.loop.parent--) {
                                        if (template.sort.array[template.loop.parent].$order <= val.$order) {
                                            break;
                                        }
                                    }
                                    template.sort.array.splice(template.loop.parent + 1, 0, val);
                                } else {
                                    template.sort.array.push(val);
                                }
                            })
                        } catch (e) {
                            template.sort.array = response.groupList;
                        } finally {
                            vm.data.interaction.response.groupOrder = response.groupOrder;
                            vm.data.interaction.response.query = vm.data.interaction.response.query.concat(template.sort.array);
                            if ($state.current.name.indexOf('edit') > -1) {
                                GroupService.set(template.sort.array, true);
                            } else {
                                GroupService.set(template.sort.array);
                            }
                        }
                    }
                }
            })
        }
        vm.data.fun.init();

        /**
         * @function [更多功能函数]
         */
         vm.data.fun.more = function(arg) {
            arg.$event.stopPropagation();
            arg.item.listIsClick = true;
        }

        /**
         * @function [展开收缩功能函数]
         */
         vm.data.fun.spreed=function(arg){
            if (arg.$event) {
                arg.$event.stopPropagation();
            }
            arg.item.isSpreed=!arg.item.isSpreed;
        }

        /**
         * @function [复制相应原数组功能函数]
         */
         vm.data.fun.sort.copy = function() {
            angular.copy(vm.data.interaction.response.query.slice(2), vm.data.info.sort.originQuery);
            if(vm.data.info.sort.originQuery.length>0){
                vm.data.info.sort.isDisable = true;
            }
        }

        /**
         * @function [取消排序功能函数]
         */
         vm.data.fun.sort.cancle = function() {
            vm.data.info.sort.isDisable = false;
        }

        /**
         * @function [排序确认功能函数]
         */
         vm.data.fun.sort.confirm = function() {
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    orderList: {}
                }
            }
            angular.forEach(vm.data.info.sort.originQuery, function(val, key) {
                template.request.orderList[val.groupID] = key;
                angular.forEach(val.childGroupList, function(childVal, childKey) {
                    template.request.orderList[childVal.groupID] = childKey;
                })

            })
            template.request.orderList = JSON.stringify(template.request.orderList);
            ApiManagementResource.ApiGroup.Sort(template.request).$promise
            .then(function(response) {
                switch (response.statusCode) {
                    case CODE.COMMON.SUCCESS:
                    {
                        $rootScope.InfoModal($filter('translate')('01214010'), 'success');
                        vm.data.interaction.response.query.splice(2);
                        vm.data.interaction.response.query = vm.data.interaction.response.query.concat(vm.data.info.sort.originQuery)
                        vm.data.info.sort.isDisable = false;
                        GroupService.set(vm.data.info.sort.originQuery);
                        break;
                    }
                    default:
                    {
                        $rootScope.InfoModal($filter('translate')('01214011'), 'error');
                        break;
                    }
                }
            })
        }

        /**
         * @function [子分组单击事件]
         */
         vm.data.fun.click.child = function(arg) {
            vm.data.interaction.request.childGroupID = arg.item.groupID;
            $state.go('home.project.inside.api.list', { groupID: vm.data.interaction.request.groupID, childGroupID: arg.item.groupID, apiID: null, search: null });
        }

        /**
         * @function [父分组单击事件]
         */
         vm.data.fun.click.parent = function(arg) {
            vm.data.interaction.request.groupID = arg.item.groupID || -1;
            vm.data.interaction.request.childGroupID = null;
            arg.item.isSpreed=true;
            $state.go('home.project.inside.api.list', { 'groupID': arg.item.groupID, childGroupID: null, search: null });
        }

        /**
         * @function [父分组编辑事件]
         */
         vm.data.fun.edit.parent = function(arg) {
            arg = arg || {};
            var template = {
                modal: {
                    title: arg.item ? $filter('translate')('01214012') : $filter('translate')('01214013'),
                    secondTitle: $filter('translate')('01214014'),
                    group: arg.item ? null : vm.data.interaction.response.query.slice(2)
                },
                $index: null
            }
            $rootScope.GroupModal(template.modal.title, arg.item, template.modal.secondTitle, template.modal.group, function(callback) {
                if (callback) {
                    callback.projectID = vm.data.interaction.request.projectID;
                    template.$index = parseInt(callback.$index) - 1;
                    if (arg.item) {
                        ApiManagementResource.ApiGroup.Update(callback).$promise.then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                {
                                    $rootScope.InfoModal(template.modal.title + $filter('translate')('01214015'), 'success');
                                    vm.data.fun.init();
                                    break;
                                }
                            }
                        });
                    } else {
                        if (template.$index > -1) {
                            callback.parentGroupID = vm.data.interaction.response.query[template.$index + 2].groupID;
                        }
                        ApiManagementResource.ApiGroup.Add({ projectID: callback.projectID, groupName: callback.groupName, parentGroupID: callback.parentGroupID }).$promise.then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                {
                                    $rootScope.InfoModal(template.modal.title + $filter('translate')('01214015'), 'success');
                                    vm.data.fun.init();
                                    break;
                                }
                            }
                        });
                    }
                }
            });
}

        /**
         * @function [子分组编辑事件]
         */
         vm.data.fun.edit.child = function(arg) {
            arg.item = arg.item || {};
            var template = {
                modal: {
                    title: arg.isEdit ? $filter('translate')('01214016') : $filter('translate')('01214017'),
                    group: vm.data.interaction.response.query.slice(2)
                },
                $index: null
            }
            arg.item.$index = arg.$outerIndex - 1;
            console.log(arg.$outerIndex)
            $rootScope.GroupModal(template.modal.title, arg.item, $filter('translate')('01214014'), template.modal.group, function(callback) {
                if (callback) {
                    callback.projectID = vm.data.interaction.request.projectID;
                    template.$index = parseInt(callback.$index) - 1;
                    if (template.$index > -1) {
                        callback.parentGroupID = vm.data.interaction.response.query[template.$index + 2].groupID;
                    } else {
                        callback.parentGroupID = 0;
                    }
                    if (arg.isEdit) {
                        ApiManagementResource.ApiGroup.Update(callback).$promise.then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                {
                                    $rootScope.InfoModal(template.modal.title + $filter('translate')('01214015'), 'success');
                                    vm.data.fun.init();
                                    break;
                                }
                            }
                        });
                    } else {
                        ApiManagementResource.ApiGroup.Add({ parentGroupID: callback.parentGroupID, projectID: vm.data.interaction.request.projectID, groupName: callback.groupName }).$promise.then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                {
                                    $rootScope.InfoModal(template.modal.title + $filter('translate')('01214015'), 'success');
                                    vm.data.fun.init();
                                    break;
                                }
                            }
                        });
                    }
                }
            });
}

        /**
         * @function [子分组删除事件]
         */
         vm.data.fun.delete.child = function(arg) {
            arg = arg || {};
            var template = {
                modal: {
                    title: $filter('translate')('01214018'),
                    message: $filter('translate')('01214019')
                }
            }
            $rootScope.EnsureModal(template.modal.title, false, template.modal.message, {}, function(callback) {
                if (callback) {
                    ApiManagementResource.ApiGroup.Delete({ projectID: vm.data.interaction.request.projectID, groupID: arg.childItem.groupID }).$promise.then(function(response) {
                        switch (response.statusCode) {
                            case CODE.COMMON.SUCCESS:
                            {
                                arg.item.childGroupList.splice(arg.$index, 1);
                                $rootScope.InfoModal($filter('translate')('01214020'), 'success');
                                if (vm.data.interaction.request.childGroupID == arg.childItem.groupID) {
                                    vm.data.fun.click.parent({ item: arg.item });
                                }
                                break;
                            }
                        }
                    })
                }
            });
        }

        /**
         * @function [父分组删除事件]
         */
         vm.data.fun.delete.parent = function(arg) {
            arg = arg || {};
            var template = {
                modal: {
                    title: $filter('translate')('01214018'),
                    message: $filter('translate')('01214019')
                }
            }
            $rootScope.EnsureModal(template.modal.title, false, template.modal.message, {}, function(callback) {
                if (callback) {
                    ApiManagementResource.ApiGroup.Delete({ projectID: vm.data.interaction.request.projectID, groupID: arg.item.groupID }).$promise.then(function(response) {
                        switch (response.statusCode) {
                            case CODE.COMMON.SUCCESS:
                            {
                                vm.data.interaction.response.query.splice(arg.$index, 1);
                                $rootScope.InfoModal($filter('translate')('01214020'), 'success');
                                if (vm.data.interaction.response.query.length > 2) {
                                    GroupService.set(vm.data.interaction.response.query.slice(2));
                                } else {
                                    GroupService.set(null);
                                }
                                if ($state.params.groupID == -1) {
                                    vm.data.fun.click.parent({ item: {} });
                                } else if (vm.data.interaction.request.groupID == arg.item.groupID) {
                                    vm.data.fun.click.parent({ item: vm.data.interaction.response.query[0] });
                                } else if ($state.params.groupID == -2) {
                                    vm.data.fun.click.child({ item: { groupID: -1 } })
                                }
                                break;
                            }
                        }
                    })
}
});
}

        /**
         * @function [路由更改函数]
         */
         $scope.$on('$stateChangeSuccess', function() { 
            if ($state.current.name.indexOf('edit') > -1) {
                vm.data.info.sidebarShow = false;
            } else {
                vm.data.info.sidebarShow = true;
            }
        })

        /**
         * @function [inside tab 转换时更改group选中状态]
         */
         $scope.$on('$changeSidebar', function(data, attr) { 
            angular.forEach(vm.data.interaction.response.query, function(val, key) {
                if (val.groupID == attr.groupID) {
                    if (attr.childGroupID && attr.groupID > 0) {
                        for (var i = 0; i < val.childGroupList.length; i++) {
                            if (val.childGroupList[i].groupID == attr.childGroupID) {
                                val.childGroupList[i].isClick = true;
                                if (attr.isList) {
                                    $scope.$emit('$windowTitle', { groupName: val.childGroupList[i].groupName });
                                }
                                break;
                            }
                        }
                    } else {
                        if (attr.isList) {
                            $scope.$emit('$windowTitle', { groupName: val.groupName });
                        }
                    }
                }
            })
        });
}

})();
