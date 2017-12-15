(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [api外页相关服务js] [api outside page related services js]
     * @version  3.0.2
     */
    angular.module('eolinker')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('home.project', {
                    url: '/project',
                    template: '<div class="home-content home-content-project">' +
                        '    <div class="home-div">' +
                        '        <div class="home-content-project-content" ui-view></div>' +
                        '    </div>' +
                        '</div>'
                });
        }])
})();