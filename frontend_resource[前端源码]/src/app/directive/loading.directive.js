(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [加载提示指令js] [Load the prompt command js]
     * @version  3.0.2
     */
    angular.module('eolinker.directive')

    .directive('loadDirective', [function() {
        return {
            restrict: 'A',
            transclude: true,
            replace: true,
            template: '<div class="loading-content" ng-hide="data.info.isEnd">' +
                '<div class="loading" >' +
                '<ul>' +
                '<li>' +
                '<div ><span class="iconfont  icon-loading"></span></div>{{\'320\'|translate}}' +
                '</li>' +
                '</ul>' +
                '</div>' +
                '</div>',
            scope: {
                loadDirective: '&',
                interaction: '<'
            },
            link: function($scope, elem, attrs, ctrl) {
                var data = {
                    interaction: $scope.interaction || { request: {}, response: {} },
                    fun: {
                        $Destory: null, 
                        init: null, 
                        dataProcessing: null, 
                        $LoadingInit: null 
                    },
                    info: {
                        broadcast: null
                    }
                }
                $scope.data = {
                    info: {
                        isEnd: true
                    }
                }

                /**
                 * @function [数据处理功能函数] [data processing]
                 * @param    {[obj]}   arg [页面传参 Page parameters] 
                 */
                data.fun.dataProcessing = function(arg) {
                    $scope.data.info.isEnd = false;
                    var template = {
                        promise: $scope.loadDirective({ arg: arg })
                    }
                    if (template.promise) {
                        template.promise.finally(function() {
                            $scope.data.info.isEnd = true;
                        })
                    } else {
                        $scope.data.info.isEnd = true;
                    }
                }
                /**
                 * @function [监听LoadingInit广播功能函数] [Listen to LoadingInit broadcast]
                 * @param    {[obj]}   _default [原生传参 Native parameters]
                 * @param    {[obj]}   arg      [页面传参 Page parameters]
                 */
                data.fun.$LoadingInit = function(_default, arg) {
                    data.fun.dataProcessing(arg);
                }

                /**
                 * @function [资源回收功能函数] [Recycle]
                 */
                data.fun.$Destory = function() {
                    data.info.broadcast();
                }

                /**
                 * @function [初始化功能函数] [initialization]
                 * @param    {[obj]}   arg      [页面传参 Page parameters]
                 */
                data.fun.init = (function(arg) {
                    if (!data.interaction.request.delay) {
                        data.fun.dataProcessing(arg);
                    }
                    data.info.broadcast = $scope.$on('$LoadingInit', data.fun.$LoadingInit);
                    $scope.$on('$destroy', data.fun.$Destory);
                })()

            }
        };
    }]);
})();
