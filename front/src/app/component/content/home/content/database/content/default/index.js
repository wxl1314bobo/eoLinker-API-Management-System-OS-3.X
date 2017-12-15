(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [数据库列表页相关指令js] [Database list page related instructions js]
     * @version  3.0.2
     * @service  $scope [注入作用域服务] [inject scope service]
     * @service  $rootScope [注入根作用域服务] [inject rootScope service]
     * @service  DatabaseResource [注入数据库接口服务] [inject Database API service]
     * @service  $state [注入路由服务] [inject state service]
     * @service  NavbarService [注入NavbarService服务] [inject NavbarService service]
     * @service  $filter [注入过滤器服务] [inject filter service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
    angular.module('eolinker')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('home.database.list', {
                    url: '/',
                    template: '<home-database-list></home-database-list>'
                });
        }])
        .component('homeDatabaseList', {
            templateUrl: 'app/component/content/home/content/database/content/default/index.html',
            controller: homeDatabaseListController
        })

    homeDatabaseListController.$inject = ['$scope', '$rootScope', 'DatabaseResource', '$state', 'NavbarService', '$filter', 'CODE'];

    function homeDatabaseListController($scope, $rootScope, DatabaseResource, $state, NavbarService, $filter, CODE) {
        var vm = this;
        vm.data = {
            service: {
                navbar: NavbarService,
            },
            interaction: {
                request: {
                    databaseType: -1
                },
                response: {
                    query: null
                }
            },
            fun: {
                import: null, 
                enter: null, 
                edit: null, 
                delete: null, 
                init: null 
            }
        }

        /**
         * @function [初始化功能函数] [initialization]
         */
        vm.data.fun.init = function() {
            var template = {
                promise: null,
                request: {
                    databaseType: vm.data.interaction.request.databaseType,
                }
            }
            $scope.$emit('$WindowTitleSet', { list: [$filter('translate')('01009')] });
            template.promise = DatabaseResource.Database.Query(template.request).$promise;
            template.promise.then(function(response) {
                vm.data.interaction.response.query = response.databaseList||[];
            })
            return template.promise;
        }

        /**
         * @function [编辑功能函数] [edit]
         */
        vm.data.fun.edit = function(arg) {
            arg = arg || {};
            if(arg.$event){
                arg.$event.stopPropagation();
            }
            var template = {
                modal: {
                    title: arg.item ? $filter('translate')('010010') : $filter('translate')('01000'),
                    interaction:{
                        request:arg.item
                    }
                },
                response: null
            }
            $rootScope.DatabaseModal(template.modal, function(callback) {
                if (callback) {
                    template.response = {
                        dbID: callback.dbID,
                        dbName: callback.dbName,
                        dbVersion: callback.dbVersion,
                        dbUpdateTime: $filter('currentTimeFilter')(),
                        userType: callback.userType || 0
                    }
                    if (arg.item) {
                        vm.data.interaction.response.query.splice(arg.$index, 1);
                    }
                    vm.data.interaction.response.query.splice(0, 0, template.response);
                    $rootScope.InfoModal(template.modal.title + $filter('translate')('010011'), 'success');
                }
            });
        }

        /**
         * @function [删除功能函数] [delete]
         */
        vm.data.fun.delete = function(arg) {
            arg = arg || {};
            arg.$event.stopPropagation();
            var template = {
                request: {
                    dbID: arg.item.dbID
                }
            }
            $rootScope.EnsureModal($filter('translate')('010012'), true, $filter('translate')('010013'), {}, function(callback) {
                if (callback) {
                    DatabaseResource.Database.Delete(template.request).$promise.then(function(response) {
                        switch (response.statusCode) {
                            case CODE.COMMON.SUCCESS:
                                {
                                    vm.data.interaction.response.query.splice(arg.$index, 1);
                                    $rootScope.InfoModal($filter('translate')('010014'), 'success');
                                    break;
                                }
                        }
                    })
                }
            });
        }

        /**
         * @function [进入内页功能函数] [enter inside page]
         */
        vm.data.fun.enter = function(arg) {
            $state.go('home.database.inside.table.list', { databaseID: arg.item.dbID, userType: arg.item.userType });
        }

        /**
         * @function [导入数据字典] [Import data dictionary]
         */
        vm.data.fun.import = function() {
            var template = {
                modal: {
                    title: $filter('translate')('010015'),
                    status: 1
                }
            }
            $rootScope.ImportDatabaseModal(template.modal, function(callback) {
                if (callback) {
                    $scope.$broadcast('$LoadingInit');
                }
            });
        }
    }
})();
