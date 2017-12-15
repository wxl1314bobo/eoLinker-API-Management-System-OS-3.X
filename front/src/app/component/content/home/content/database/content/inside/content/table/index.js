(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [数据库内页列表（list）模块相关js] [Database inner page list (list) module related js]
     * @version  3.0.2
     */
    angular.module('eolinker')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('home.database.inside.table', {
                    url: '/table',
                    template: '<database-table power-object="$ctrl.data.info.powerObject"></database-list>'
                });
        }])
        .component('databaseTable', {
            templateUrl: 'app/component/content/home/content/database/content/inside/content/table/index.html',
            bindings: {
                powerObject: '<'
            },
            controller: databaseTableCtroller
        })

    databaseTableCtroller.$inject = [];

    function databaseTableCtroller() {
        var vm = this;
    }
})();
