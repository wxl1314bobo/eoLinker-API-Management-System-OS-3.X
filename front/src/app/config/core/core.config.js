(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [核心配置模块] Core configuration module
     * @version  3.0.2
     * @service  $controllerProvider [注入控制器服务] [inject controller service]
     * @service  $compileProvider [注入$compileProvider服务] [inject $compileProvider service]
     * @service  $filterProvider [注入过滤器服务] [inject $filterProvider service]
     * @service  $provide [注入服务] [inject $provide service]
     */
    angular
        .module('eolinker')
        .config(coreConfig);

    coreConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide'];
    function coreConfig($controllerProvider, $compileProvider, $filterProvider, $provide) {

        var data = {
            info: {
                core: angular.module('eolinker')
            }
        };

        // registering components 
        data.info.core.controller = $controllerProvider.register; 
        data.info.core.directive = $compileProvider.directive;
        data.info.core.filter = $filterProvider.register;
        data.info.core.factory = $provide.factory;
        data.info.core.service = $provide.service;
        data.info.core.constant = $provide.constant;
        data.info.core.value = $provide.value;

    }

})();
