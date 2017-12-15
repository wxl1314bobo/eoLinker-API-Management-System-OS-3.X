(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [消息外页相关指令js] [Message Outside page related instructions js]
     * @version  3.0.2
     */
    angular.module('eolinker')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('home.news', {
                    url: '/news',
                    template: '<div class="home-content home-content-news">' +
                        '    <div class="home-div">' +
                        '        <div class="home-content-news-content" ui-view></div>' +
                        '    </div>' +
                        '</div>'
                });
        }])
})();