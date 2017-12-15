(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [参数显示过滤器] [Parameter display filter]
     * @version  3.0.2
     * @service  $sce [注入$sce服务] [Inject $sce service]
     * @service  $filter [注入过滤器服务] [Inject filter service]
     */
    angular.module('eolinker.filter')

    /**
     * @function [参数层级显示过滤器] [Parameter level display filter]
     * @param    {[array]}   input    [需过滤参数 Filter parameters are required] 
     * @return   {[array]}            [处理后的参数 Processed parameters]
     */
    .filter('paramLevelFilter', ['$sce', '$filter', function($sce, $filter) {
        var data = {
            info: {
                timer: {
                    start: null,
                    end: null
                }
            },
            fun: {
                main: null, 
            }
        }
        /**
         * @function [主操作功能函数] [Main operation]
         * @param    {[obj]}   arg [需过滤参数 Filter parameters are required]
         * @return   {[array]}       [处理后的参数 Processed parameters]
         */
        data.fun.main = function(arg) {
            var template = {
                origin: [],
                array: {
                    parent: arg.parent || [], //父存储位置数组（字符串）Parent storage location array (string)
                    child: [], //子存储位置数组（json）Sub storage location array (json)
                    item: [], //临时切割变量存放数组 Temporarily cut variables to store arrays
                },
                loopVar: {
                    $index: 0,
                    length: 0
                },
                oldLength: arg.oldLength || 0,
                $account: 0,
                result: arg.result || []
            }
            angular.copy(arg.input, template.origin);
            for (template.$account = template.origin.length - 1; template.$account >= 0; template.$account--) {
                var val = template.origin[template.$account];
                val.paramKeyHtml = val.paramKey;
                template.array.item = (val.paramKeyHtml + '').split(/[:]{2}|[>]{2}/);
                template.loopVar.length = template.array.item.length;
                val.childAccount = val.childAccount || 0;
                switch (template.loopVar.length) {
                    case 1:
                        {
                            template.array.parent.splice(0, 0, template.array.item[0]);
                            template.result.splice(0, 0, val);
                            break;
                        }
                    default:
                        {
                            template.loopVar.$index = template.array.parent.indexOf(template.array.item.slice(0,template.loopVar.length - 1).join('>>'));
                            if (template.loopVar.$index > -1) {
                                val.paramLevel = template.loopVar.length - 1;
                                val.paramKeyHtml = template.array.item[template.loopVar.length - 1];
                                template.result[template.loopVar.$index].childAccount++;
                                template.array.parent.splice(template.loopVar.$index + 1, 0, template.array.item.join('>>'));
                                template.result.splice(template.loopVar.$index + 1, 0, val);
                            } else {
                                template.array.child.splice(0, 0, val);
                            }
                            break;
                        }
                }
            }

            if (template.array.child.length > 0 && template.oldLength != template.array.child.length) {
                template.result = data.fun.main({ input: template.array.child, result: template.result, parent: template.array.parent, oldLength: template.array.child.length })
            } else if (template.array.child.length > 0) {
                template.result = template.result.concat(template.array.child);
            }
            return template.result;
        }
        return function(input) {
            return data.fun.main({ input: input });
        }
    }])
    
    /**
     * @function [参数列表转换json过滤器] [Parameter list conversion json filter]
     * @param    {[array]}   input     [参数列表 parameter list]
     * @return   {[string]}            [json字符串 json string]
     */
    .filter('paramLevelToJsonFilter', ['$sce', '$filter', function($sce, $filter) {
        var data = {
            fun: {
                main: null, 
                loop: null, 
                typeof: null, 
            }
        }
        /**
         * @function [判别类型功能函数] [Discriminant type]
         * @param    {[obj]}   object [需判断的对象 Need to judge the object]
         * @return   {[string]}          [类型 Types of]
         */
        data.fun.typeof = function(object) {
            var tf = typeof object,
                ts = Object.prototype.toString.call(object);
            return null === object ? 'Null' :
                'undefined' == tf ? 'Undefined' :
                'boolean' == tf ? 'Boolean' :
                'number' == tf ? 'Number' :
                'string' == tf ? 'String' :
                '[object Function]' == ts ? 'Function' :
                '[object Array]' == ts ? 'Array' :
                '[object Date]' == ts ? 'Date' : 'Object';
        }

        /**
         * @function [自循环嵌入子级功能函数] [Self - cyclic embedding of sub - functions]
         * @param    {[obj]}   object [{array:经过分割的参数名数组 An array of parameter names,parent:父节点 Parent node}]
         */
        data.fun.loop = function(arg) {
            var template = {
                loop: {
                    array: {
                        item: arg.array.item.slice(1, arg.array.item.length),
                    },
                    parent: {
                        name: arg.parent.name,
                        object: arg.parent.object
                    },
                    key: arg.key
                }
            }
            if (arg.array.item.length > 0) {
                if (arg.array.item[0] == arg.parent.name) {
                    if (data.fun.typeof(template.loop.parent.object[arg.array.item[0]]) == 'Array') {
                        var length = template.loop.parent.object[arg.array.item[0]].length >= 1 ? template.loop.parent.object[arg.array.item[0]].length - 1 : 0;
                        if (data.fun.typeof(template.loop.parent.object[arg.array.item[0]][length]) == 'Undefined') {
                            template.loop.parent.object[arg.array.item[0]][length] = {};
                        } else if (data.fun.typeof(template.loop.parent.object[arg.array.item[0]][length]) != 'Object') {
                            length++;
                            template.loop.parent.object[arg.array.item[0]][length] = {};
                        }
                        template.loop.parent.object[arg.array.item[0]][length][arg.key.name] = arg.key.value;
                    } else if (data.fun.typeof(template.loop.parent.object[arg.array.item[0]]) == 'Object') {
                        template.loop.parent.object[arg.array.item[0]][arg.key.name] = arg.key.value;
                    } else {
                        template.loop.parent.object[arg.array.item[0]] = {};
                        template.loop.parent.object[arg.array.item[0]][arg.key.name] = arg.key.value;
                    }
                } else {
                    if (data.fun.typeof(template.loop.parent.object[arg.array.item[0]]) == 'Array') {
                        template.loop.parent.object = template.loop.parent.object[arg.array.item[0]][0];
                    } else {
                        if (data.fun.typeof(template.loop.parent.object[arg.array.item[0]]) != 'Object') {
                            template.loop.parent.object[arg.array.item[0]] = {};
                        }
                        template.loop.parent.object = template.loop.parent.object[arg.array.item[0]];
                    }
                    data.fun.loop(template.loop);
                }
            } else {
                template.loop.parent.object = arg.key.value;
            }
        }

        /**
         * @function [主操作功能函数] [Main operation]
         * @param    {[obj]}   arg [{input:参数列表 parameter list,parent:父节点 parameter list,result:上一轮循环的返回结果 Returns the result of the last round of the cycle}]
         */
        data.fun.main = function(arg) {
            var template = {
                loopObject: null,
                array: {
                    parent: arg.parent || [], //父存储位置数组（字符串）Parent storage location array (string)
                    child: [], //子存储位置数组（json） Sub storage location array (json)
                    item: [], //临时切割变量存放数组 Temporarily cut variables to store arrays
                },
                loopVar: {
                    $index: 0,
                    length: 0
                },
                icon: {
                    child: false,
                    parent: false
                },
                result: arg.result || {}
            }
            angular.forEach(arg.input, function(val, key) {
                template.array.item = (val.paramKey + '').split(/[:]{2}|[>]{2}/);
                template.loopVar.length = template.array.item.length;
                try {
                    val.paramInfo = val.type == 12 ? JSON.parse(val.paramInfo) : val.paramInfo;
                } catch (e) {
                    val.paramInfo = val.type == 12 ? [] : val.paramInfo;
                }
                if (val.checkbox) {
                    switch (template.loopVar.length) {
                        case 1:
                            {
                                if (template.array.item[0]) {
                                    template.array.parent.push(template.array.item[0]);
                                    template.result[template.array.item[0]] = val.paramInfo;
                                    template.icon.parent = true;
                                }
                                break;
                            }
                        default:
                            {
                                template.loopVar.$index = template.array.parent.indexOf(template.array.item[template.loopVar.length - 2]);
                                if (template.loopVar.$index > -1) {
                                    template.array.parent.push(template.array.item[template.loopVar.length - 1]);
                                    template.loopObject = {
                                        array: {
                                            item: template.array.item,
                                        },
                                        parent: {
                                            name: template.array.item[template.loopVar.length - 2],
                                            object: template.result
                                        },
                                        key: {
                                            name: template.array.item[template.loopVar.length - 1],
                                            value: val.paramInfo || ''
                                        }
                                    }
                                    data.fun.loop(template.loopObject);
                                    template.icon.parent = true;
                                } else {
                                    template.array.child.push(val);
                                    template.icon.child = true;
                                }
                                break;
                            }
                    }
                }
            })
            if (template.icon.parent && template.icon.child) {
                template.result = data.fun.main({ input: template.array.child, result: template.result, parent: template.array.parent })
            } else if (template.icon.child) {
                angular.forEach(template.array.child, function(val, key) {
                    template.result[val.paramKey] = val.paramInfo || '';
                })
            }
            return template.result;
        }
        return function(input) {
            var template = {
                input:[],
                output: '',
                match: []
            }
            angular.copy(input,template.input);
            template.output=JSON.stringify(data.fun.main({ input: template.input }));
            template.match = template.output.match(/:"(([1-9]\d*)|0)(\.\d*[1-9])?"/g);
            angular.forEach(template.match, function(val, key) {
                if (data.fun.typeof(val) != 'String') return;
                template.output = template.output.replace(eval('/' + val + '/g'), val.replace(/"/g, ''));
            })
            return template.output;
        }
    }])

})();
