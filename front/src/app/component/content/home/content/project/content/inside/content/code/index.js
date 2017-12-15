(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [状态码外页模块相关js] [Status code outer page module related js]
     * @version  3.0.2
     */
    angular.module('eolinker')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('home.project.inside.code', {
                    url: '/code',
                    template: '<home-project-inside-code power-object="$ctrl.data.info.powerObject"></home-project-inside-code>'
                });
        }])
        .component('homeProjectInsideCode', {
            templateUrl: 'app/component/content/home/content/project/content/inside/content/code/index.html',
            bindings: {
                powerObject: '<'
            },
            controller: homeProjectInsideCodeController
        })

    homeProjectInsideCodeController.$inject = [];

    function homeProjectInsideCodeController() {

        var vm = this;
        
    }
})();
