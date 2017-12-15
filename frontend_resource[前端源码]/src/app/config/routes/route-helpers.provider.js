(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [路由帮助服务] [Routing help service]
     * @version  3.0.2
     * @service  APP_REQUIRES [注入加载应用常量] [inject Loading application constant service]
     * @return  data.fun [服务相关方法] [Service correlation method]
     */
    angular
        .module('eolinker')
        .provider('RouteHelpers', RouteHelpersProvider)

    RouteHelpersProvider.$inject = ['APP_REQUIRES'];

    function RouteHelpersProvider(APP_REQUIRES) {
        /* jshint validthis:true */
        var data = {
            info:{
                query:{
                    MODULES:APP_REQUIRES.MODULES,
                    SCRIPTS:{}
                }
            },
            fun: {
                basepath: null, // Set here the base of the relative path;for all app views
                resolveFor: null, // Generates a resolve object by passing script names;previously configured in constant.APP_REQUIRES
            }
        }

        data.fun.$get = function() {
            return {
                basepath: data.fun.basepath,
                resolveFor: data.fun.resolveFor
            };
        }

        /**
         * @function [配置基础路径功能模块] [Configuring the basic path function module]
         * @param    {[string]}   uri [原始路径 original path]
         * @return   {[string]}       [基础路径 Basic path]
         */
        data.fun.basepath = function(uri) {
            return 'app/' + uri;
        }

        /**
         * @function [按需加载功能模块] [Load function module on demand]
         * @return   {[function]}       [按需加载函数体 Loading functions on demand]
         */
        data.fun.resolveFor = function() {
            var _args = arguments;
            return {
                deps: ['$ocLazyLoad', '$q', function($ocLL, $q) {
                    // Creates a promise chain for each argument
                    var promise = $q.when(1); // empty promise
                    for (var i = 0, len = _args.length; i < len; i++) {
                        promise = andThen(_args[i]);
                    }
                    return promise;

                    // creates promise to chain dynamically
                    function andThen(_arg) {
                        // also support a function that returns a promise
                        if (typeof _arg === 'function')
                            return promise.then(_arg);
                        else
                            return promise.then(function() {
                                // if is a module, pass the name. If not, pass the array
                                var whatToLoad = getRequired(_arg);
                                // simple error check
                                if (!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                                // finally, return a promise
                                return $ocLL.load(whatToLoad);
                            });
                    }
                    // check and returns required data
                    // analyze module items with the form [name: '', files: []]
                    // and also simple array of script files (for not angular js)
                    function getRequired(name) {
                        if (data.info.query.MODULES)
                            for (var m in data.info.query.MODULES)
                                if (data.info.query.MODULES[m].name && data.info.query.MODULES[m].name === name)
                                    return data.info.query.MODULES[m];
                        return data.info.query.SCRIPTS && data.info.query.SCRIPTS[name];
                    }

                }]
            };
        }
        return data.fun;
    }


})();
