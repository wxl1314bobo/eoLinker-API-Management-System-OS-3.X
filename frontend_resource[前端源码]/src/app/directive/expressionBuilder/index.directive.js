(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [表达式构造器指令js] [Expression constructor instruction JS]
     * @version  3.0.2
     * @service  $compile [注入$compile服务] [inject $compile service]
     * @service  $filter [注入过滤器服务] [inject filter service]
     * @constant EXPRESSION_BUILDER_CONSTANT [注入表达式构造器相关常量集] [inject Expression constructor correlation service]
     * @param    expressionBuilderDirective [传入函数] [Afferent function]
     * @param    interaction [交互参数] [Interaction parameter]
     */
    angular.module('eolinker.directive')
    .directive('expressionBuilderDirective', ['$compile', '$filter', 'EXPRESSION_BUILDER_CONSTANT', function($compile, $filter, EXPRESSION_BUILDER_CONSTANT) {
        return {
            restrict: 'AE',
            transclude: true,
            templateUrl: 'app/directive/expressionBuilder/index.html',
            scope: {
                expressionBuilderDirective:'&',
                interaction: '<' 
            },
            link: function($scope, elem, attrs, ctrl) {
                $scope.data = {
                    constant: {
                        cipher: EXPRESSION_BUILDER_CONSTANT.CIPHER,
                        output: EXPRESSION_BUILDER_CONSTANT.OUTPUT,
                        quotes: EXPRESSION_BUILDER_CONSTANT.QUOTES
                    },
                    info: {
                        item: {
                            hmac: {
                                cipher: 'SHA1',
                                secret: '',
                                output: 'Base64'
                            },
                            sha: {
                                cipher: 'SHA1',
                                output: 'Base64'
                            },
                            string: {
                                quotes: '"'
                            },
                            substring: {
                                start: '0',
                                end: ''
                            },
                            concat: {
                                content: ''
                            }
                        },
                        method: {
                            currentShowItem: -1
                        }
                    },
                    interaction: {},
                    fun: {
                        init: null,
                        methodSelect: null,
                        methodDelete: null,
                        methodShow: null,
                        set:null,
                        cancel:null,
                        concat:null
                    }
                }

                /**
                 * @function [初始化功能函数] [Initialization]
                 */
                $scope.data.fun.init = function() {
                    var template={
                        interaction:{},
                        html: ''
                    }
                    angular.copy($scope.interaction||{
                        request:{},
                        response:{}
                    },template.interaction);
                    $scope.data.interaction=template.interaction;
                    $scope.data.interaction.request.staticItem=$scope.data.interaction.request.staticItem||{
                        random:{
                            min:0,
                            max:100
                        }
                    };
                    $scope.data.interaction.request.methodList=$scope.data.interaction.request.methodList||[];
                    $scope.data.interaction.response.resultList = $scope.data.interaction.response.resultList || [];
                    $scope.data.interaction.response.indexList = $scope.data.interaction.response.indexList || [];
                    if($scope.data.interaction.response.indexList[0]==4){
                        $scope.data.interaction.response.resultList[0]='constantFilter: \''+$scope.data.interaction.request.constant+'\'';
                    }
                    template.html=$scope.data.interaction.response.resultList.length>0?'<span>{{"" |' + $scope.data.interaction.response.resultList.join(' | ') + '}}</span>':'<span></span>';
                    angular.element(document.getElementById('expression-builder-directive-result-js')).append($compile(template.html)($scope));
                }
                $scope.data.fun.init();

                /**
                 * @function [method菜单选择功能函数] [Method menu selection function]
                 * @param    {[obj]}   arg [{$index:表达式列表序号 Expression list number,itemIndex:操作列表项 Operation list item,key:过滤器表达式 Filter expression}]
                 */
                $scope.data.fun.methodSelect = function(arg) {
                    var template = {
                        methodItem: {},
                        html: ''
                    }
                    if ($scope.data.interaction.response.resultList.length <= arg.$index) {
                        $scope.data.interaction.response.resultList.push(arg.key);
                        $scope.data.interaction.response.indexList.push(arg.itemIndex);
                        angular.copy($scope.data.info.item, template.methodItem);
                        $scope.data.interaction.request.methodList.push(template.methodItem);
                        $scope.data.info.method.currentShowItem=-1;
                    } else {
                        $scope.data.interaction.response.resultList[arg.$index] = arg.key;
                        $scope.data.interaction.response.indexList[arg.$index] = arg.itemIndex;
                    }
                    template.html = '<span>{{"" |' + $scope.data.interaction.response.resultList.join(' | ') + '}}</span>';
                    angular.element(document.getElementById('expression-builder-directive-result-js')).empty();
                    angular.element(document.getElementById('expression-builder-directive-result-js')).append($compile(template.html)($scope));
                }

                /**
                 * @function [method菜单删除功能函数] [Method menu deletion function]
                 * @param    {[obj]}   arg [{$index:表达式列表序号 Expression list number}]
                 */
                $scope.data.fun.methodDelete = function(arg) {
                    $scope.data.interaction.response.resultList.splice(arg.$index, 1);
                    $scope.data.interaction.response.indexList.splice(arg.$index, 1);
                    $scope.data.interaction.request.methodList.splice(arg.$index, 1);
                    $scope.data.info.method.currentShowItem=-1;
                    var template = {
                        methodItem: {},
                        response: '<span>{{"" |' + $scope.data.interaction.response.resultList.join(' | ') + '}}</span>'
                    }
                    angular.element(document.getElementById('expression-builder-directive-result-js')).empty();
                    angular.element(document.getElementById('expression-builder-directive-result-js')).append($compile(template.response)($scope));
                }

                /**
                 * @function [菜单视图显示功能函数] [Menu view display function]
                 * @param    {[obj]}   arg [{$index:表达式列表序号 Expression list number}]
                 */
                $scope.data.fun.methodShow = function(arg) {
                    $scope.data.info.method.currentShowItem = arg.$index;
                }

                /**
                 * @function [拼接原始值、构造功能函数] [Splicing raw values and constructing functional functions]
                 */
                $scope.data.fun.concat = function() {
                    $scope.data.interaction.response.result=$scope.data.interaction.request.constant+document.getElementById('expression-builder-directive-result-js').innerText;
                    $scope.expressionBuilderDirective({callback:$scope.data.interaction});
                }

                /**
                 * @function [确定构造功能函数] [Determination of structural function]
                 */
                $scope.data.fun.set = function() {
                    $scope.data.interaction.response.result=document.getElementById('expression-builder-directive-result-js').innerText;
                    $scope.expressionBuilderDirective({callback:$scope.data.interaction});
                }

                /**
                 * @function [取消当前构造功能函数] [Cancel the current construction function]
                 */
                $scope.data.fun.cancel = function() {
                    $scope.expressionBuilderDirective({callback:$scope.interaction});

                }
            }
        };
    }]);
})();
