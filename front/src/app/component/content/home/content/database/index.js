(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [数据库外页相关指令js] [Database outer page related instructions js]
     * @version  3.0.2
     */
    angular.module('eolinker')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('home.database', {
                    url: '/database',
                    template: '<div class="home-content home-content-database">' +
                        '    <div class="home-div">' +
                        '        <div class="home-content-database-content" ui-view></div>' +
                        '    </div>' +
                        '</div>'
                });
        }])
})();