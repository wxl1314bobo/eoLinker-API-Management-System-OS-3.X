(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [环境变量指令js] [Environment variable instruction js]
     * @version  3.0.2
     * @service  $sce [注入$sce服务] [inject $sce service]
     * @service  $state [注入路由服务] [inject state service]
     * @service  $timeout [注入$timeout服务] [inject $timeout service]
     * @service  $filter [注入过滤器服务] [inject filter service]
     * @param    version [版本管理] [Version management]
     * @param    envModel [model页面相应内容] [The corresponding content of the model page]
     * @param    envQueryInit [env list页相应返回显示apiURI函数] [The env list page returns the apiURI function]
     * @param    envParam [环境变量全局参数绑定数组] [Environment variable global parameter binding array]
     */
    angular.module('eolinker.directive')

    .directive('enV', ['ApiManagementResource', '$sce', '$state', '$timeout', '$filter', function(ApiManagementResource, $sce, $state, $timeout, $filter) {
        return {
            restrict: 'A',
            translateclude: true,
            template: '<div class="eo-env" ><div style="display:inline-block;" class="en-v-li"  ng-mouseleave="data.info.isShow=false"><ul>' +
                '<li class="child-input-li"  data-ng-click="data.info.isShow=true">' +
                '<input style="height:30px;" class="eo-input" placeholder="{{\'310\'|translate}}" type="text" data-ng-model="data.info.isModel.envName" readonly>' +
                '<label class="iconfont icon-xiangxia" style="color:#333;height:30px;line-height:30px;"></label>' +
                '</li>' +
                '<li class="absolute enV-child-li" ng-class="{hidden:!data.info.isShow}">' +
                '<ul class="message-ul">' +
                '<li class="list-li" data-ng-click="data.fun.isClick(null)">{{\'311\'|translate}}</li>' +
                '<li class="list-li" ng-repeat="query in data.info.envQuery track by $index" data-ng-click="data.fun.isClick(query)">' +
                '{{query.envName}}' +
                '</li>' +
                '</ul>' +
                '</li>' +
                '</ul></div></div>',
            scope: {
                version: '@', 
                envModel: '=', 
                envQueryInit: '=', 
                envParam: '=' 
            },
            link: function($scope, elem, attrs, ctrl) {
                $scope.data = {
                    info: {
                        envQuery: null,
                        isModel: {},
                        isShow: false,
                        template: {
                            envItem: null
                        }
                    },
                    fun: {
                        isClick: null
                    }
                }
                var data = {
                    storage: {},
                    info: {
                        reset: false,
                        status: 0,
                        param: '',
                        result: '',
                        header: '',
                        uri: ''
                    },
                    interaction: {
                        request: {
                            projectID: $state.params.projectID,
                        }
                    },
                    fun: {
                        initMessage: null,
                        init: null,
                    }
                }
                var timer = null;

                /**
                 * @function [接口列表页初始化环境变量功能函数] [The interface list page initializes the environment variable]
                 * @param    {[string]}   attr [接口uri API uri]
                 * @return   {[string]}        [接口uri API uri]
                 */
                $scope.envQueryInit = function(attr) {
                    
                    return attr;
                };

                /**
                 * @function [辅助初始化功能函数] [Auxiliary initialization]
                 */
                data.fun.initMessage = function() {
                    var envItem = null;
                    if (data.storage[data.interaction.request.projectID]) {
                        for (var key = 0; key < $scope.data.info.envQuery.length; key++) {
                            var val = $scope.data.info.envQuery[key];
                            if (val.envID == data.storage[data.interaction.request.projectID]) {
                                envItem = $scope.data.info.template.envItem = val;
                                break;
                            }
                        }
                    }
                    $scope.envParam = envItem ? envItem.paramList : [];
                    if (envItem) {
                        $scope.data.info.isModel = envItem;

                        switch (data.info.status) {
                            case 0:
                                {
                                    if (envItem.frontURIList.length > 0) {
                                        $scope.envQueryInit = function(attr) {
                                            var result = attr;
                                            angular.forEach(envItem.paramList, function(val, key) {
                                                result = result.replace(eval('/(\\\{\\\{' + val.paramKey + '\\\}\\\})/g'), val.paramValue)
                                            })
                                            return envItem.frontURIList[0].uri + result;
                                        };
                                    } else {
                                        $scope.envQueryInit = function(attr) {
                                            var result = attr;
                                            angular.forEach(envItem.paramList, function(val, key) {
                                                result = result.replace(eval('/(\\\{\\\{' + val.paramKey + '\\\}\\\})/g'), val.paramValue)
                                            })
                                            return result;
                                        };
                                    }
                                    break;
                                }
                            case 1:
                                {
                                    var result = null;
                                    data.info.result = data.info.param;
                                    if (envItem.paramList.length > 0) {
                                        var templateResult = {};
                                        angular.copy(angular.fromJson(data.info.param), templateResult);
                                        angular.forEach(envItem.paramList, function(val, key) {
                                            templateResult.baseInfo.apiURI = templateResult.baseInfo.apiURI.replace(eval('/(\\\{\\\{' + val.paramKey + '\\\}\\\})/g'), val.paramValue);
                                            angular.forEach(templateResult.headerInfo, function(val1, key1) {
                                                val1.headerName = val1.headerName.replace(eval('/(\\\{\\\{' + val.paramKey + '\\\}\\\})/g'), val.paramValue);
                                            })
                                            angular.forEach(templateResult.requestInfo, function(val1, key1) {
                                                val1.paramKey = val1.paramKey.replace(eval('/(\\\{\\\{' + val.paramKey + '\\\}\\\})/g'), val.paramValue);
                                                val1.paramKeyHtml = val1.paramKeyHtml.replace(eval('/(\\\{\\\{' + val.paramKey + '\\\}\\\})/g'), val.paramValue);
                                            })
                                            result = angular.toJson(templateResult);
                                        })
                                        data.info.result = result;
                                    }
                                    if (envItem.frontURIList.length > 0) {
                                        data.info.result = data.info.result.replace(eval('/(\"' + data.info.uri + '\":\"){1}/g'), '\"' + data.info.uri + '\":\"' + $scope.data.info.isModel.frontURIList[0].uri);
                                    } else {
                                        data.info.result = data.info.result;
                                    }
                                    if (envItem.headerList.length > 0) {
                                        var headerString = angular.toJson(envItem.headerList);
                                        if (data.info.result.indexOf('\"' + data.info.header + '\":[]') > -1) {
                                            data.info.result = data.info.result.replace(eval('/(\"' + data.info.header + '\":\\\[)/'), '\"' + data.info.header + '\":\[' + headerString.slice(1, headerString.length - 1));
                                        } else {
                                            data.info.result = data.info.result.replace(eval('/(\"' + data.info.header + '\":\\\[)/'), '\"' + data.info.header + '\":\[' + headerString.slice(1, headerString.length - 1) + ',');
                                        }
                                    }
                                    $scope.envModel = angular.fromJson(data.info.result);
                                    $scope.envModel.baseInfo.apiNoteHtml = $sce.trustAsHtml($filter('XssFilter')($scope.envModel.baseInfo.apiNote, {
                                        onIgnoreTagAttr: function(tag, name, value, isWhiteAttr) {
                                            if (/(class)|(id)|(name)/.test(name)) {
                                                return name + '="' + value + '"';
                                            }
                                        }
                                    }));
                                    break;
                                }
                            case 2:
                                {
                                    if (envItem.frontURIList.length > 0) {
                                        data.info.result = data.info.param.replace(eval('/(\"' + data.info.uri + '\":\"){1}/g'), '\"' + data.info.uri + '\":\"' + $scope.data.info.isModel.frontURIList[0].uri);
                                    } else {
                                        data.info.result = data.info.param;
                                    }
                                    if (envItem.headerList.length > 0) {
                                        var headerString = angular.toJson(envItem.headerList);
                                        if (data.info.result.indexOf('\"' + data.info.header + '\":[]') > -1) {
                                            data.info.result = data.info.result.replace(eval('/(\"' + data.info.header + '\":\\\[)/'), '\"' + data.info.header + '\":\[' + headerString.slice(1, headerString.length - 1));
                                        } else {
                                            data.info.result = data.info.result.replace(eval('/(\"' + data.info.header + '\":\\\[)/'), '\"' + data.info.header + '\":\[' + headerString.slice(1, headerString.length - 1) + ',');
                                        }
                                    }
                                    $scope.envModel = angular.fromJson(data.info.result);
                                    break;
                                }
                        }
                    } else {
                        $scope.data.info.isModel = {
                            envName: '',
                            frontURIList: [],
                            headerList: [],
                            paramList: []
                        }
                        switch (data.info.status) {
                            case 0:
                                {
                                    $scope.envQueryInit = function(attr) {
                                        return attr;
                                    };
                                    break;
                                }
                            case 1:
                                {
                                    data.info.result = data.info.param;
                                    break;
                                }
                            case 2:
                                {
                                    data.info.result = data.info.param;
                                    $scope.envModel = angular.fromJson(data.info.result);
                                    break;
                                }
                        }
                    }
                }

                /**
                 * @function [初始化功能函数] [initialization]
                 */
                data.fun.init = function() {
                    data.storage = JSON.parse(window.localStorage['ENV_DIRECTIVE_TABLE'] || '{}');
                    if ($scope.data.info.envQuery) {
                        data.fun.initMessage();
                    } else {
                        ApiManagementResource.Env.Query({ projectID: data.interaction.request.projectID }).$promise.then(function(response) {
                            $scope.data.info.envQuery = response.envList || [];
                            data.fun.initMessage();
                        })
                    }
                }

                /**
                 * @function [下拉按钮单击功能函数] [Drop down button click]
                 * @param    {[string]}   query [环境变量列表项 Environment variable list item]
                 */
                $scope.data.fun.isClick = function(query) { 
                    var template = { output: null }
                    if (query == null) {
                        query = {
                            envName: '',
                            frontURIList: [],
                            headerList: [],
                            paramList: []
                        }
                        $scope.data.info.template.envItem = null;
                    } else {
                        query.changed = true;
                        $scope.data.info.template.envItem = query;
                    }
                    data.info.status ? data.info.reset = 1 : '';
                    $scope.data.info.isModel = query;
                    $scope.envParam = query.paramList;
                    $scope.data.info.isShow = false;
                    data.storage[data.interaction.request.projectID] = query.envID;
                    window.localStorage.setItem('ENV_DIRECTIVE_TABLE', angular.toJson(data.storage));
                    switch (data.info.status) {
                        case 0:
                            {
                                if (query.frontURIList.length > 0) {
                                    $scope.envQueryInit = function(attr) {
                                        var result = attr;
                                        angular.forEach($scope.data.info.isModel.paramList, function(val, key) {
                                            result = result.replace(eval('/(\\\{\\\{' + val.paramKey + '\\\}\\\})/g'), val.paramValue);
                                        })
                                        return $scope.data.info.isModel.frontURIList[0].uri + result;
                                    };
                                } else {
                                    $scope.envQueryInit = function(attr) {
                                        var result = attr;
                                        angular.forEach($scope.data.info.isModel.paramList, function(val, key) {
                                            result = result.replace(eval('/(\\\{\\\{' + val.paramKey + '\\\}\\\})/g'), val.paramValue);
                                        })
                                        return result;
                                    };
                                }
                                break;
                            }
                        case 1:
                            {
                                var result = null;
                                data.info.result = data.info.param;
                                if (query.paramList.length > 0) {
                                    var templateResult = {};
                                    angular.copy(angular.fromJson(data.info.param), templateResult);
                                    angular.forEach(query.paramList, function(val, key) {
                                        templateResult.baseInfo.apiURI = templateResult.baseInfo.apiURI.replace(eval('/(\\\{\\\{' + val.paramKey + '\\\}\\\})/g'), val.paramValue);
                                        angular.forEach(templateResult.headerInfo, function(val1, key1) {
                                            val1.headerName = val1.headerName.replace(eval('/(\\\{\\\{' + val.paramKey + '\\\}\\\})/g'), val.paramValue);
                                        })
                                        angular.forEach(templateResult.requestInfo, function(val1, key1) {
                                            val1.paramKey = val1.paramKey.replace(eval('/(\\\{\\\{' + val.paramKey + '\\\}\\\})/g'), val.paramValue);
                                            val1.paramKeyHtml = val1.paramKeyHtml.replace(eval('/(\\\{\\\{' + val.paramKey + '\\\}\\\})/g'), val.paramValue);
                                        })
                                        result = angular.toJson(templateResult);
                                    })
                                    data.info.result = result;
                                }
                                if (query.frontURIList.length > 0) {
                                    data.info.result = data.info.result.replace(eval('/(\"' + data.info.uri + '\":\"){1}/g'), '\"' + data.info.uri + '\":\"' + $scope.data.info.isModel.frontURIList[0].uri);
                                } else {
                                    data.info.result = data.info.result;
                                }
                                if (query.headerList.length > 0) {
                                    var headerString = angular.toJson(query.headerList);
                                    if (data.info.result.indexOf('\"' + data.info.header + '\":[]') > -1) {
                                        data.info.result = data.info.result.replace(eval('/(\"' + data.info.header + '\":\\\[)/'), '\"' + data.info.header + '\":\[' + headerString.slice(1, headerString.length - 1));
                                    } else {
                                        data.info.result = data.info.result.replace(eval('/(\"' + data.info.header + '\":\\\[)/'), '\"' + data.info.header + '\":\[' + headerString.slice(1, headerString.length - 1) + ',');
                                    }
                                }
                                $scope.envModel = angular.fromJson(data.info.result);
                                $scope.envModel.baseInfo.apiNoteHtml = $sce.trustAsHtml($filter('XssFilter')($scope.envModel.baseInfo.apiNote, {
                                    onIgnoreTagAttr: function(tag, name, value, isWhiteAttr) {
                                        if (/(class)|(id)|(name)/.test(name)) {
                                            return name + '="' + value + '"';
                                        }
                                    }
                                }));
                                break;
                            }
                        case 2:
                            {

                                if (query.frontURIList.length > 0) {
                                    data.info.result = data.info.param.replace(eval('/(\"' + data.info.uri + '\":\"){1}/g'), '\"' + data.info.uri + '\":\"' + $scope.data.info.isModel.frontURIList[0].uri);
                                } else {
                                    data.info.result = data.info.param;
                                }
                                if (query.headerList.length > 0) {
                                    var headerString = angular.toJson(query.headerList);
                                    if (data.info.result.indexOf('\"' + data.info.header + '\":[]') > -1) {
                                        data.info.result = data.info.result.replace(eval('/(\"' + data.info.header + '\":\\\[)/'), '\"' + data.info.header + '\":\[' + headerString.slice(1, headerString.length - 1));
                                    } else {
                                        data.info.result = data.info.result.replace(eval('/(\"' + data.info.header + '\":\\\[)/'), '\"' + data.info.header + '\":\[' + headerString.slice(1, headerString.length - 1) + ',');
                                    }
                                }
                                template.output = angular.fromJson(data.info.result);
                                template.output.params = $scope.envModel.params;
                                $scope.envModel = template.output;
                                break;
                            }
                    }
                }

                /**
                 * @function [监听初始化功能函数] [Monitor the initialization]
                 * @param    {[obj]}   _default [原生传参 Native parameters]
                 * @param    {[obj]}   _default [{reset:是否重置 Whether to reset,resetInfo:重置内容 Reset the content}]
                 */
                $scope.$on('$EnvInitReady', function(_default, attr) { 
                    if (attr.reset && data.info.reset) {
                        data.info.param = angular.toJson(attr.resetInfo);
                        data.info.reset = false;
                    } else if (attr.reset) {
                        data.info.param = angular.toJson(attr.resetInfo);
                    } else {
                        data.info.param = attr.param;
                    }
                    data.info.status = attr.status;
                    data.info.header = attr.header ? attr.header : 'headerInfo';
                    data.info.uri = attr.uri ? attr.uri : 'apiURI';
                    timer = $timeout(function() {
                        data.fun.init();
                    });
                });

                /**
                 * @function [页面销毁功能函数 Destroy the page]
                 */
                $scope.$on('$destroy', function() {
                    if (timer) {
                        $timeout.cancel(timer);
                    }
                });
            }
        };
    }]);
})();
