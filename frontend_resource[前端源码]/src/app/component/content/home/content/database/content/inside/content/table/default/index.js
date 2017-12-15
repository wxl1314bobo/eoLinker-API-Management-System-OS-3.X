(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [数据库内页列表（list）模块相关js] [Database inner page list module related js]
     * @version  3.1.1
     * @service  $scope [注入作用域服务] [inject scope service]
     * @service  $rootScope [注入根作用域服务] [inject rootScope service]
     * @service  DatabaseResource [注入数据库接口服务] [inject Database API service]
     * @service  $state [注入路由服务] [inject state service]
     * @service  GroupService [注入GroupService服务] [inject GroupService service]
     * @service  $filter [注入过滤器服务] [inject filter service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
    angular.module('eolinker')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('home.database.inside.table.list', {
                    url: '/?tableID',
                    template: '<database-table-list power-object="$ctrl.powerObject"></database-table-list>'
                });
        }])
        .component('databaseTableList', {
            templateUrl: 'app/component/content/home/content/database/content/inside/content/table/default/index.html',
            bindings: {
                powerObject: '<'
            },
            controller: databaseTableListCtroller
        })

    databaseTableListCtroller.$inject = ['$scope', '$rootScope', 'DatabaseResource', '$state', 'GroupService', '$filter', 'CODE'];

    function databaseTableListCtroller($scope, $rootScope, DatabaseResource, $state, GroupService, $filter, CODE) {
        var vm = this;
        vm.data = {
            info: {
                checkBtn: $filter('translate')('0101008'),
                nullBtn: $filter('translate')('0101009')
            },
            interaction: {
                request: {
                    databaseID: $state.params.databaseID,
                    tableID: $state.params.tableID
                },
                response: {
                    query: []
                }
            },
            fun: {
                init: null, 
                delete: null, 
                value: null, 
                edit: null, 
                
            }
        }

        /**
         * @function [初始化功能函数] [initialization]
         */
        vm.data.fun.init = function(arg) {
            var template = {
                promise: null,
                request: {
                    dbID: vm.data.interaction.request.databaseID,
                    tableID: vm.data.interaction.request.tableID || (arg ? arg.tableID : null)
                }
            }
            $scope.$emit('$WindowTitleSet', { list: [$filter('translate')('01010012'), $filter('translate')('01010013')] });
            if (template.request.tableID) {
                vm.data.interaction.request.tableID = template.request.tableID;
                template.promise = DatabaseResource.Field.Query(template.request).$promise;
                template.promise.then(function(response) {
                    switch (response.statusCode) {
                        case CODE.COMMON.SUCCESS:
                            {
                                vm.data.interaction.response.query = response.fieldList;
                                break;
                            }
                    }
                })
                return template.promise;
            }
            return null;
        }

        /**
         * @function [编辑功能函数] [edit]
         */
        vm.data.fun.edit = function(arg) { 
            arg = arg || {};
            var template = {
                cache: GroupService.get(),
                modal: {
                    title: arg.item ? $filter('translate')('01010014') : $filter('translate')('01010015'),
                    interaction:{
                        request: arg.item ? arg.item : { tableID: vm.data.interaction.request.tableID, databaseID: vm.data.interaction.request.databaseID }
                    }
                }
            }
            if (arg.item) {
                arg.item.databaseID = vm.data.interaction.request.databaseID;
                $rootScope.FieldModal(template.modal, function(callback) {
                    if (callback) {
                        $rootScope.InfoModal(template.modal.title + $filter('translate')('01010016'), 'success');
                        vm.data.fun.init();
                    }
                });
            } else {
                if (template.cache && template.cache.length > 0) {
                    $rootScope.FieldModal(template.modal, function(callback) {
                        if (callback) {
                            if (callback.status != 1) { //1：为继续添加后点击关闭函数 To continue adding after clicking the close function
                                $rootScope.InfoModal(template.modal.title + $filter('translate')('01010016'), 'success');
                            }
                            vm.data.fun.init();
                        }
                    });
                } else {
                    $rootScope.InfoModal($filter('translate')('01010017'), 'error');
                }
            }
        }

        /**
         * @function [显示字段描述功能函数] [Show field description]
         */
        vm.data.fun.value = function(info) {
            $rootScope.MessageModal(info.fieldName + $filter('translate')('01010018'), info.fieldDescription, function(data) {});
        }

        /**
         * @function [删除字段功能函数] [Delete the field]
         */
        vm.data.fun.delete = function(arg) {
            $rootScope.EnsureModal($filter('translate')('01010019'), false, $filter('translate')('01010020'), {}, function(callback) {
                if (callback) {
                    DatabaseResource.Field.Delete({ fieldID: arg.item.fieldID, databaseID: vm.data.interaction.request.databaseID }).$promise
                        .then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        vm.data.interaction.response.query.splice(arg.$index, 1);
                                        $rootScope.InfoModal($filter('translate')('01010021'), 'success');
                                        break;
                                    }
                            }
                        })
                }
            });
        }
        

    }
})();
