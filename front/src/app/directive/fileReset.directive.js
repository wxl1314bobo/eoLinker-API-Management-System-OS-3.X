(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [上传文件重置指令js] [Upload file reset command js]
     * @version  3.0.2
     * @service  $compile [注入$compile服务] [inject $compile service]
     */
    angular.module('eolinker.directive')

    .directive('fileResetDirective', ['$compile', function($compile) {
        return {
            restrict: 'A',
            transclude: true,
            replace: true,
            link: function($scope, elem, attrs, ctrl) {
                var data = {
                    fun: {
                        init: null, 
                        change: null 
                    }
                }
                /**
                 * @function [初始化功能函数] [initialization]
                 * @param    {[obj]}   _default [原生传参 Native parameters]
                 */
                data.fun.change = function(_default) {
                    elem[0].parentNode.replaceChild($compile(elem[0].outerHTML)($scope)[0], elem[0])
                    $scope.$apply();
                }

                /**
                 * @function [file按钮内容更改触发功能函数 file button contents change trigger]
                 */
                data.fun.init = (function() {
                    elem.bind(attrs.buttonFunction || 'click', data.fun.change);
                })()
            }
        };
    }]);
})();
