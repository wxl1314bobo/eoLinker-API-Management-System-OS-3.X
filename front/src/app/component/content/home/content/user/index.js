(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [账号管理外页相关指令js] [Account management outside page related instructions js]
     * @version  3.0.2
     */
    angular.module('eolinker')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('home.user', {
                    url: '/user',
                    template: '<div class="home-content home-content-user">' +
                        '    <div class="home-div">' +
                        '        <div class="home-content-user-content" ui-view></div>' +
                        '    </div>' +
                        '</div>'
                });
        }])
})();