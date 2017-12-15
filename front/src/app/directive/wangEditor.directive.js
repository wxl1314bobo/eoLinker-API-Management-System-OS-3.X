(function() {
    "use strict";
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [wangEditor相关函数js] [wangEditor Related Functions js]
     * @version  3.0.2
     * @service  $timeout [注入$timeout服务] [Inject $timeout service]
     * @service  $filter [注入过滤器服务] [Inject filter service]
     */
    angular.module('eolinker.directive')

    .directive("wangEditor", editorFn);

    editorFn.$inject = ['$timeout', '$filter']

    function editorFn($timeout, $filter) {

        return {
            restrict: 'AE',
            require: '?ngModel', //ng-model绑定wangEditor初始化数据 ng-model binding wangEditor initializes the data
            link: function($scope, element, attrs, ngModel) {
                var token = {
                    uptoken: '',
                    key: ''
                };
                var timer = null;

                function printLog(title, info) {
                    window.console && console.log(title, info);
                }

                var textarea = !!attrs.editId ? document.getElementById(attrs.editId) : document.getElementById('editor-js');
                var editor = new wangEditor(textarea); //初始化wangEditor Initialize wangEditor
                editor.config.menus = [
                    'source',
                    '|',
                    'bold',
                    'underline',
                    'italic',
                    'strikethrough',
                    'eraser',
                    //'forecolor',
                    //'bgcolor',
                    '|',
                    'quote',
                    //'fontfamily',
                    'fontsize',
                    'head',
                    'unorderlist',
                    'orderlist',
                    'alignleft',
                    'aligncenter',
                    'alignright',
                    '|',
                    'link',
                    'unlink',
                    'table',
                    '|',
                    // 'img',
                    'insertcode',
                    '|',
                    'undo',
                    'redo'
                ];
                editor.config.menuFixed = false;
                editor.create();

                /**
                 * @function [页面更改消除wangEditor] [Page changes eliminate wangEditor]
                 */
                $scope.$on('$stateChangeStart', function() { 
                    editor.destroy();
                })
                if (ngModel) {

                    /**
                     * @function [ngModel.$render ng-model值发生变化时执行函数] [ngmodod. $ render ng-model The function is executed when the value changes]
                     */
                    ngModel.$render = function() { 
                        try {
                            if (!!ngModel.$viewValue) {
                                editor.$txt.html($filter('XssFilter')(ngModel.$viewValue));
                            } else {
                                ngModel.$setViewValue("");
                            }
                        } catch (e) {

                        }
                    };

                    /**
                     * @function [wangEditor 内容更改执行功能函数] [wangEditor content change execution function function]
                     */
                    editor.onchange = function() { 
                        timer = $timeout(function() {
                            ngModel.$setViewValue(editor.$txt.html());
                        }, 0, true)
                    };
                }

                /**
                 * @function [页面更改消除计时器] [The page changes the elimination timer]
                 */
                $scope.$on('$destroy', function() { 
                    if (timer) {
                        $timeout.cancel(timer);
                    }
                });

                /**
                 * @function [重置wangEditor] [Reset wangEditor]
                 */
                $scope.$on('$resetWangEditor', function() { 
                    if (editor) {
                        editor.$txt.html('');
                    }
                });
            }
        }

    };

})();
