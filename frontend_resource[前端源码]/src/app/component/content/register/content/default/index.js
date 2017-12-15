(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [注册页相关指令js] [Registration page related instructions js]
     * @version  3.0.2
     * @service  $scope [注入作用域服务] [inject scope service]
     * @service  $rootScope [注入根作用域服务] [inject rootScope service]
     * @service  CommonResource [注入通用接口服务] [inject common API service]
     * @service  $state [注入路由服务] [inject state service]
     * @service  md5 [注入md5服务] [inject md5 service]
     * @service  $filter [注入过滤器服务] [inject filter service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
    angular.module('eolinker')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('register.default', {
                    url: '/',
                    auth: true,
                    template: '<register-default></register-default>'
                });
        }])
        .component('registerDefault', {
            templateUrl: 'app/component/content/register/content/default/index.html',
            controller: registerDefaultController
        })

    registerDefaultController.$inject = ['$scope', '$rootScope', 'CommonResource', '$state', 'md5', '$filter', 'CODE'];

    function registerDefaultController($scope, $rootScope, CommonResource, $state, md5, $filter, CODE) {

        var vm = this;
        var code = CODE.COMMON.SUCCESS;
        vm.data = {
            info: {
                submited: false,
                eye: false,
                alert: $filter('translate')('03014')
            },
            interaction: {
                request: {
                    userName: '',
                    userPassword: '',
                    userNickName: '',
                }
            },
            fun: {
                check: null, 
                init: null, 
                $destory: null, 
                confirm: null, 
                changeView: null, 
            }
        }

        /**
         * @function [查重功能函数] [Check repeat]
         */
        vm.data.fun.check = function() {
            var template = {
                request: {
                    userName: vm.data.interaction.request.userName
                }
            }
            if (template.request.userName != '') {
                CommonResource.GuestRegister.Check(template.request)
                    .$promise.then(function(response) {
                        switch (response.statusCode) {
                            case CODE.COMMON.SUCCESS:
                                {
                                    vm.data.info.unavailable = false;
                                    vm.data.info.alert = $filter('translate')('03015');
                                    break;
                                }
                            case CODE.USER.EXIST:
                                {
                                    vm.data.info.unavailable = true;
                                    vm.data.info.alert = $filter('translate')('03016');
                                    break;
                                }
                            default:
                                {
                                    vm.data.info.unavailable = true;
                                    vm.data.info.alert = $filter('translate')('03014');
                                    break;
                                }
                        }
                    })
            } else {
                vm.data.info.unavailable = false;
            }
        }

        /**
         * @function [是否显示密码功能函数] [Whether to display the password]
         */
        vm.data.fun.changeView = function() {
            vm.data.info.eye = !vm.data.info.eye;
        }

        /**
         * @function [确认注册功能函数] [register]
         */
        vm.data.fun.confirm = function() {
            var template = {}
            if (!vm.data.info.unavailable) {
                template.request = {
                    userName: vm.data.interaction.request.userName,
                    userPassword: md5.createHash(vm.data.interaction.request.userPassword),
                    userNickName: vm.data.interaction.request.userNickName,
                }
                if ($scope.registerForm.$valid) {
                    CommonResource.GuestRegister.Name(template.request).$promise.then(function(response) {
                        switch (response.statusCode) {
                            case CODE.COMMON.SUCCESS:
                                {
                                    $rootScope.InfoModal($filter('translate')('03017'), 'success', function(data) {
                                        $state.go('index');
                                    });
                                    break;
                                }
                            case CODE.USER.ILLIGLE_PASSWORD:
                                {
                                    $scope.registerPhoneForm.phonePassword.$invalid = true;
                                    $rootScope.InfoModal($filter('translate')('03018'), 'error');
                                    break;
                                }
                            default:
                                {
                                    vm.data.info.submited = true;
                                    $rootScope.InfoModal($filter('translate')('03019'), 'error');
                                    break;
                                }
                        }
                    })
                } else {
                    vm.data.info.submited = true;
                }
            }
        }

        /**
         * @function [初始化功能函数] [initialization]
         */
        vm.data.fun.init = (function() {
            $scope.$emit('$WindowTitleSet', { list: [$filter('translate')('03020')] });
            $scope.$on('$stateChangeStart', vm.data.fun.$destory);
        })();
    }
})();
