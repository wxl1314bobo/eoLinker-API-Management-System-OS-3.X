(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [登录页相关指令js] [Login page related instructions js]
     * @version  3.0.2
     * @service  $cookies [注入$cookies服务] [inject cookies service]
     * @service  $scope [注入作用域服务] [inject scope service]
     * @service  $rootScope [注入根作用域服务] [inject rootScope service]
     * @service  CommonResource [注入通用接口服务] [inject common API service]
     * @service  $state [注入路由服务] [inject state service]
     * @service  md5 [注入md5服务] [inject md5 service]
     * @service  $filter [注入过滤器服务] [inject filter service]
     * @constant COOKIE_CONFIG [注入COOKIE_CONFIG常量] [inject COOKIE_CONFIG constant service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
    angular.module('eolinker')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('index', {
                    url: '/index',
                    auth: true,
                    template: '<index></index>'
                });
        }])
        .component('index', {
            templateUrl: 'app/component/content/index/index.html',
            controller: loginController
        })

    loginController.$inject = ['$cookies', '$scope', '$rootScope', 'CommonResource', '$state', 'md5', 'NavbarService', '$filter', 'COOKIE_CONFIG', 'CODE'];

    function loginController($cookies, $scope, $rootScope, CommonResource, $state, md5, NavbarService, $filter, COOKIE_CONFIG, CODE) {

        var vm = this;
        vm.data = {
            service: NavbarService,
            info: {
                submitted: false,
                password: {
                    isShow: false
                },
                isRemember: false
            },
            interaction: {
                request: {
                    loginName: '',
                    loginPassword: '',
                }
            },
            fun: {
                init: null, 
                confirm: null, 
                changeView: null 
            }
        }

        /**
         * @function [确认是否已登录功能函数] [Confirm if you are logged in]
         */
        vm.data.fun.confirm = function() {
            var template = {
                storage: {
                    loginName: vm.data.interaction.request.loginName,
                    loginPassword: vm.data.interaction.request.loginPassword
                },
                request: {
                    loginName: vm.data.interaction.request.loginName,
                    loginPassword: md5.createHash(vm.data.interaction.request.loginPassword),
                }
            }

            if ($scope.loginForm.$valid) {
                vm.data.info.submitted = false;
                $cookies.put("verifyCode", template.request.verifyCode, COOKIE_CONFIG);
                CommonResource.Guest.Login(template.request).$promise.then(function(response) {
                    switch (response.statusCode) {
                        case CODE.COMMON.SUCCESS:
                            {
                                if (vm.data.info.isRemember) {
                                    window.localStorage.setItem('LOGININFO', angular.toJson(template.storage));
                                } else {
                                    window.localStorage.removeItem('LOGININFO');
                                }
                                $state.go('home.project.api.default');
                                break;
                            }
                        default:
                            {
                                $rootScope.InfoModal($filter('translate')('0206'), 'error');
                                break;
                            }
                    }
                })
            } else {
                vm.data.info.submitted = true;
            }
        }

        /**
         * @function [密码是否显示功能函数] [Whether the password is displayed]
         */
        vm.data.fun.changeView = function() {
            if (vm.data.interaction.request.loginPassword) {
                vm.data.info.password.isShow = !vm.data.info.password.isShow;
            }
        }

        /**
         * @function [初始化功能函数] [initialization]
         */
        vm.data.fun.init = (function() {
            var template = {
                interaction: {
                    request: JSON.parse(window.localStorage['LOGININFO'] || '{}')
                }
            }
            CommonResource.Install.Config().$promise.then(function(response) {
                switch (response.statusCode) {
                    case CODE.COMMON.SUCCESS:
                        {
                            $scope.$emit('$WindowTitleSet', { list: [$filter('translate')('0203')] });
                            if (window.localStorage['LOGININFO']) {
                                try {
                                    vm.data.interaction.request.loginName = template.interaction.request.loginName;
                                    vm.data.interaction.request.loginPassword = template.interaction.request.loginPassword;
                                    vm.data.info.isRemember = true;
                                } catch (e) {
                                    vm.data.info.isRemember = false;
                                }
                            }
                            break;
                        }
                    default:
                        {
                            $state.go('guide.lang');
                            break;
                        }
                }
            })
        })()
    }
})();
