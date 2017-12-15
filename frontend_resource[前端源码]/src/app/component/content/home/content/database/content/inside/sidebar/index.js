(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [数据库内页侧边栏模块相关js] [Database inside the page sidebar module related js]
     * @version  3.0.2
     * @service  $scope [注入作用域服务] [inject scope service]
     * @service  $rootScope [注入根作用域服务] [inject rootScope service]
     * @service  DatabaseResource [注入数据库接口服务] [inject Database API service]
     * @service  $state [注入路由服务] [inject state service]
     * @service  GroupService [注入GroupService服务] [inject GroupService service]
     * @service  $filter [注入GroupService服务] [inject filter service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
    angular.module('eolinker')
        .component('databaseSidebar', {
            templateUrl: 'app/component/content/home/content/database/content/inside/sidebar/index.html',
            bindings: {
                powerObject: '<'
            },
            controller: databaseSidebarController
        })

    databaseSidebarController.$inject = ['$scope', '$rootScope', 'DatabaseResource', '$state', 'GroupService', '$filter', 'CODE'];

    function databaseSidebarController($scope, $rootScope, DatabaseResource, $state, GroupService, $filter, CODE) {
        var vm = this;
        vm.data = {
            info: {
                sidebarShow: null
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
                click: null, 
                edit: null, 
                delete: null, 
                import: null, 
                more: null, 
                dump: null 
            }
        }

        /**
         * @function [导入表功能函数] [Import table]
         */
        vm.data.fun.import = function($file) { 
            var template = {
                modal: {
                    title: $filter('translate')('010121'),
                    status: 0
                }
            }
            $rootScope.ImportDatabaseModal(template.modal, function(callback) {
                if (callback) {
                    $state.reload();
                }
            });
        }

        /**
         * @function [table单击事件] [table click event]
         */
        vm.data.fun.click = function(arg) {
            vm.data.interaction.request.tableID = arg.item.tableID;
            $state.go('home.database.inside.table.list', { tableID: arg.item.tableID });
        }

        /**
         * @function [更多功能函数] [More functional functions]
         */
        vm.data.fun.more = function(arg) {
            arg.$event.stopPropagation();
            arg.item.listIsClick = true;
        }

        /**
         * @function [table编辑事件] [edit the event]
         */
        vm.data.fun.edit = function(arg) {
            arg = arg || {};
            var template = {
                modal: {
                    title: arg.item ? $filter('translate')('010129') : $filter('translate')('010120')
                },
                $index: null
            }
            $rootScope.TableModal(template.modal.title, arg.item, vm.data.interaction.request.databaseID, function(callback) {
                if (callback) {
                    if (arg.item) {
                        DatabaseResource.DatabaseTable.Update(callback).$promise.then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        $rootScope.InfoModal(template.modal.title + $filter('translate')('0101210'), 'success');
                                        arg.item.tableName = callback.tableName;
                                        arg.item.tableDescription = callback.tableDescription;
                                        GroupService.set(vm.data.interaction.response.query);
                                        break;
                                    }
                            }
                        });
                    } else {
                        DatabaseResource.DatabaseTable.Add(callback).$promise.then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        $rootScope.InfoModal(template.modal.title + $filter('translate')('0101210'), 'success');
                                        if (vm.data.interaction.response.query == 0) {
                                            var newItem = { tableID: parseInt(response.tableID), tableName: callback.tableName, tableDescription: callback.tableDescription, isClick: true };
                                            vm.data.interaction.response.query.push(newItem);
                                            vm.data.fun.click({ item: newItem });
                                        } else {
                                            vm.data.interaction.response.query.push({ tableID: parseInt(response.tableID), tableName: callback.tableName, tableDescription: callback.tableDescription });
                                        }
                                        GroupService.set(vm.data.interaction.response.query);
                                        break;
                                    }
                            }
                        });
                    }
                }
            });
        }

        /**
         * @function [table删除事件] [delete event]
         */
        vm.data.fun.delete = function(arg) {
            arg = arg || {};
            var template = {
                modal: {
                    title: $filter('translate')('0101211'),
                    message: $filter('translate')('0101212')
                }
            }
            $rootScope.EnsureModal(template.modal.title, false, template.modal.message, {}, function(callback) {
                if (callback) {
                    DatabaseResource.DatabaseTable.Delete({ dbID: vm.data.interaction.request.databaseID, tableID: arg.item.tableID }).$promise.then(function(response) {
                        switch (response.statusCode) {
                            case CODE.COMMON.SUCCESS:
                                {
                                    vm.data.interaction.response.query.splice(arg.$index, 1);
                                    $rootScope.InfoModal($filter('translate')('0101213'), 'success');
                                    if (vm.data.interaction.request.tableID == arg.item.tableID) {
                                        if (vm.data.interaction.response.query.length > 0) {
                                            vm.data.fun.click({ item: vm.data.interaction.response.query[0] });
                                        } else {
                                            $state.go('home.database.inside.table.list', { tableID: null });
                                        }
                                    }
                                    break;
                                }
                        }
                    })
                }
            });
        }

        /**
         * @function [导出功能函数] [Export]
         */
        vm.data.fun.dump = function() {
            var template={
                modal:{
                    title:$filter('translate')('010122'),
                    dbID:vm.data.interaction.request.databaseID
                }
            }
            $rootScope.ExportDatabaseModal(template.modal, function(callback) {});
        }

        /**
         * @function [初始化功能函数] [initialization]
         */
        vm.data.fun.init = (function() {
            var template = {
                request: {
                    dbID: vm.data.interaction.request.databaseID
                }
            }
            vm.data.info.sidebarShow = true;
            DatabaseResource.DatabaseTable.Query(template.request).$promise.then(function(response) {
                switch (response.statusCode) {
                    case CODE.COMMON.SUCCESS:
                        {
                            vm.data.interaction.response.query = response.tableList;
                            GroupService.set(vm.data.interaction.response.query);
                            if (!vm.data.interaction.request.tableID) {
                                vm.data.interaction.request.tableID = vm.data.interaction.response.query[0].tableID;
                                $scope.$emit('$translateferStation', { state: '$LoadingInit', data: { tableID: vm.data.interaction.request.tableID } });
                            }
                        }
                }
            })
        })()
    }

})();
