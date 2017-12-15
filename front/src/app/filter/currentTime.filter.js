(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [计算当前时间过滤器] [Calculate the current time filter]
     * @version  3.0.2
     */
    angular.module('eolinker.filter')
    .filter('currentTimeFilter', [function() {
        return function() {
            var data={
                fun:{
                    getTime:null
                }
            }
            /**
             * @function [获取当前时间功能函数] [Get the current time function function]
             * @return   {[string]}   [当前时间 current time]
             */
            data.fun.getTime = function() {
                var template={
                    info:{
                        date:new Date(),
                        time:{
                            year:null,
                            month:null,
                            day:null,
                            hour:null,
                            minute:null,
                            second:null
                        },
                        string:null//结果存储字符串 The result stores the string
                    }
                }
                template.info.time.year = template.info.date.getFullYear(); 
                template.info.time.month = template.info.date.getMonth() + 1; 
                template.info.time.day = template.info.date.getDate(); 

                template.info.time.hour = template.info.date.getHours(); 
                template.info.time.minute = template.info.date.getMinutes();
                template.info.time.second = template.info.date.getSeconds();

                template.info.string = template.info.time.year + "-";

                if (template.info.time.month < 10)
                    template.info.string += "0";

                template.info.string += template.info.time.month + "-";

                if (template.info.time.day < 10)
                    template.info.string += "0";

                template.info.string += template.info.time.day + " ";

                if (template.info.time.hour < 10)
                    template.info.string += "0";

                template.info.string += template.info.time.hour + ":";
                if (template.info.time.minute < 10) template.info.string += '0';
                template.info.string += template.info.time.minute + ":";
                if (template.info.time.second < 10) template.info.string += '0';
                template.info.string += template.info.time.second;
                return (template.info.string);
            }
            return data.fun.getTime();
        }
    }])

})();
