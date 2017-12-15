(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [提交表单禁用button按钮指令js] [Submit form to disable button button instruction JS]
     * @version  3.0.2
     * @param    buttonSetDisableDirective [绑定设置回调函数] [Binding setting callback function]
     */
    angular.module('eolinker.directive')

    .directive('buttonSetDisableDirective', [function() {
        return {
            restrict: 'AE',
            scope: {
                buttonSetDisableDirective: '&' 
            },
            link: function($scope, elem, attrs, ctrl) {
                var data = {
                    fun: {
                        init: null, 
                        btnFun: null 
                    }
                }
                /**
                 * @function [按钮相关功能函数] [Button related function]
                 */
                data.fun.btnFun = function() {
                    var template = {
                        promise: $scope.buttonSetDisableDirective()
                    }
                    elem.prop('disabled', true);
                    if (template.promise) {
                        template.promise.finally(function() {
                            elem.prop('disabled', false);
                        })
                    } else {
                        elem.prop('disabled', false);
                        $scope.$apply();
                    }
                }

                /**
                 * @function [初始化功能函数] [Initialization]
                 */
                data.fun.init = (function() {
                    elem.bind(attrs.buttonFunction || 'click', data.fun.btnFun);
                })()
            }
        };
    }]);
})();
