(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [HTTP相关常量集] [HTTP related constant sets]
     * @version  3.0.2
     */
    angular
        .module('eolinker.constant')
        .constant('HTTP_CONSTANT', {
            REQUEST_HEADER: [//请求头部常量 Request header constant
                'Accept', 'Accept-Charset', 'Accept-Encoding', 'Accept-Language', 'Accept-Ranges', 'Authorization',
                'Cache-Control', 'Connection', 'Cookie', 'Content-Length', 'Content-Type', 'Content-MD5',
                'Date',
                'Expect',
                'From',
                'Host',
                'If-Match', 'If-Modified-Since', 'If-None-Match', 'If-Range', 'If-Unmodified-Since',
                'Max-Forwards',
                'Origin',
                'Pragma', 'Proxy-Authorization',
                'Range', 'Referer',
                'TE',
                'Upgrade', 'User-Agent',
                'Via',
                'Warning'
            ],
            REQUEST_PARAM: [//常用请求参数 Common request parameters
                '11位中国大陆手机号',
                '纯数字',
                '纯英文字母',
                '数字、英文',
                '数字、英文、下划线',
                '数字、英文、特殊符号',
                '非中文字符',
                '邮箱地址'
            ]
        })
})();
