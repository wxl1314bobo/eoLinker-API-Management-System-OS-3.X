(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [语言选择页] [Language selection page]
     * @version  3.0.2
     * @service  CommonResource [注入通用接口服务] [inject common API service]
     * @service  $state [注入路由服务] [inject $state service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
    angular.module('eolinker')
        .config(['$stateProvider','RouteHelpersProvider', function($stateProvider,helper) {
            $stateProvider
                .state('guide.lang', {
                    url: '/lang',
                    template: '<lang></lang>',
                    auth: true // 页面权限，值为true时在未登录状态可以显示页面，默认为假 When the value is true, the page can be displayed without login. The default is false
                });
        }])
        .component('lang', {
            templateUrl: 'app/component/content/guide/lang/index.html',
            controller: langCtroller
        })
    langCtroller.$inject = ['CommonResource', '$state', '$translate' ,'CODE'];
    
    function langCtroller(CommonResource, $state, $translate ,CODE) {
        var vm = this;
        vm.data = {
            fun: {
                init: null,
                lang: null
            }
        }
        /**
         * @function [初始化功能函数，检测是否已安装，若已安装则跳转首页] [Initialize, check whether it is installed, if it is installed, jump home page]
         */
        vm.data.fun.init = function() {
            CommonResource.Install.Config().$promise.then(function(data) {
                if (data.statusCode == CODE.COMMON.SUCCESS) {
                    $state.go('index');
                }
            });
        }
        vm.data.fun.init();

        /**
         * @function [设置语言功能函数] [Setting language]
         */
        vm.data.fun.lang = function(arg) {
           $translate.use(arg.lang);
           window.localStorage.lang = arg.lang;
           window.location.reload();
           $state.go('guide.first_step');
        }
    }
})();