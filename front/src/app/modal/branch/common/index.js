(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [公用弹窗controller js] [Public bucket controller js]
     * @version  3.1.1
     */
    angular.module('eolinker.modal')

    .directive('eoCommonModal', [function() {
        return {
            restrict: 'AE',
            templateUrl: 'app/modal/branch/common/index.html'
        }
    }])

    .controller('ExpressionBuilderModalCtrl', ExpressionBuilderModalCtrl)

    .controller('InfoModalCtrl', InfoModalCtrl)

    .controller('TipsModalCtrl', TipsModalCtrl)

    .controller('MessageModalCtrl', MessageModalCtrl)

    .controller('ImportModalCtrl', ImportModalCtrl)

    .controller('ImportDatabaseModalCtrl', ImportDatabaseModalCtrl)

    .controller('ExportModalCtrl', ExportModalCtrl)

    .controller('ExportDatabaseModalCtrl', ExportDatabaseModalCtrl)

    .controller('EnsureModalCtrl', EnsureModalCtrl)

    .controller('JsonToParamInputModalCtrl', JsonToParamInputModalCtrl)

    .controller('FieldModalCtrl', FieldModalCtrl)

    .controller('ProjectModalCtrl', ProjectModalCtrl)

    .controller('DatabaseModalCtrl', DatabaseModalCtrl)

    .controller('GroupModalCtrl', GroupModalCtrl)

    .controller('ApiRecoverModalCtrl', ApiRecoverModalCtrl)

    .controller('TableModalCtrl', TableModalCtrl)

    .controller('CodeModalCtrl', CodeModalCtrl)

    .controller('RequestParamDetailModalCtrl', RequestParamDetailModalCtrl)

    .controller('RequestParamEditModalCtrl', RequestParamEditModalCtrl)

    .controller('ResponseParamDetailModalCtrl', ResponseParamDetailModalCtrl)

    .controller('ResponseParamEditModalCtrl', ResponseParamEditModalCtrl)


    RequestParamDetailModalCtrl.$inject = ['$scope', '$uibModalInstance', '$filter', 'input'];
    /**
     * @function [请求参数详情弹窗] [Request parameter details pop]
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $uibModalInstance [注入$uibModalInstance服务] [Injection $uibModalInstance service]
     * @service  $filter [注入过滤器服务] [Injection filter service]
     * @param    {[obj]}   input [参数详情 Parameter details]
     */
    function RequestParamDetailModalCtrl($scope, $uibModalInstance, $filter, input) {
        $scope.data = {
            info: {
                yes: $filter('translate')('405'),
            },
            input: {},
            fun: {
                close: null, 
            }
        }
        var data = {
            fun: {
                init: null, 
            }
        }
        data.fun.init = (function() {
            angular.copy(input, $scope.data.input);
        })();
        $scope.data.fun.close = function() {
            $uibModalInstance.close(true);
        }
    }

    RequestParamEditModalCtrl.$inject = ['$scope', '$uibModalInstance', '$filter', 'input'];
    /**
     * @function [请求参数编辑弹窗] [Request parameters to edit pop]
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $uibModalInstance [注入$uibModalInstance服务] [Injection $uibModalInstance service]
     * @service  $filter [注入过滤器服务] [Injection filter service]
     * @param    {[obj]}   input [参数详情 Parameter details]
     */
    function RequestParamEditModalCtrl($scope, $uibModalInstance, $filter, input) {
        $scope.data = {
            info: {
                yes: $filter('translate')('405'),
            },
            input: {},
            fun: {
                close: null, 
                ok: null, 
            }
        }
        var data = {
            fun: {
                init: null, 
            }
        }
        data.fun.init = (function() {
            angular.copy(input, $scope.data.input);
        })();
        $scope.data.fun.close = function() {
            var template = {
                output: {}
            }
            angular.copy($scope.data.input.item, template.output);
            template.output.paramValueList.splice(template.output.paramValueList.length - 1, 1);
            $uibModalInstance.close({
                item: template.output
            });
        }
        $scope.data.fun.ok = function() {
            var template = {
                output: {}
            }
            angular.copy($scope.data.input.item, template.output);
            for (var key = 0; key < template.output.paramValueList.length; key++) {
                var val = template.output.paramValueList[key];
                if (val.valueDescription && !val.value) {
                    break;
                } else if (!val.valueDescription && !val.value) {
                    template.output.paramValueList.splice(key, 1);
                    key--;
                }
            }
            if (key == template.output.paramValueList.length) {
                $uibModalInstance.close({
                    item: template.output
                });
            }
        }
    }

    ResponseParamDetailModalCtrl.$inject = ['$scope', '$uibModalInstance', '$filter', 'input'];
     /**
     * @function [请求参数编辑弹窗] [Request parameters to edit pop]
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $uibModalInstance [注入$uibModalInstance服务] [Injection $uibModalInstance service]
     * @service  $filter [注入过滤器服务] [Injection filter service]
     * @param    {[obj]}   input [参数详情 Parameter details]
     */
    function ResponseParamDetailModalCtrl($scope, $uibModalInstance, $filter, input) {
        $scope.data = {
            info: {
                yes: $filter('translate')('405'),
            },
            input: {},
            fun: {
                close: null, 
            }
        }
        var data = {
            fun: {
                init: null, 
            }
        }
        data.fun.init = (function() {
            angular.copy(input, $scope.data.input);
        })();
        $scope.data.fun.close = function() {
            $uibModalInstance.close(true);
        }

    }

    ResponseParamEditModalCtrl.$inject = ['$scope', '$uibModalInstance', '$filter', 'input'];
    /**
     * @function [返回参数编辑弹窗] [Return the parameters to edit the pop-up window]
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $uibModalInstance [注入$uibModalInstance服务] [Injection $uibModalInstance service]
     * @service  $filter [注入过滤器服务] [Injection filter service]
     * @param    {[obj]}   input [参数详情 Parameter details]
     */
    function ResponseParamEditModalCtrl($scope, $uibModalInstance, $filter, input) {
        $scope.data = {
            info: {
                yes: $filter('translate')('405'),
            },
            input: {},
            fun: {
                close: null, 
                ok: null, 
            }
        }
        var data = {
            fun: {
                init: null, 
            }
        }
        data.fun.init = (function() {
            angular.copy(input, $scope.data.input);
        })();
        $scope.data.fun.close = function() {
            var template = {
                output: {}
            }
            angular.copy($scope.data.input.item, template.output);
            template.output.paramValueList.splice(template.output.paramValueList.length - 1, 1);
            $uibModalInstance.close({
                item: template.output
            });
        }
        $scope.data.fun.ok = function() {
            var template = {
                output: {}
            }
            angular.copy($scope.data.input.item, template.output);
            for (var key = 0; key < template.output.paramValueList.length; key++) {
                var val = template.output.paramValueList[key];
                if (val.valueDescription && !val.value) {
                    break;
                } else if (!val.valueDescription && !val.value) {
                    template.output.paramValueList.splice(key, 1);
                    key--;
                }
            }
            if (key == template.output.paramValueList.length) {
                $uibModalInstance.close({
                    item: template.output
                });
            }
        }
    }

    ExpressionBuilderModalCtrl.$inject = ['$scope', '$uibModalInstance', 'data'];
    /**
     * @function [表达式构造器弹窗] [Expression constructor]
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $uibModalInstance [注入$uibModalInstance服务] [Injection $uibModalInstance service]
     * @param    {[obj]}   data [原始数据 original data]
     */
    function ExpressionBuilderModalCtrl($scope, $uibModalInstance, data) {
        $scope.data = {
            interaction: {
                request: {
                    expressionBuilderObject: data || {
                        request: {},
                        response: {}
                    }
                }
            },
            fun: {
                init: null, 
                callback: null 
            }
        }
        $scope.data.fun.init = function(callback) {
            var template = {
                interaction: {}
            }
            angular.copy(data, template.interaction);
            $scope.data.interaction.request.expressionBuilderObject = template.interaction;
        };
        $scope.data.fun.init();
        $scope.data.fun.callback = function(callback) {
            $uibModalInstance.close(callback);
        };
    }

    EnsureModalCtrl.$inject = ['$scope', '$uibModalInstance', '$filter', 'title', 'necessity', 'info', 'btn'];
    /**
     * @function [确认弹窗] [confirm]
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $uibModalInstance [注入$uibModalInstance服务] [Injection $uibModalInstance service]
     * @service  $filter [注入过滤器服务] [Injection filter service]
     * @param    {[string]}   title [弹窗标题 Pop-up title]
     * @param    {[boolean]}   necessity [是否需要键入yes Do you need to type yes?]
     * @param    {[string]}   info [弹窗内容 Pop-up content]
     * @param    {[number]}   btn [按钮类型 Button type]
     */
    function EnsureModalCtrl($scope, $uibModalInstance, $filter, title, necessity, info, btn) {

        $scope.title = title;
        $scope.necessity = necessity;
        $scope.info = {
            message: info || $filter('translate')('390'),
            btnType: btn.btnType || 0, //0：warning 1：info,2:success,
            btnMessage: btn.btnMessage || $filter('translate')('391')
        }
        $scope.ok = function() {
            if ($scope.sureForm.$valid || !$scope.necessity) {
                $uibModalInstance.close(true);
            } else {
                $scope.submited = true;
            }
        };

        $scope.cancel = function() {
            //$uibModalInstance.dismiss(false);
            $uibModalInstance.close(false);
        };

    }

    JsonToParamInputModalCtrl.$inject = ['$scope', '$uibModalInstance', 'input'];
    /**
     * @function [导入JSON弹窗] [Import JSON]
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $uibModalInstance [注入$uibModalInstance服务] [Injection $uibModalInstance service]
     * @param    {[obj]}   input [参数详情 Parameter details]
     */
    function JsonToParamInputModalCtrl($scope, $uibModalInstance, input) {
        $scope.data={
            input:input
        }
        $scope.ok = function(which) {
            if ($scope.sureForm.$valid) {
                $uibModalInstance.close({
                    which: which,
                    desc: $scope.info.desc
                });
            } else {
                $scope.submited = true;
            }
        };

        $scope.cancel = function() {
            $uibModalInstance.close(false);
        };
    }

    MessageModalCtrl.$inject = ['$scope', '$sce', '$uibModalInstance', 'title', 'info'];
    /**
     * @function [消息弹窗] [Message]
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $uibModalInstance [注入$uibModalInstance服务] [Injection $uibModalInstance service]
     * @service  $sce [注入$sce服务] [Injection $sce service]
     * @param    {[string]}   title [弹窗标题 Pop-up title]
     * @param    {[string]}   info [弹窗内容 Pop-up content]
     */
    function MessageModalCtrl($scope, $sce, $uibModalInstance, title, info) {

        $scope.title = title;
        $scope.info = $sce.trustAsHtml(info);

        $scope.cancel = function() {
            //$uibModalInstance.dismiss(false);
            $uibModalInstance.close(false);
        };

    }

    TipsModalCtrl.$inject = ['$scope', '$sce', '$uibModalInstance', 'info'];
    /**
     * @function [提示弹窗] [Tips]
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $uibModalInstance [注入$uibModalInstance服务] [Injection $uibModalInstance service]
     * @service  $sce [注入$sce服务] [Injection $sce service]
     * @param    {[string]}   info [弹窗内容 Pop-up content]
     */
    function TipsModalCtrl($scope, $sce, $uibModalInstance, info) {
        $scope.info = {
            html: $sce.trustAsHtml(info.html),
            background: info.background,
            type: info.type
        }
        $scope.cancel = function() {
            $uibModalInstance.close(false);
        };
    }

    ImportModalCtrl.$inject = ['$scope', '$uibModalInstance', 'ApiManagementResource', '$filter', 'CODE', '$rootScope', 'input'];
    /**
     * @function [导入项目弹窗] [Import the project]
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $rootScope [注入根作用域服务] [Injection rootScope service]
     * @service  $uibModalInstance [注入$uibModalInstance服务] [Injection $uibModalInstance service]
     * @service  ApiManagementResource [注入接口管理接口服务] [inject ApiManagement API service]
     * @service  $filter [注入过滤器服务] [Inject filter service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     * @param    {[obj]}   input [参数详情 Parameter details]
     */
    function ImportModalCtrl($scope, $uibModalInstance, ApiManagementResource, $filter, CODE, $rootScope, input) {
        $scope.data = {
            input: input,
            fun: {
                import: null 
            }
        }
        $scope.importFile = function(arg) {
            var file = arg.$file[0];
            switch ($scope.data.input.status) {
                case 1:
                    {
                        var reader = new FileReader();
                        reader.readAsText(file);
                        reader.onloadend = function(evt) {
                            $scope.$broadcast('$LoadingInit', {
                                companyID: input.companyID,
                                status: arg.status,
                                result: this.result
                            });
                        }
                        break;
                    }
                default:
                    {
                        if (file.name.indexOf('.json') > -1 || file.name.indexOf('.txt') > -1 || file.name.indexOf('.export') > -1) {
                            var reader = new FileReader();
                            reader.readAsText(file);
                            reader.onloadend = function(evt) {
                                $scope.$broadcast('$LoadingInit', {
                                    companyID: input.companyID,
                                    status: arg.status,
                                    result: this.result
                                });
                            }
                        } else {
                            $rootScope.InfoModal($filter('translate')('392'), 'error');
                        }
                    }
            }

        }
        $scope.data.fun.import = function(arg) {
            var template = {
                promise: null
            }
            switch (arg.status) {
                case 0:
                    {
                        template.promise = ApiManagementResource.Import.Eoapi({
                            data: arg.result
                        }).$promise;
                        template.promise.then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        $uibModalInstance.close(true);
                                        break;
                                    }
                                case CODE.IMPORT_EXPORT.ILLEGAL_IMPORT:
                                    {
                                        $rootScope.InfoModal($filter('translate')('393'), 'error');
                                        break;
                                    }
                                default:
                                    {
                                        $rootScope.InfoModal($filter('translate')('394'), 'error');
                                        break;
                                    }
                            }
                        });
                        break;
                    }
                case 1:
                case 2:
                    {
                        template.promise = ApiManagementResource.Import.Postman({
                            data: arg.result,
                            version: arg.status
                        }).$promise;
                        template.promise.then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {

                                        $uibModalInstance.close(true);
                                        break;
                                    }
                                case CODE.IMPORT_EXPORT.ILLEGAL_VERSION:
                                    {
                                        $rootScope.InfoModal($filter('translate')('395'), 'error');
                                        break;
                                    }
                                case CODE.IMPORT_EXPORT.ILLEGAL_IMPORT:
                                    {
                                        $rootScope.InfoModal($filter('translate')('396'), 'error');
                                        break;
                                    }
                                default:
                                    {
                                        $rootScope.InfoModal($filter('translate')('397'), 'error');
                                        break;
                                    }
                            }
                        });
                        break;
                    }
                case 3:
                    {
                        template.promise = ApiManagementResource.Import.Dhc({
                            data: arg.result
                        }).$promise;
                        template.promise.then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        $uibModalInstance.close(true);
                                        break;
                                    }
                                case CODE.IMPORT_EXPORT.ILLEGAL_IMPORT:
                                    {
                                        $rootScope.InfoModal($filter('translate')('396'), 'error');
                                        break;
                                    }
                                default:
                                    {
                                        $rootScope.InfoModal($filter('translate')('394'), 'error');
                                        break;
                                    }
                            }
                        });
                        break;
                    }
                case 4:
                    {
                        template.promise = ApiManagementResource.Import.Rap({
                            data: arg.result
                        }).$promise;
                        template.promise.then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        $uibModalInstance.close(true);
                                        break;
                                    }
                                case CODE.IMPORT_EXPORT.ILLEGAL_IMPORT:
                                    {
                                        $rootScope.InfoModal($filter('translate')('397'), 'error');
                                        break;
                                    }
                                default:
                                    {
                                        $rootScope.InfoModal($filter('translate')('394'), 'error');
                                        break;
                                    }
                            }
                        });
                        break;
                    }
                case 5:
                    {
                        template.promise = ApiManagementResource.Import.Swagger({
                            data: arg.result
                        }).$promise;
                        template.promise.then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        $uibModalInstance.close(true);
                                        break;
                                    }
                                case CODE.IMPORT_EXPORT.ILLEGAL_IMPORT:
                                    {
                                        $rootScope.InfoModal($filter('translate')('397'), 'error');
                                        break;
                                    }
                                default:
                                    {
                                        $rootScope.InfoModal($filter('translate')('394'), 'error');
                                        break;
                                    }
                            }
                        });
                        break;
                    }
                case 6:
                    {
                        template.promise = ApiManagementResource.Api.Import({
                            projectID: $scope.data.input.request.projectID,
                            groupID: $scope.data.input.request.groupID,
                            data: arg.result
                        }).$promise;
                        template.promise.then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        $uibModalInstance.close(true);
                                        break;
                                    }
                                case '160006':
                                    {
                                        $rootScope.InfoModal($filter('translate')('398'), 'error');
                                        break;
                                    }
                                default:
                                    {
                                        $rootScope.InfoModal($filter('translate')('394'), 'error');
                                        break;
                                    }
                            }
                        });
                        break;
                    }
            }
            return template.promise;
        }
        $scope.cancel = function() {
            //$uibModalInstance.dismiss(false);
            $uibModalInstance.close(false);
        };

    }

    ImportDatabaseModalCtrl.$inject = ['$scope', '$state', '$uibModalInstance', '$filter', 'input', 'DatabaseResource', 'CODE', '$rootScope'];
    /**
     * @function [导入数据库弹窗] [Import the database]
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $rootScope [注入根作用域服务] [Injection rootScope service]
     * @service  $uibModalInstance [注入$uibModalInstance服务] [Injection $uibModalInstance service]
     * @service  DatabaseResource [注入接口管理接口服务] [inject database API service]
     * @service  $filter [注入过滤器服务] [Inject filter service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     * @param    {[obj]}   input [参数详情 Parameter details]
     */
    function ImportDatabaseModalCtrl($scope, $state, $uibModalInstance, $filter, input, DatabaseResource, CODE, $rootScope) {
        var code = CODE.COMMON.SUCCESS;
        $scope.title = input.title;
        $scope.data = {
            input: {
                status: input.status || 0,
            },
            fun: {
                import: null //导入按钮功能函数
            }
        }
        $scope.importFile = function(arg) {
            var file = arg.$file[0];
            if (/(.sql)|(.export)/.test(file.name)) {
                var reader = new FileReader();
                reader.readAsText(file);
                reader.onloadend = function(evt) {
                    $scope.$broadcast('$LoadingInit', {
                        status: arg.status,
                        result: this.result
                    });
                };
            } else {
                $rootScope.InfoModal($filter('translate')('399'), 'error');
            }
        }
        $scope.data.fun.import = function(arg) {
            var template = {
                promise: null
            }
            switch (arg.status) {
                case 0:
                    {
                        template.promise = DatabaseResource.Database.Import({
                            dbID: $state.params.databaseID,
                            dumpSql: arg.result
                        }).$promise;
                        template.promise.then(function(data) {
                            switch (data.statusCode) {
                                case code:
                                    {
                                        $uibModalInstance.close(true);
                                        break;
                                    }
                                case '310004':
                                    {
                                        $rootScope.InfoModal($filter('translate')('393'), 'error');
                                        break;
                                    }
                                default:
                                    {
                                        $rootScope.InfoModal($filter('translate')('394'), 'error');
                                        break;
                                    }
                            }
                        });
                        break;
                    }
                case 1:
                    {
                        template.promise = DatabaseResource.Database.ImportByJson({
                            data: arg.result
                        }).$promise;
                        template.promise.then(function(data) {
                            switch (data.statusCode) {
                                case code:
                                    {
                                        $uibModalInstance.close(true);
                                        break;
                                    }
                                case '220010':
                                    {
                                        $rootScope.InfoModal($filter('translate')('393'), 'error');
                                        break;
                                    }
                                default:
                                    {
                                        $rootScope.InfoModal($filter('translate')('394'), 'error');
                                        break;
                                    }
                            }
                        });
                        break;
                    }
            }
            return template.promise;
        }
        $scope.cancel = function() {
            //$uibModalInstance.dismiss(false);
            $uibModalInstance.close(false);
        };
    }

    ExportModalCtrl.$inject = ['$scope', '$uibModalInstance', 'ApiManagementResource', '$filter', 'CODE', '$rootScope', 'input'];
    /**
     * @function [导出项目弹窗] [Export the project]
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $rootScope [注入根作用域服务] [Injection rootScope service]
     * @service  $uibModalInstance [注入$uibModalInstance服务] [Injection $uibModalInstance service]
     * @service  ApiManagementResource [注入接口管理接口服务] [inject ApiManagement API service]
     * @service  $filter [注入过滤器服务] [Inject filter service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     * @param    {[obj]}   input [参数详情 Parameter details]
     */
    function ExportModalCtrl($scope, $uibModalInstance, ApiManagementResource, $filter, CODE, $rootScope, input) {
        $scope.data = {
            input: input,
            fun: {
                dumpDirective: null //
            }
        }
        var data = {
            assistantFun: {
                response: null
            }
        }
        data.assistantFun.response = function(arg) {
            switch (arg.response.statusCode) {
                case CODE.COMMON.SUCCESS:
                    {
                        $scope.$broadcast('$DumpDirective_Click_' + arg.switch, {
                            response: arg.response
                        });
                        $rootScope.InfoModal($filter('translate')('3910'), 'success');
                        $uibModalInstance.close(false);
                        break;
                    }
                default:
                    {
                        $rootScope.InfoModal($filter('translate')('3911'), 'error');
                        break;
                    }
            }
        }
        $scope.data.fun.dumpDirective = function(arg) {
            var template = {
                promise: null,
                request: {
                    projectID: $scope.data.input.projectID
                }
            }
            template.promise = ApiManagementResource.Project.Dump(template.request).$promise;
            template.promise.then(function(response) {
                data.assistantFun.response({
                    response: response,
                    switch: arg.switch
                });
            })
            return template.promise;
        }
        $scope.cancel = function() {
            //$uibModalInstance.dismiss(false);
            $uibModalInstance.close(false);
        };

    }

    ExportDatabaseModalCtrl.$inject = ['$scope', '$uibModalInstance', 'DatabaseResource', '$filter', 'CODE', '$rootScope', 'input'];
    /**
     * @function [导出数据库弹窗] [Export the database]
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $rootScope [注入根作用域服务] [Injection rootScope service]
     * @service  $uibModalInstance [注入$uibModalInstance服务] [Injection $uibModalInstance service]
     * @service  DatabaseResource [注入接口管理接口服务] [inject database API service]
     * @service  $filter [注入过滤器服务] [Inject filter service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     * @param    {[obj]}   input [参数详情 Parameter details]
     */
    function ExportDatabaseModalCtrl($scope, $uibModalInstance, DatabaseResource, $filter, CODE, $rootScope, input) {
        $scope.title = input.title;
        $scope.info = {
            dbID: input.dbID
        }
        $scope.data = {
            fun: {
                dumpDirective: null 
            }
        }
        var data = {
            assistantFun: {
                response: null
            }
        }
        data.assistantFun.response = function(arg) {
            switch (arg.response.statusCode) {
                case CODE.COMMON.SUCCESS:
                    {
                        $scope.$broadcast('$DumpDirective_Click_' + arg.switch, {
                            response: arg.response
                        });
                        $rootScope.InfoModal($filter('translate')('3910'), 'success');
                        $uibModalInstance.close(false);
                        break;
                    }
                default:
                    {
                        $rootScope.InfoModal($filter('translate')('3911'), 'error');
                        break;
                    }
            }
        }
        $scope.data.fun.dumpDirective = function(arg) {
            var template = {
                promise: null,
                request: {
                    dbID: $scope.info.dbID
                }
            }

            switch (arg.switch) {
                case "0":
                    {
                        template.promise = DatabaseResource.Database.Dump(template.request).$promise;
                        template.promise.then(function(response) {
                            data.assistantFun.response({
                                response: response,
                                switch: arg.switch
                            });
                        })
                        break;
                    }
            }
            return template.promise;
        }
        $scope.cancel = function() {
            //$uibModalInstance.dismiss(false);
            $uibModalInstance.close(false);
        };

    }

    InfoModalCtrl.$inject = ['$scope', '$uibModalInstance', '$timeout', 'info', 'type'];
    /**
     * @function [消息弹窗] [Info]
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $uibModalInstance [注入$uibModalInstance服务] [Injection $uibModalInstance service]
     * @param    {[string]}   input [弹窗内容 Pop-up content]
     * @param    {[string]}   type [弹窗类型 Pop-up type]
     */
    function InfoModalCtrl($scope, $uibModalInstance, $timeout, info, type) {

        $scope.type = type || 'info';
        $scope.info = info;
        var timer = $timeout(function() {
            $uibModalInstance.close(true);
        }, 1500, true);
        $scope.$on('$destroy', function() {
            if (timer) {
                $timeout.cancel(timer);
            }
        });
    }

    FieldModalCtrl.$inject = ['$state', '$scope', '$uibModalInstance', 'DatabaseResource', '$filter', '$rootScope', 'DATABASE', 'CODE', 'input'];
    /**
     * @function [编辑字段弹窗] [Edit the field]
     * @service  $state [注入路由服务] [Inject state service]
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $rootScope [注入根作用域服务] [Injection rootScope service]
     * @service  $uibModalInstance [注入$uibModalInstance服务] [Injection $uibModalInstance service]
     * @service  DatabaseResource [注入数据库管理接口服务] [inject database API service]
     * @service  $filter [注入过滤器服务] [inject filter service]
     * @constant DATABASE [注入数据库常量] [inject DATABASE constant service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     * @param    {[obj]}   input [参数详情 Parameter details]
     */
    function FieldModalCtrl($state, $scope, $uibModalInstance, DatabaseResource, $filter, $rootScope, DATABASE, CODE, input) {

        var code = CODE.COMMON.SUCCESS;
        var vm = this;
        $scope.title = input.title;
        $scope.info = {
            companyID: $state.params.companyID,
            databaseID: input.interaction.request.databaseID,
            tableID: input.interaction.request.tableID,
            fieldID: '',
            fieldName: '',
            fieldType: '',
            fieldLength: '',
            isNotNull: false,
            isPrimaryKey: false,
            fieldDescription: '',
            defaultValue: '',
            isAdd: true
        }
        $scope.template = {
            isKeep: false 
        }
        $scope.isDisable = false;
        $scope.query = [];
        $scope.typeList = DATABASE.TYPE;

        function init() {
            if (input.interaction.request.fieldID) {
                $scope.info = {
                    companyID: $state.params.companyID,
                    databaseID: input.interaction.request.databaseID,
                    tableID: input.interaction.request.tableID,
                    fieldID: input.interaction.request.fieldID,
                    fieldName: input.interaction.request.fieldName,
                    fieldType: '' + input.interaction.request.fieldType,
                    fieldLength: input.interaction.request.fieldLength,
                    isNotNull: input.interaction.request.isNotNull == 1,
                    isPrimaryKey: input.interaction.request.isPrimaryKey == 1,
                    defaultValue: input.interaction.request.defaultValue,
                    fieldDescription: input.interaction.request.fieldDescription,
                    isAdd: false
                }
            }
        }
        init();


        $scope.changeKey = function() {
            if ($scope.info.isPrimaryKey) {
                $scope.info.isNotNull = true;
            }
        }
        $scope.keep = function() {
            var template = {
                promise: null,
                request: {}
            }
            $scope.isType = false;
            angular.forEach($scope.typeList, function(val, key) {
                if ($scope.info.fieldType == val) {
                    $scope.isType = true;
                }
            })
            if ($scope.editFieldForm.$valid && $scope.isType) {
                if (!$scope.isDisable) {
                    $scope.isDisable = true;
                    angular.copy($scope.info, template.request);
                    template.request.isNotNull = template.request.isNotNull ? 1 : 0;
                    template.request.isPrimaryKey = template.request.isPrimaryKey ? 1 : 0;
                    template.promise = DatabaseResource.Field.Add(template.request).$promise;
                    template.promise.then(function(data) {
                        $scope.isDisable = false;
                        if (code == data.statusCode) {
                            $rootScope.InfoModal($filter('translate')('3912'), 'success');
                            $scope.submited = false;
                            $scope.template.isKeep = true;
                            $scope.info = {
                                companyID: $state.params.companyID,
                                databaseID: input.interaction.request.databaseID,
                                tableID: input.interaction.request.tableID,
                                fieldID: '',
                                fieldName: '',
                                fieldType: '',
                                fieldLength: '',
                                isNotNull: false,
                                isPrimaryKey: false,
                                defaultValue: '',
                                fieldDescription: '',
                                isAdd: true
                            }
                            $scope.isType = false;
                        } else {
                            $scope.submited = true;
                        }
                    });
                }
            } else {
                $scope.submited = true;
            }
        }
        $scope.ok = function() {
            var template = {
                promise: null,
                request: {}
            }
            $scope.isType = false;
            angular.forEach($scope.typeList, function(val, key) {
                if ($scope.info.fieldType == val) {
                    $scope.isType = true;
                }
            })
            if ($scope.editFieldForm.$valid && $scope.isType) {
                if (!$scope.isDisable) {
                    $scope.isDisable = true;
                    angular.copy($scope.info, template.request);
                    template.request.isNotNull = template.request.isNotNull ? 1 : 0;
                    template.request.isPrimaryKey = template.request.isPrimaryKey ? 1 : 0;
                    if ($scope.info.isAdd) {
                        template.promise = DatabaseResource.Field.Add(template.request).$promise;
                        template.promise.then(function(data) {
                            $scope.isDisable = false;
                            if (code == data.statusCode) {
                                $uibModalInstance.close(true);
                            } else {
                                $scope.submited = true;
                            }
                        });
                    } else {
                        template.promise = DatabaseResource.Field.Update(template.request).$promise;
                        template.promise.then(function(data) {
                            $scope.isDisable = false;
                            if (code == data.statusCode || data.statusCode == '190009') {
                                $uibModalInstance.close($scope.info);
                            } else {
                                $scope.submited = true;
                            }
                        });
                    }
                }

            } else {
                $scope.submited = true;
            }
        };

        $scope.cancel = function() {
            //$uibModalInstance.dismiss(false);
            if ($scope.template.isKeep) {
                $uibModalInstance.close({
                    status: 1
                });
            } else {
                $uibModalInstance.close(false);
            }
        };
    }

    ProjectModalCtrl.$inject = ['$scope', '$uibModalInstance', 'ApiManagementResource', 'CODE', 'input'];
    /**
     * @function [编辑项目弹窗] [Edit the project]
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $uibModalInstance [注入$uibModalInstance服务] [Injection $uibModalInstance service]
     * @service  $rootScope [注入根作用域服务] [Injection rootScope service]
     * @service  ApiManagementResource [注入接口管理接口服务] [inject ApiManagement API service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     * @param    {[obj]}   input [参数详情 Parameter details]
     */
    function ProjectModalCtrl($scope, $uibModalInstance, ApiManagementResource, CODE, input) {
        var code = CODE.COMMON.SUCCESS;
        var vm = this;
        $scope.title = input.title;
        $scope.info = {
            projectID: '',
            projectName: '',
            projectVersion: '1.0',
            projectType: '0',
            projectDesc: '',
            isAdd: input.isAdd
        }

        function init() {
            if (!$scope.info.isAdd) {
                $scope.info = {
                    projectID: input.item.projectID,
                    projectName: input.item.projectName,
                    projectVersion: input.item.projectVersion,
                    projectType: "" + input.item.projectType + "",
                    projectDesc: input.item.projectDesc,
                    isAdd: false
                }
            }
        }
        init();
        $scope.ok = function() {
            if ($scope.editProjectForm.$valid) {
                if ($scope.info.isAdd) {
                    ApiManagementResource.Project.Add($scope.info).$promise.then(function(data) {
                        if (code == data.statusCode) {
                            $scope.info.projectID = data.projectInfo.projectID;
                            $uibModalInstance.close($scope.info);
                        } else {
                            $scope.submited = true;
                        }
                    });
                } else {
                    ApiManagementResource.Project.Update($scope.info).$promise.then(function(data) {
                        if (code == data.statusCode) {
                            $uibModalInstance.close($scope.info);
                        } else {
                            $scope.submited = true;
                        }
                    });
                }
            } else {
                $scope.submited = true;
            }
        };

        $scope.cancel = function() {
            //$uibModalInstance.dismiss(false);
            $uibModalInstance.close(false);
        };
    }
    
    DatabaseModalCtrl.$inject = ['$scope', '$uibModalInstance', 'DatabaseResource', 'CODE', 'input'];
    /**
     * @function [编辑数据库弹窗] [Edit database]
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $uibModalInstance [注入$uibModalInstance服务] [Injection $uibModalInstance service]
     * @service  $rootScope [注入根作用域服务] [Injection rootScope service]
     * @service  DatabaseResource [注入接口管理接口服务] [inject database API service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     * @param    {[obj]}   input [参数详情 Parameter details]
     */
    function DatabaseModalCtrl($scope, $uibModalInstance, DatabaseResource, CODE, input) {
        var code = CODE.COMMON.SUCCESS;
        var vm = this;
        $scope.title = input.title;
        $scope.info = {
            dbID: '',
            dbName: '',
            dbVersion: '1.0',
            isAdd: true
        }
        function init() {
            if (input.interaction.request) {
                $scope.info = {
                    dbID: input.interaction.request.dbID,
                    dbName: input.interaction.request.dbName,
                    dbVersion: input.interaction.request.dbVersion,
                    isAdd: false
                }
            }
        }
        init();
        $scope.ok = function() {
            var template = {
                promise: null
            }
            if ($scope.editDatabaseForm.$valid) {
                if ($scope.info.isAdd) {
                    template.promise = DatabaseResource.Database.Add($scope.info).$promise;
                    template.promise.then(function(data) {
                        if (code == data.statusCode) {
                            $scope.info.dbID = data.dbID;
                            $uibModalInstance.close($scope.info);
                        } else {
                            $scope.submited = true;
                        }
                    });
                } else {
                    template.promise = DatabaseResource.Database.Update($scope.info).$promise;
                    template.promise.then(function(data) {
                        if (code == data.statusCode) {
                            $uibModalInstance.close($scope.info);
                        } else {
                            $scope.submited = true;
                        }
                    });
                }
            } else {
                $scope.submited = true;
            }
        };

        $scope.cancel = function() {
            //$uibModalInstance.dismiss(false);
            $uibModalInstance.close(false);
        };
    }

    GroupModalCtrl.$inject = ['$scope', '$uibModalInstance', '$filter', 'title', 'info', 'secondTitle', 'query'];
    /**
     * @function [编辑分组弹窗] [Edit grouping]
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $uibModalInstance [注入$uibModalInstance服务] [Injection $uibModalInstance service]
     * @service  $filter [注入过滤器服务] [inject filter service]
     * @param    {[string]}   title [弹窗标题 Pop-up title]
     * @param    {[obj]}   info [输入内容 The contents of the input]
     * @param    {[string]}   secondTitle [分组内容 Grouping content]
     * @param    {[string]}   query [分组列表 Group list]
     */
    function GroupModalCtrl($scope, $uibModalInstance, $filter, title, info, secondTitle, query) {
        var vm = this;
        $scope.title = title;
        $scope.secondTitle = secondTitle || $filter('translate')('3913');
        $scope.required = info ? (info.required ? true : false) : false;
        $scope.info = {
            groupName: '',
            groupID: '',
            $index: '0',
            isAdd: true
        }
        $scope.params = {
            query: [{
                groupName: $filter('translate')('3914'),
                groupID: '0'
            }].concat(query),
            hadSelected: query ? true : false
        }

        function init() {
            if (info) {
                $scope.info = {
                    groupName: info.groupName,
                    groupID: info.groupID,
                    $index: info.$index ? '' + info.$index : '0',
                    isAdd: false
                }
            }
        }
        init();
        $scope.ok = function() {
            if ($scope.editGroupForm.$valid) {
                $uibModalInstance.close($scope.info);
            } else {
                $scope.submited = true;
            }
        };

        $scope.cancel = function() {
            //$uibModalInstance.dismiss(false);
            $uibModalInstance.close(false);
        };
    }

    ApiRecoverModalCtrl.$inject = ['$scope', '$uibModalInstance', '$filter', 'input'];
    /**
     * @function [恢复api弹窗] [Restore api pop window]
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $uibModalInstance [注入$uibModalInstance服务] [Injection $uibModalInstance service]
     * @service  $filter [注入过滤器服务]  [inject filter service]
     * @param    {[obj]}   input [{group:分组 Grouping}]
     */
    function ApiRecoverModalCtrl($scope, $uibModalInstance, $filter, input) {
        $scope.data = {
            input: input,
            output: {
                groupID: '',
                childGroupID: ''
            },
            fun: {
                change: null, 
            }
        }
        var data = {
            fun: {
                init: null, //初始化功能函数
            }
        }
        $scope.data.fun.change = function() {
            for (var i = 0; i < $scope.data.input.group.parent.length; i++) {
                var val = $scope.data.input.group.parent[i];
                if (val.groupID == $scope.data.output.groupID) {
                    $scope.data.input.group.child = [{
                        groupID: -1,
                        groupName: $filter('translate')('3915')
                    }].concat(val.childGroupList);
                    $scope.data.output.childGroupID = -1;
                    break;
                }
            }
        }
        data.fun.init = (function() {
            $scope.data.output.groupID = $scope.data.input.group.parent[0].groupID;
            $scope.data.input.group.child = [{
                groupID: -1,
                groupName: $filter('translate')('3915')
            }].concat($scope.data.input.group.parent[0].childGroupList);
            $scope.data.output.childGroupID = -1;
        })()
        $scope.ok = function() {
            var template = {
                callback: {
                    groupID: $scope.data.output.childGroupID == -1 ? $scope.data.output.groupID : $scope.data.output.childGroupID
                }
            }
            $uibModalInstance.close(template.callback);
        };

        $scope.cancel = function() {
            //$uibModalInstance.dismiss(false);
            $uibModalInstance.close(false);
        };
    }

    TableModalCtrl.$inject = ['$scope', '$uibModalInstance', 'title', 'info', 'databaseID'];
    /**
     * @function [编辑表弹窗] [Edit the table]
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $uibModalInstance [注入$uibModalInstance服务] [Injection $uibModalInstance service]
     * @param    {[string]}   title [弹窗标题 Pop-up title]
     * @param    {[obj]}   info [表信息 Table information]
     * @param    {[string]}   databaseID [数据库ID Database ID]
     */
    function TableModalCtrl($scope, $uibModalInstance, title, info, databaseID) {
        var vm = this;
        $scope.title = title;
        $scope.info = {
            dbID: databaseID,
            tableID: '',
            tableName: '',
            tableDescription: '',
            isAdd: true
        }

        function init() {
            if (info) {
                $scope.info = {
                    dbID: databaseID,
                    tableID: info.tableID,
                    tableName: info.tableName,
                    tableDescription: info.tableDescription,
                    isAdd: false
                }
            }
        }
        init();
        $scope.ok = function() {
            if ($scope.editTableForm.$valid) {
                $uibModalInstance.close($scope.info);
            } else {
                $scope.submited = true;
            }
        };

        $scope.cancel = function() {
            //$uibModalInstance.dismiss(false);
            $uibModalInstance.close(false);
        };
    }

    CodeModalCtrl.$inject = ['$scope', '$uibModalInstance', 'ApiManagementResource', '$rootScope', '$filter', 'CODE', 'title', 'info', 'GroupService'];
    /**
     * @function [编辑状态码弹窗] [Edit status code]
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $rootScope [注入根作用域服务] [Injection rootScope service]
     * @service  $uibModalInstance [注入$uibModalInstance服务] [Injection $uibModalInstance service]
     * @service  ApiManagementResource [注入数据库管理接口服务] [inject ApiManagement API service]
     * @service  $filter [注入过滤器服务] [inject filter service]
     * @service  GroupService [注入GroupService服务] [inject GroupService service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     * @param    {[string]}   title [弹窗标题 Pop-up title]
     * @param    {[obj]}   info [状态码信息 Status code information]
     * @param    {[string]}   databaseID [数据库ID Database ID]
     */
    function CodeModalCtrl($scope, $uibModalInstance, ApiManagementResource, $rootScope, $filter, CODE, title, info, GroupService) {
        var code = CODE.COMMON.SUCCESS;
        var codeGroup = GroupService.get();
        $scope.title = title;
        var data = {
            interaction: {
                version: info.version || 0 
            }
        }
        $scope.info = {
            projectID: info.projectID,
            groupID: parseInt(info.groupID),
            childGroupID: parseInt(info.childGroupID) || -1,
            code: '',
            codeDesc: '',
            isAdd: true
        }
        $scope.query = [];
        $scope.childGroup = [{
            groupID: -1,
            groupName: $filter('translate')('3915')
        }];
        var initChildGroup = [{
            groupID: -1,
            groupName: $filter('translate')('3915')
        }];

        function init() {
            $scope.query = codeGroup;
            if (info.groupID == -1) {
                $scope.info.groupID = $scope.query[0].groupID;
                $scope.childGroup = initChildGroup.concat($scope.query[0].childGroupList);
                $scope.info.childGroupID = -1;
            } else {
                if (!!info.parentGroupID) {
                    $scope.info.groupID = parseInt(info.parentGroupID);
                }
                for (var i = 0; i < $scope.query.length; i++) {
                    var val = $scope.query[i];
                    if (val.groupID == $scope.info.groupID) {
                        $scope.childGroup = initChildGroup.concat(val.childGroupList);
                        break;
                    }
                }
            }
            if (info.codeID) {
                $scope.info = {
                    companyID: info.companyID,
                    projectID: info.projectID,
                    groupID: !!info.parentGroupID ? parseInt(info.parentGroupID) : parseInt(info.groupID),
                    childGroupID: !!info.parentGroupID ? parseInt(info.groupID) : -1,
                    codeID: info.codeID,
                    code: info.code,
                    codeDesc: info.codeDescription,
                    isAdd: false
                }
            }

        }
        init();
        $scope.changeChildGroup = function() {
            for (var i = 0; i < $scope.query.length; i++) {
                var val = $scope.query[i];
                if (val.groupID == $scope.info.groupID) {
                    $scope.childGroup = initChildGroup.concat(val.childGroupList);
                    $scope.info.childGroupID = -1;
                    break;
                }
            }
        }
        $scope.keep = function() {
            var template = {
                request: {
                    companyID: $scope.info.companyID,
                    projectID: $scope.info.projectID,
                    groupID: $scope.info.childGroupID > 0 ? $scope.info.childGroupID : $scope.info.groupID,
                    codeDesc: $scope.info.codeDesc,
                    code: $scope.info.code
                },
                promise: null
            }
            if ($scope.editProjectForm.$valid) {
                template.promise = ApiManagementResource.Code.Add(template.request).$promise;
                template.promise.then(function(data) {
                    if (code == data.statusCode) {
                        $rootScope.InfoModal($filter('translate')('3912'), 'success');
                        $scope.submited = false;
                        $scope.info = {
                            projectID: $scope.info.projectID,
                            groupID: info.groupID == -1 ? $scope.query[0].groupID : parseInt(info.groupID),
                            childGroupID: info.childGroupID ? parseInt(info.childGroupID) : -1,
                            code: '',
                            codeDesc: '',
                            isAdd: true
                        }
                        for (var i = 0; i < $scope.query.length; i++) {
                            var val = $scope.query[i];
                            if (val.groupID == info.groupID) {
                                $scope.childGroup = initChildGroup.concat(val.childGroupList);
                                break;
                            }
                        }
                    } else {
                        $scope.submited = true;
                    }
                });
            } else {
                $scope.submited = true;
            }
        }
        $scope.ok = function() {
            var template = {
                request: {
                    companyID: $scope.info.companyID,
                    projectID: $scope.info.projectID,
                    groupID: $scope.info.childGroupID > 0 ? $scope.info.childGroupID : $scope.info.groupID,
                    codeID: $scope.info.codeID,
                    codeDesc: $scope.info.codeDesc,
                    code: $scope.info.code
                },
                promise: null
            }
            if ($scope.editProjectForm.$valid) {
                if ($scope.info.isAdd) {
                    template.promise = ApiManagementResource.Code.Add(template.request).$promise;
                    template.promise.then(function(data) {
                        if (code == data.statusCode) {
                            $uibModalInstance.close(true);
                        } else {
                            $scope.submited = true;
                        }
                    });
                } else {
                    template.promise = ApiManagementResource.Code.Update(template.request).$promise;
                    template.promise.then(function(data) {
                        if (code == data.statusCode || data.statusCode == CODE.STATUS_CODE.ERROR) {
                            $uibModalInstance.close(true);
                        } else {
                            $scope.submited = true;
                        }
                    });
                }
            } else {
                $scope.submited = true;
            }
        };

        $scope.cancel = function() {
            //$uibModalInstance.dismiss(false);
            $uibModalInstance.close(false);
        };
    }


})();
