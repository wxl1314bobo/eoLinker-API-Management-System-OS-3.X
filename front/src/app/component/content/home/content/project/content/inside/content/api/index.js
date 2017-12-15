(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [api内页相关服务js] [api page related services js]
     * @version  3.0.2
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $state [注入路由服务] [Injection state service]
     * @service  HomeProject_Service [注入HomeProject_Service服务] [Injection HomeProject_Service service]
     */
    angular.module('eolinker')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('home.project.inside.api', {
                    url: '/api',
                    template: '<home-project-inside-api power-object="$ctrl.data.info.powerObject"></home-project-inside-api>'
                });
        }])
        .component('homeProjectInsideApi', {
            templateUrl: 'app/component/content/home/content/project/content/inside/content/api/index.html',
            bindings: {
                powerObject: '<'
            },
            controller: homeProjectInsideApiController
        })

    homeProjectInsideApiController.$inject = ['$scope', '$state', 'HomeProject_Service'];

    function homeProjectInsideApiController($scope, $state, HomeProject_Service) {
        var vm = this;
        vm.data = {
            service:{
                home:HomeProject_Service,
            },
            info: {
                status:0
            },
            fun: {
                init: null 
            },
            assistantFun:{
                init:null
            }
        }

        /**
         * @function [辅助初始化功能函数] [Auxiliary initialization]
         */
        vm.data.assistantFun.init=function(){
            vm.data.service.home.envObject.fun.resetObject();
            switch ($state.current.name) {
                case 'home.project.inside.api.list':
                case 'home.project.inside.api.edit':
                    {
                        vm.data.service.home.apiTestObject.fun.clear();
                        break;
                    }
            }
            switch ($state.current.name) {
                case 'home.project.inside.api.list':
                case 'home.project.inside.api.detail':
                case 'home.project.inside.api.test':
                    {
                        vm.data.info.status=0;
                        break;
                    }
                default:
                    {
                        vm.data.info.status = -1;
                        break;
                    }
            }
        }

        /**
         * @function [路由转换函数，检测是否该显示环境变量] [A route conversion function that detects whether the environment variable is displayed]
         */
        $scope.$on('$stateChangeSuccess', function() { 
            
            vm.data.assistantFun.init();
        });

        /**
         * @function [初始化功能函数] [initialization]
         */
        vm.data.fun.init = (function() {
            vm.data.assistantFun.init();
        })()
    }
})();
