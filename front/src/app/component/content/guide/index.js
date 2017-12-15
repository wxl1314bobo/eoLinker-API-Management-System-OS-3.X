(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [安装引导页外模块] [Install the boot page outside the module]
     * @version  3.0.2
     */
    angular.module('eolinker')
        .config(['$stateProvider','RouteHelpersProvider', function($stateProvider,helper) {
            $stateProvider
                .state('guide', {
                    url: '/guide',
                    template: '<guide></guide>',
                    auth: true // 页面权限，值为true时在未登录状态可以显示页面，默认为假 When the value is true, the page can be displayed without login. The default is false
                });
        }])
        .component('guide', {
            templateUrl: 'app/component/content/guide/index.html',
            controller: guideCtroller
        })

    guideCtroller.$inject = [];
    
    function guideCtroller() {

        var vm = this;
    }
})();