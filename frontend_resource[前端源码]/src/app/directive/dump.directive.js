(function() {
    'use strict';
     /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [导出文件指令js] [Export the file instructions js]
     * @version  3.0.2
     * @param    interaction [交互参数] [Interactive parameters]
     * @param    dumpDirective [绑定设置回调函数] [Bind Set the callback function]
     */
    angular.module('eolinker.directive')

    .directive('dumpDirective', [function() {
        return {
            restrict: 'A',
            transclude: true,
            template: '<a class="eo-export" data-ng-click="data.fun.dump()"><p>{{interaction.request.text}}</p></a><div load-directive="dumpDirective(arg)" interaction="{request:{delay:true}}"></div>',
            scope: {
                interaction: '<',
                dumpDirective: '&'
            },
            link: function($scope, elem, attrs, ctrl) {
                $scope.data = {
                    info: {
                        elem: document.getElementById('dump-directive_js')
                    },
                    fun: {
                        dump: null, 
                    }
                }
                var data = {
                    info: {
                        broadcast: null
                    },
                    fun: {
                        init: null, 
                        $DumpDirective_Click: null, 
                        $Destory: null, 
                    }
                }

                /**
                 * @function [导出功能函数] [Export]
                 */
                $scope.data.fun.dump = function() {
                    $scope.$broadcast('$LoadingInit', { arg: { switch: $scope.interaction.request.switch } }); //switch导出结果存储方式（0：.export ，1：.html文件夹 2：.pdf）
                }

                /**
                 * @function [导出监听请求返回功能函数] [Export the monitor request to return]
                 * @param    {[obj]}   _default [原生传参] [Native parameters]
                 * @param    {[obj]}   arg      [{response:后台返回数据 Backstage returns data}]
                 */
                data.fun.$DumpDirective_Click = function(_default, arg) { 
                    $scope.data.info.elem.href = './server/dump/' + arg.response.fileName;
                    $scope.data.info.elem.download = arg.response.fileName;
                    $scope.data.info.elem.click();
                }

                /**
                 * @function [资源回收] [Recycle]
                 */
                data.fun.$Destory = function() {
                    data.info.broadcast();
                }

                /**
                 * @function [初始化功能函数] [初始化]
                 */
                data.fun.init = (function() {
                    $scope.interaction=$scope.interaction||{request:{}};
                    data.info.broadcast = $scope.$on('$DumpDirective_Click_' + ($scope.interaction.request.switch||''), data.fun.$DumpDirective_Click);
                    $scope.$on('$destroy', data.fun.$Destory);
                })()
            }
        };
    }]);
})();
