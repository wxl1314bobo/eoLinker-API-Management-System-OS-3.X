(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [项目内页模块相关js] [Project inside page module related js]
     * @version  3.0.2
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  ApiManagementResource [注入接口管理接口服务] [inject ApiManagement API service]
     * @service  $state [注入路由服务] [Injection state service]
     * @service  ProjectService [注入ProjectService服务] [Injection ProjectService service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
    angular.module('eolinker')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('home.project.inside', {
                    url: '/inside?projectName?projectID',
                    template: '<home-project-inside></home-project-inside>',
                    resolve: helper.resolveFor('CLIPBOARD')
                });
        }])
        .component('homeProjectInside', {
                templateUrl: 'app/component/content/home/content/project/content/inside/index.html',
                controller: homeProjectInsideController
            })

    homeProjectInsideController.$inject = ['$scope', 'ApiManagementResource', '$state', 'ProjectService', 'CODE'];

    function homeProjectInsideController($scope, ApiManagementResource, $state, ProjectService, CODE) {

        var vm = this;
        var code = CODE.COMMON.SUCCESS;
        vm.info = {
            apiName: '',
            groupName: '',
            readWrite: true,
            projectID: $state.params.projectID
        };
        vm.projectDetail = {
            projectName: $state.params.projectName
        }
        vm.data = {
            info: {
                shrinkObject: {},
                powerObject: {}
            },
            fun: {
                init: null,
            }
        }

        /**
         * @function [初始化功能函数] [initialization]
         */
        vm.data.fun.init = function() {
            $scope.$emit('$Home_ShrinkSidebar',{shrink:false});
            ProjectService.detail.set(null);
            ApiManagementResource.Project.Detail({ projectID: vm.info.projectID }).$promise.then(function(data) {
                if (code == data.statusCode) {
                    vm.data.info.powerObject.readWrite = (data.userType < 3);
                    ProjectService.detail.set(data);
                    $scope.$broadcast('$initProjectInfo');
                }
            })
        }
        vm.data.fun.init();

        /**
         * @function [路由转换重置项目信息] [The route translation resets the project information]
         */
        $scope.$on('$stateChangeStart', function() {
            ProjectService.detail.set({ reset: true });
        });
    }
})();
