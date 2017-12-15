(function() {
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [项目列表外页相关服务js] [Item List Outside Page Related Services js]
     * @version  3.0.2
     */
    'use strict';
    angular.module('eolinker')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('home.project.api', {
                    url: '/api',
                    template: '<home-project-api></home-project-api>'
                });
        }])
        .component('homeProjectApi', {
            templateUrl: 'app/component/content/home/content/project/content/api/index.html',
            controller: indexController
        })

    indexController.$inject = [];

    function indexController() {
        var vm = this;
        vm.data = {
        }
    }
})();
