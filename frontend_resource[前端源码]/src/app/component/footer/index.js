(function() {
	'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [footer组件定义js] [footer component definition js]
     * @version  3.0.2
     */
    angular.module('eolinker')
    .component('eoFooter',{
            templateUrl: 'app/component/footer/index.html',
            controller: eoFooterController
        })

    eoFooterController.$inject = []

    function eoFooterController() {
        var vm = this;
    }

})();
