(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [数据库协作页（list）模块相关js] [Database collaboration page (list) module related js]
     * @version  3.1.1
     * @service  $scope [注入作用域服务] [inject scope service] 
     * @service  $rootScope [注入根作用域服务] [inject rootScope service]
     * @service  DatabaseResource [注入数据库接口服务] [inject Database API service]
     * @service  $state [注入路由服务] [inject state service]
     * @service  $filter [注入过滤器服务] [inject filter service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
    angular.module('eolinker')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('home.database.inside.team', {
                    url: '/team',
                    template: '<database-team></database-team>'
                });
        }])
        .component('databaseTeam', {
            templateUrl: 'app/component/content/home/content/database/content/inside/content/team/index.html',
            controller: databaseTeam
        })

    databaseTeam.$inject = ['$scope', '$rootScope', 'DatabaseResource', '$state', '$filter', 'CODE'];

    function databaseTeam($scope, $rootScope, DatabaseResource, $state, $filter, CODE) {

        var vm = this;
        vm.data = {
            info: {
                search: {
                    submited: false,
                    leave: true,
                    isDisable: false
                },
                power: 2, //0：管理员 admin，1：协作管理员 collaboration manager，2：普通成员 regular member 
                timer: {
                    fun: null
                },
                filter: {
                    unknown: $filter('translate')('0101012'),
                    unknownNickName: $filter('translate')('0101013'),
                    haveJoined: $filter('translate')('0101014'),
                    add: $filter('translate')('0101015'),
                    administrators: $filter('translate')('0101017'),
                    kick: $filter('translate')('01010111'),
                    quit: $filter('translate')('01010112'),
                }
            },
            interaction: {
                request: {
                    dbID: $state.params.databaseID,
                    userName: ''
                },
                response: {
                    userInfo: null,
                    adminQuery: [],
                    query: []
                }
            },
            fun: {
                init: null, 
                check: null, 
                closeSearch: null, 
                setNickName: null, 
                add: null, 
                setType: null, 
                delete: null, 
                search: null 

            }
        }

        /**
         * @function [隐藏搜索框功能函数] [Hide the search box function function]
         */
        vm.data.fun.closeSearch = function() {
            if (vm.data.info.search.leave) {
                vm.data.info.search.submited = false;
                vm.data.interaction.response.userInfo = null;
            }
        }

        /**
         * @function [设置备注名] [Set the memo name]
         */
        vm.data.fun.setNickName = function(arg) {
            arg.item.groupName = arg.item.partnerNickName;
            arg.item.required = true;
            $rootScope.GroupModal($filter('translate')('01010114'), arg.item, $filter('translate')('01010115'), null, function(callback) {
                if (callback) {
                    DatabaseResource.Partner.SetNickName({ dbID: vm.data.interaction.request.dbID, nickName: callback.groupName, connID: arg.item.connID }).$promise
                        .then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        $rootScope.InfoModal($filter('translate')('01010116'), 'success');
                                        arg.item.partnerNickName = callback.groupName;
                                        break;
                                    }
                            }
                        });
                }
            });
        }

        /**
         * @function [设置用户权限] [Set user permissions]
         */
        vm.data.fun.setType = function(arg) {
            arg.item.listIsClick = false;
            var template = {
                request: {
                    dbID: vm.data.interaction.request.dbID,
                    connID: arg.item.connID,
                    userType: arg.userType
                }
            }
            DatabaseResource.Partner.SetType(template.request).$promise
                .then(function(response) {
                    switch (response.statusCode) {
                        case CODE.COMMON.SUCCESS:
                            {
                                $rootScope.InfoModal($filter('translate')('01010117'), 'success');
                                arg.item.listIsClick = false;
                                switch (arg.userType) {
                                    case 1:
                                        {
                                            vm.data.interaction.response.adminQuery.push(arg.item);
                                            vm.data.interaction.response.query.splice(arg.$index, 1);
                                            break;
                                        }
                                    case 2:
                                    case 3:
                                        {
                                            if (arg.item.userType < 2) {
                                                vm.data.interaction.response.query.push(arg.item);
                                                vm.data.interaction.response.adminQuery.splice(arg.$index, 1);
                                            }
                                            break;
                                        }
                                }
                                arg.item.userType = arg.userType;
                                break;
                            }
                    }
                });
        }

        /**
         * @function [添加用户] [Add user]
         */
        vm.data.fun.add = function() {
            if (!vm.data.info.search.isDisable) {
                vm.data.info.search.isDisable = true;
                DatabaseResource.Partner.Add(vm.data.interaction.request).$promise
                    .then(function(response) {
                        vm.data.info.search.isDisable = false;
                        switch (response.statusCode) {
                            case CODE.COMMON.SUCCESS:
                                {
                                    var info = vm.data.interaction.response.userInfo;
                                    vm.data.info.search.submited = false;
                                    vm.data.interaction.request.userName = '';
                                    info.isNow = 0;
                                    info.userType = 2;
                                    info.inviteCall = info.userName;
                                    info.connID = response.connID;
                                    vm.data.interaction.response.query.push(info);
                                    vm.data.interaction.response.userInfo = null;
                                    break;
                                }
                        }
                    });
            }

        }

        /**
         * @function [移除、退出项目] [Remove, exit item]
         */
        vm.data.fun.delete = function(arg) {
            var bol = arg.item.isNow == 1 ? true : false;
            var template = {
                request: {
                    dbID: vm.data.interaction.request.dbID
                }
            }
            if (bol) {
                $rootScope.EnsureModal($filter('translate')('01010118'), false, $filter('translate')('01010119'), {}, function(callback) {
                    if (callback) {
                        DatabaseResource.Partner.Quit(template.request).$promise
                            .then(function(response) {
                                switch (response.statusCode) {
                                    case CODE.COMMON.SUCCESS:
                                        {
                                            $state.go('home.database.list');
                                            break;
                                        }
                                }
                            });
                    }
                });

            } else {
                $rootScope.EnsureModal($filter('translate')('01010120'), false, $filter('translate')('01010121'), {}, function(callback) {
                    if (callback) {
                        DatabaseResource.Partner.Delete({ dbID: vm.data.interaction.request.dbID, connID: arg.item.connID }).$promise
                            .then(function(response) {
                                switch (response.statusCode) {
                                    case CODE.COMMON.SUCCESS:
                                        {
                                            if (arg.isAdmin) {
                                                vm.data.interaction.response.adminQuery.splice(arg.$index, 1);
                                            } else {
                                                vm.data.interaction.response.query.splice(arg.$index, 1);
                                            }
                                            $rootScope.InfoModal($filter('translate')('01010122'), 'success');
                                            break;
                                        }
                                }
                            });
                    }
                });
            }
        }

        /**
         * @function [搜索用户] [search user]
         */
        vm.data.fun.search = function() {
            var template = {
                request: {
                    dbID: vm.data.interaction.request.dbID,
                    userName: vm.data.interaction.request.userName
                }
            }
            if (vm.data.info.timer.fun) {
                clearInterval(vm.data.info.timer.fun);
            }
            if (!!vm.data.interaction.request.userName) {
                DatabaseResource.Partner.Search(template.request).$promise
                    .then(function(response) {
                        vm.data.info.search.submited = true;
                        switch (response.statusCode) {
                            case CODE.COMMON.SUCCESS:
                                {
                                    vm.data.interaction.response.userInfo = response.userInfo;
                                    if (vm.data.interaction.response.userInfo.isInvited == 1) {
                                        vm.data.info.search.isDisable = true;
                                    } else {
                                        vm.data.info.search.isDisable = false;
                                    }
                                    break;
                                }
                            default:
                                {
                                    vm.data.interaction.response.userInfo = null;
                                    break;
                                }
                        }
                    })
            }
        };

        /**
         * @function [功能函数] [text change]
         */
        vm.data.fun.check = function() {
            var template = {
                request: {
                    dbID: vm.data.interaction.request.dbID,
                    userName: vm.data.interaction.request.userName
                }
            }
            if (vm.data.info.timer.fun) {
                clearInterval(vm.data.info.timer.fun);
            }
            vm.data.info.search.submited = false;
            vm.data.info.timer.fun = setInterval(function() {
                if ($scope.sureForm.$valid) {
                    DatabaseResource.Partner.Search(template.request).$promise
                        .then(function(response) {
                            vm.data.info.search.submited = true;
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        vm.data.interaction.response.userInfo = response.userInfo;
                                        break;
                                    }
                                default:
                                    {
                                        vm.data.interaction.response.userInfo = null;
                                        break;
                                    }
                            }
                        })
                }
                clearInterval(vm.data.info.timer.fun);
            }, 1000);
        };

        /**
         * @function [初始化功能函数] [initialization]
         */
        vm.data.fun.init = (function() {
            var template = {
                request: { dbID: vm.data.interaction.request.dbID }
            }
            $scope.$emit('$WindowTitleSet', { list: [$filter('translate')('01010123'), $filter('translate')('01010124')] });
            DatabaseResource.Partner.Query(template.request).$promise.then(function(response) {
                switch (response.statusCode) {
                    case CODE.COMMON.SUCCESS:
                        {
                            vm.data.interaction.response.query = response.partnerList;
                            for (var i = 0; i < vm.data.interaction.response.query.length; i++) {
                                switch (vm.data.interaction.response.query[i].userType) { /*0 项目管理员；1 协助管理员；2 普通成员[读写]；3 普通成员[只读]*/
                                    case 0:
                                        {
                                            vm.data.interaction.response.adminQuery.push(vm.data.interaction.response.query[i]);
                                            if (vm.data.interaction.response.query[i].isNow == 1) {
                                                vm.data.info.power = 0;
                                            }
                                            vm.data.interaction.response.query.splice(i, 1);
                                            i--;
                                            break;
                                        }
                                    case 1:
                                        {
                                            vm.data.interaction.response.adminQuery.push(vm.data.interaction.response.query[i]);
                                            if (vm.data.interaction.response.query[i].isNow == 1) {
                                                vm.data.info.power = 1;
                                            }
                                            vm.data.interaction.response.query.splice(i, 1);
                                            i--;
                                            break;
                                        }
                                    default:
                                        {
                                            if (vm.data.interaction.response.query[i].isNow == 1) {
                                                vm.data.info.power = 2;
                                            }
                                        }
                                }
                            }
                            break;
                        }
                    default:
                        {
                            vm.data.interaction.response.query = [];
                            break;
                        }
                }
            });
        })()
    }
})();
