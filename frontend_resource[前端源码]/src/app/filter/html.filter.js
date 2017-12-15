(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [HTML相关过滤器] [HTML related filters]
     * @version  3.0.2
     */
    angular.module('eolinker.filter')

    /**
     * @function [HTML解码过滤器] [HTML decoding filter]
     * @param {[string]} text [需过滤的html字符串] [Need to filter the html string]
     * @return   {[string]}   [解码后的html字符串] The decoded html string
     */
    .filter('HtmlFilter', function() {
        return function(input) {
            var HtmlUtil = {
                /**
                 * @function [用浏览器内部转换器实现html解码]
                 * @param    {[string]}   text [需过滤的html字符串] [Need to filter the html string]
                 * @return   {[string]}        [解码后的html字符串] The decoded html string
                 */
                htmlDecode: function(text) {
                    //1.首先动态创建一个容器标签元素，如DIV First, dynamically create a container tag element, such as DIV
                    var temp = document.createElement("div");
                    //2.然后将要转换的字符串设置为这个元素的innerHTML（ie，火狐，google都支持）And then set the string to be converted to this element's innerHTML (ie, Firefox, google support)
                    temp.innerHTML = text;
                    //3.最后返回这个元素的innerText（ie支持）或者textContent（火狐，google支持），即得到经过HTML解码的字符串了。Finally return this element's innerText (ie support) or textContent (Firefox, google support), that is, through the HTML decoding of the string.

                    var output = temp.innerText || temp.textContent;
                    temp = null;

                    return output;

                },
                /**
                 * @function [用正则表达式实现html解码] [Realize html decoding with regular expression]
                 * @param    {[string]}   str [需过滤的html字符串 Need to filter the html string] 
                 * @return   {[string]}        [解码后的html字符串 The decoded html string]
                 */
                htmlDecodeByRegExp: function(str) {

                    var s = "";

                    if (str.length == 0) return "";


                    s = str.replace(/&lt;/g, "<");
                    s = s.replace(/&gt;/g, ">");
                    s = s.replace(/&amp;/g, "&");
                    s = s.replace(/&nbsp;/g, " ");
                    //s = s.replace(/&#39;/g, "\\\'");
                    s = s.replace(/&quot;/g, "\\\"");
                    s = s.replace(/&#65279;/g, "");
                    s = s.replace(/(\\\\ufeff)/g, "");
                    return s;

                }
            };
            return HtmlUtil.htmlDecodeByRegExp(input);
        }
    })
    
    /**
     * @function [HTML转码过滤器] [HTML transcoding filter]
     * @param {[string]} html [需过滤的html字符串 Need to filter the html string]
     * @return   {[string]}   [转码后的html字符串 Transcoded html string]
     */
    .filter('HtmlEncodeFilter', function() {
        return function(input) {
            var HtmlUtil = {
                /**
                 * @function [用浏览器内部转换器实现html转码] [Realize html transcoding with the browser internal converter]
                 * @param    {[string]}   html [需过滤的html字符串 Need to filter the html string] 
                 * @return   {[string]}        [转码后的html字符串 Transcoded html string]
                 */
                htmlEncode: function(html) {
                    //1.首先动态创建一个容器标签元素，如DIV First, dynamically create a container tag element, such as DIV
                    var temp = document.createElement("div");
                    //2.然后将要转换的字符串设置为这个元素的innerText（ie支持）或者textContent（火狐，google支持）And then set the string to be converted to this element's innerText (ie support) or textContent (Firefox, google support)
                    (temp.textContent != undefined) ? (temp.textContent = html) : (temp.innerText = html);
                    //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了 Finally return this element's innerHTML, that is, through the HTML code conversion string

                    var output = temp.innerHTML;
                    temp = null;

                    return output;

                },
                /**
                 * @function [用正则表达式实现html转码] [Realize html transcoding with regular expression]
                 * @param    {[string]}   str [需过滤的html字符串 Need to filter the html string]
                 * @return   {[string]}        [转码后的html字符串 Transcoded html string]
                 */
                htmlEncodeByRegExp: function(str) {

                    var s = "";

                    if (str.length == 0) return "";
                    s = str.replace(/&/g, "&amp;");
                    s = s.replace(/</g, "&lt;");
                    s = s.replace(/>/g, "&gt;");
                    s = s.replace(/ /g, "&nbsp;");
                    s = s.replace(/\'/g, "&#39;");
                    s = s.replace(/\\\"/g, "&quot;");

                    return s;

                }
            };
            return HtmlUtil.htmlEncodeByRegExp(input);
        }
    })
    
    /**
     * @function [xss过滤器] [xss filter]
     * @param    {[string]}   input    [需过滤的html字符串 Need to filter the html string]
     * @param    {[obj]}   options [相关配置 Related configuration]
     * @return   {[string]}        [过滤后的html字符串 Filtered html string]
     * 参考https://github.com/leizongmin/js-xss
     */
    .filter('XssFilter', function() {
        return function(input, options) {
            var FilterCSS = (function e(t, n, r) {
                function s(o, u) {
                    if (!n[o]) {
                        if (!t[o]) {
                            var a = typeof require == "function" && require;
                            if (!u && a) return a(o, !0);
                            if (i) return i(o, !0);
                            var f = new Error("Cannot find module '" + o + "'");
                            throw f.code = "MODULE_NOT_FOUND", f
                        }
                        var l = n[o] = { exports: {} };
                        t[o][0].call(l.exports, function(e) {
                            var n = t[o][1][e];
                            return s(n ? n : e)
                        }, l, l.exports, e, t, n, r)
                    }
                    return n[o].exports
                }
                var i = typeof require == "function" && require;
                for (var o = 0; o < r.length; o++) s(r[o]);
                return s
            })({
                1: [function(require, module, exports) {
                    /**
                     * 默认配置 default allocation
                     */

                    var FilterCSS = require('cssfilter').FilterCSS;
                    var getDefaultCSSWhiteList = require('cssfilter').getDefaultWhiteList;
                    var _ = require('./util');

                    // 默认白名单 Default white list
                    function getDefaultWhiteList() {
                        return {
                            a: ['target', 'href', 'title'],
                            abbr: ['title'],
                            address: [],
                            area: ['shape', 'coords', 'href', 'alt'],
                            article: [],
                            aside: [],
                            audio: ['autoplay', 'controls', 'loop', 'preload', 'src'],
                            b: [],
                            bdi: ['dir'],
                            bdo: ['dir'],
                            big: [],
                            blockquote: ['cite'],
                            br: [],
                            caption: [],
                            center: [],
                            cite: [],
                            code: [],
                            col: ['align', 'valign', 'span', 'width'],
                            colgroup: ['align', 'valign', 'span', 'width'],
                            dd: [],
                            del: ['datetime'],
                            details: ['open'],
                            div: [],
                            dl: [],
                            dt: [],
                            em: [],
                            font: ['color', 'size', 'face'],
                            footer: [],
                            h1: [],
                            h2: [],
                            h3: [],
                            h4: [],
                            h5: [],
                            h6: [],
                            header: [],
                            hr: [],
                            i: [],
                            img: ['src', 'alt', 'title', 'width', 'height'],
                            ins: ['datetime'],
                            li: [],
                            mark: [],
                            nav: [],
                            ol: [],
                            p: [],
                            pre: [],
                            s: [],
                            section: [],
                            small: [],
                            span: [],
                            sub: [],
                            sup: [],
                            strong: [],
                            table: ['width', 'border', 'align', 'valign'],
                            tbody: ['align', 'valign'],
                            td: ['width', 'rowspan', 'colspan', 'align', 'valign'],
                            tfoot: ['align', 'valign'],
                            th: ['width', 'rowspan', 'colspan', 'align', 'valign'],
                            thead: ['align', 'valign'],
                            tr: ['rowspan', 'align', 'valign'],
                            tt: [],
                            u: [],
                            ul: [],
                            video: ['autoplay', 'controls', 'loop', 'preload', 'src', 'height', 'width']
                        };
                    }

                    // 默认CSS Filter Default CSS Filter
                    var defaultCSSFilter = new FilterCSS();

                    /**
                     * 匹配到标签时的处理方法
                     * Match the way to the label 
                     * @param {String} tag
                     * @param {String} html
                     * @param {Object} options
                     * @return {String}
                     */
                    function onTag(tag, html, options) {
                        // do nothing
                    }

                    /**
                     * 匹配到不在白名单上的标签时的处理方法
                     * Match the method when the label is not on the white list
                     * @param {String} tag
                     * @param {String} html
                     * @param {Object} options
                     * @return {String}
                     */
                    function onIgnoreTag(tag, html, options) {
                        // do nothing
                    }

                    /**
                     * 匹配到标签属性时的处理方法
                     * The method of handling when matching the label attribute
                     * @param {String} tag
                     * @param {String} name
                     * @param {String} value
                     * @return {String}
                     */
                    function onTagAttr(tag, name, value) {
                        // do nothing
                    }

                    /**
                     * 匹配到不在白名单上的标签属性时的处理方法
                     * Match the method when the label attribute is not on the whitelist
                     * @param {String} tag
                     * @param {String} name
                     * @param {String} value
                     * @return {String}
                     */
                    function onIgnoreTagAttr(tag, name, value) {
                        // do nothing
                    }

                    /**
                     * HTML转义
                     * HTML escapes
                     * @param {String} html
                     */
                    function escapeHtml(html) {
                        return html.replace(REGEXP_LT, '&lt;').replace(REGEXP_GT, '&gt;');
                    }

                    /**
                     * 安全的标签属性值
                     * Secure label attribute values
                     * @param {String} tag
                     * @param {String} name
                     * @param {String} value
                     * @param {Object} cssFilter
                     * @return {String}
                     */
                    function safeAttrValue(tag, name, value, cssFilter) {
                        // 转换为友好的属性值，再做判断 Converted to a friendly attribute value, and then make judgments
                        value = friendlyAttrValue(value);

                        if (name === 'href' || name === 'src') {
                            // 过滤 href 和 src 属性 Filter the href and src properties
                            // 仅允许 http:// | https:// | mailto: | / | # 开头的地址 Only allow http: // | https: // | mailto: | / | # at the beginning of the address
                            value = _.trim(value);
                            if (value === '#') return '#';
                            if (!(value.substr(0, 7) === 'http://' ||
                                    value.substr(0, 8) === 'https://' ||
                                    value.substr(0, 7) === 'mailto:' ||
                                    value[0] === '#' ||
                                    value[0] === '/')) {
                                return '';
                            }
                        } else if (name === 'background') {
                            // 过滤 background 属性 （这个xss漏洞较老了，可能已经不适用）Filter the background attribute (this xss vulnerability is older, may not already apply)
                            // javascript:
                            REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
                            if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
                                return '';
                            }
                        } else if (name === 'style') {
                            /*REGEXP_DEFAULT_ON_TAG_ATTR_3.lastIndex = 0;
                            if (REGEXP_DEFAULT_ON_TAG_ATTR_3.test(value)) {
                              return '';
                            }*/
                            // expression()
                            REGEXP_DEFAULT_ON_TAG_ATTR_7.lastIndex = 0;
                            if (REGEXP_DEFAULT_ON_TAG_ATTR_7.test(value)) {
                                return '';
                            }
                            // url()
                            REGEXP_DEFAULT_ON_TAG_ATTR_8.lastIndex = 0;
                            if (REGEXP_DEFAULT_ON_TAG_ATTR_8.test(value)) {
                                REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
                                if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
                                    return '';
                                }
                            }
                            if (cssFilter !== false) {
                                cssFilter = cssFilter || defaultCSSFilter;
                                value = cssFilter.process(value);
                            }
                        }

                        value = escapeAttrValue(value);
                        return value;
                    }

                    // 正则表达式 Regular expression
                    var REGEXP_LT = /</g;
                    var REGEXP_GT = />/g;
                    var REGEXP_QUOTE = /"/g;
                    var REGEXP_QUOTE_2 = /&quot;/g;
                    var REGEXP_ATTR_VALUE_1 = /&#([a-zA-Z0-9]*);?/img;
                    var REGEXP_ATTR_VALUE_COLON = /&colon;?/img;
                    var REGEXP_ATTR_VALUE_NEWLINE = /&newline;?/img;
                    var REGEXP_DEFAULT_ON_TAG_ATTR_3 = /\/\*|\*\//mg;
                    var REGEXP_DEFAULT_ON_TAG_ATTR_4 = /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/ig;
                    var REGEXP_DEFAULT_ON_TAG_ATTR_5 = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:/ig;
                    var REGEXP_DEFAULT_ON_TAG_ATTR_6 = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:\s*image\//ig;
                    var REGEXP_DEFAULT_ON_TAG_ATTR_7 = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/ig;
                    var REGEXP_DEFAULT_ON_TAG_ATTR_8 = /u\s*r\s*l\s*\(.*/ig;

                    /**
                     * 对双引号进行转义
                     * Double quotes are escaped
                     * @param {String} str
                     * @return {String} str
                     */
                    function escapeQuote(str) {
                        return str.replace(REGEXP_QUOTE, '&quot;');
                    }

                    /**
                     * 对双引号进行转义
                     * Double quotes are escaped
                     * @param {String} str
                     * @return {String} str
                     */
                    function unescapeQuote(str) {
                        return str.replace(REGEXP_QUOTE_2, '"');
                    }

                    /**
                     * 对html实体编码进行转义
                     * The html entity code is escaped
                     * @param {String} str
                     * @return {String}
                     */
                    function escapeHtmlEntities(str) {
                        return str.replace(REGEXP_ATTR_VALUE_1, function replaceUnicode(str, code) {
                            return (code[0] === 'x' || code[0] === 'X') ? String.fromCharCode(parseInt(code.substr(1), 16)) : String.fromCharCode(parseInt(code, 10));
                        });
                    }

                    /**
                     * 对html5新增的危险实体编码进行转义
                     * Up to the new dangerous entity code for html5 escaping
                     * @param {String} str
                     * @return {String}
                     */
                    function escapeDangerHtml5Entities(str) {
                        return str.replace(REGEXP_ATTR_VALUE_COLON, ':')
                            .replace(REGEXP_ATTR_VALUE_NEWLINE, ' ');
                    }

                    /**
                     * 清除不可见字符
                     * Clear invisible characters
                     * @param {String} str
                     * @return {String}
                     */
                    function clearNonPrintableCharacter(str) {
                        var str2 = '';
                        for (var i = 0, len = str.length; i < len; i++) {
                            str2 += str.charCodeAt(i) < 32 ? ' ' : str.charAt(i);
                        }
                        return _.trim(str2);
                    }

                    /**
                     * 将标签的属性值转换成一般字符，便于分析
                     * Transform the attribute values of the tags into general characters for easy analysis
                     * @param {String} str
                     * @return {String}
                     */
                    function friendlyAttrValue(str) {
                        str = unescapeQuote(str); // 双引号 Double quotes
                        str = escapeHtmlEntities(str); // 转换HTML实体编码 Convert HTML entity code
                        str = escapeDangerHtml5Entities(str); // 转换危险的HTML5新增实体编码 Convert dangerous HTML5 new entity code
                        str = clearNonPrintableCharacter(str); // 清除不可见字符 Clear invisible characters
                        return str;
                    }

                    /**
                     * 转义用于输出的标签属性值
                     * Escape the value of the label attribute used for the output
                     * @param {String} str
                     * @return {String}
                     */
                    function escapeAttrValue(str) {
                        str = escapeQuote(str);
                        str = escapeHtml(str);
                        return str;
                    }

                    /**
                     * 去掉不在白名单中的标签onIgnoreTag处理方法 Remove the label in the white list onIgnoreTag processing method
                     */
                    function onIgnoreTagStripAll() {
                        return '';
                    }

                    /**
                     * 删除标签体
                     * Remove the tag body
                     * @param {array} tags 要删除的标签列表 List of tags to remove
                     * @param {function} next 对不在列表中的标签的处理函数，可选 For processing functions that are not in the list of tags, optional
                     */
                    function StripTagBody(tags, next) {
                        if (typeof(next) !== 'function') {
                            next = function() {};
                        }

                        var isRemoveAllTag = !Array.isArray(tags);

                        function isRemoveTag(tag) {
                            if (isRemoveAllTag) return true;
                            return (_.indexOf(tags, tag) !== -1);
                        }

                        var removeList = []; // 要删除的位置范围列表 List of location ranges to remove
                        var posStart = false; // 当前标签开始位置 Current label start position

                        return {
                            onIgnoreTag: function(tag, html, options) {
                                if (isRemoveTag(tag)) {
                                    if (options.isClosing) {
                                        var ret = '[/removed]';
                                        var end = options.position + ret.length;
                                        removeList.push([posStart !== false ? posStart : options.position, end]);
                                        posStart = false;
                                        return ret;
                                    } else {
                                        if (!posStart) {
                                            posStart = options.position;
                                        }
                                        return '[removed]';
                                    }
                                } else {
                                    return next(tag, html, options);
                                }
                            },
                            remove: function(html) {
                                var rethtml = '';
                                var lastPos = 0;
                                _.forEach(removeList, function(pos) {
                                    rethtml += html.slice(lastPos, pos[0]);
                                    lastPos = pos[1];
                                });
                                rethtml += html.slice(lastPos);
                                return rethtml;
                            }
                        };
                    }

                    /**
                     * 去除备注标签
                     * Remove the Remark tab
                     * @param {String} html
                     * @return {String}
                     */
                    function stripCommentTag(html) {
                        return html.replace(STRIP_COMMENT_TAG_REGEXP, '');
                    }
                    var STRIP_COMMENT_TAG_REGEXP = /<!--[\s\S]*?-->/g;

                    /**
                     * 去除不可见字符
                     * Remove invisible characters
                     * @param {String} html
                     * @return {String}
                     */
                    function stripBlankChar(html) {
                        var chars = html.split('');
                        chars = chars.filter(function(char) {
                            var c = char.charCodeAt(0);
                            if (c === 127) return false;
                            if (c <= 31) {
                                if (c === 10 || c === 13) return true;
                                return false;
                            }
                            return true;
                        });
                        return chars.join('');
                    }


                    exports.whiteList = getDefaultWhiteList();
                    exports.getDefaultWhiteList = getDefaultWhiteList;
                    exports.onTag = onTag;
                    exports.onIgnoreTag = onIgnoreTag;
                    exports.onTagAttr = onTagAttr;
                    exports.onIgnoreTagAttr = onIgnoreTagAttr;
                    exports.safeAttrValue = safeAttrValue;
                    exports.escapeHtml = escapeHtml;
                    exports.escapeQuote = escapeQuote;
                    exports.unescapeQuote = unescapeQuote;
                    exports.escapeHtmlEntities = escapeHtmlEntities;
                    exports.escapeDangerHtml5Entities = escapeDangerHtml5Entities;
                    exports.clearNonPrintableCharacter = clearNonPrintableCharacter;
                    exports.friendlyAttrValue = friendlyAttrValue;
                    exports.escapeAttrValue = escapeAttrValue;
                    exports.onIgnoreTagStripAll = onIgnoreTagStripAll;
                    exports.StripTagBody = StripTagBody;
                    exports.stripCommentTag = stripCommentTag;
                    exports.stripBlankChar = stripBlankChar;
                    exports.cssFilter = defaultCSSFilter;
                    exports.getDefaultCSSWhiteList = getDefaultCSSWhiteList;

                }, { "./util": 4, "cssfilter": 8 }],
                2: [function(require, module, exports) {
                    /**
                     * 模块入口 Module entry
                     */

                    var DEFAULT = require('./default');
                    var parser = require('./parser');
                    var FilterXSS = require('./xss');


                    /**
                     * XSS过滤
                     * SS filtering
                     * @param {String} html 要过滤的HTML代码 The HTML code to filter
                     * @param {Object} options 选项：whiteList, onTag, onTagAttr, onIgnoreTag, onIgnoreTagAttr, safeAttrValue, escapeHtml
                     * @return {String}
                     */
                    function filterXSS(html, options) {
                        var xss = new FilterXSS(options);
                        return xss.process(html);
                    }


                    // 输出 Output
                    exports = module.exports = filterXSS;
                    exports.FilterXSS = FilterXSS;
                    for (var i in DEFAULT) exports[i] = DEFAULT[i];
                    for (var i in parser) exports[i] = parser[i];


                    // 在浏览器端使用 Used at the browser side
                    if (typeof window !== 'undefined') {
                        window.filterXSS = module.exports;
                    }

                }, { "./default": 1, "./parser": 3, "./xss": 5 }],
                3: [function(require, module, exports) {
                    /**
                     * 简单 HTML Parser
                     */

                    var _ = require('./util');

                    /**
                     * 获取标签的名称
                     * Get the name of the tag
                     * @param {String} html 如：'<a hef="#">'
                     * @return {String}
                     */
                    function getTagName(html) {
                        var i = html.indexOf(' ');
                        if (i === -1) {
                            var tagName = html.slice(1, -1);
                        } else {
                            var tagName = html.slice(1, i + 1);
                        }
                        tagName = _.trim(tagName).toLowerCase();
                        if (tagName.slice(0, 1) === '/') tagName = tagName.slice(1);
                        if (tagName.slice(-1) === '/') tagName = tagName.slice(0, -1);
                        return tagName;
                    }

                    /**
                     * 是否为闭合标签
                     * Whether it is a closed label
                     * @param {String} html 如：'<a hef="#">'
                     * @return {Boolean}
                     */
                    function isClosing(html) {
                        return (html.slice(0, 2) === '</');
                    }

                    /**
                     * 分析HTML代码，调用相应的函数处理，返回处理后的HTML
                     * Analyze the HTML code, call the corresponding function to handle, and return the processed HTML
                     * @param {String} html
                     * @param {Function} onTag 处理标签的函数 A function that handles a tag
                     *   参数格式： function (sourcePosition, position, tag, html, isClosing)
                     * @param {Function} escapeHtml 对HTML进行转义的函数 A function that escapes HTML
                     * @return {String}
                     */
                    function parseTag(html, onTag, escapeHtml) {
                        'user strict';

                        var rethtml = ''; // 待返回的HTML The HTML to be returned
                        var lastPos = 0; // 上一个标签结束位置 On the end of a label
                        var tagStart = false; // 当前标签开始位置 Current label start position
                        var quoteStart = false; // 引号开始位置 Quotation marks start position
                        var currentPos = 0; // 当前位置 current location
                        var len = html.length; // HTML长度 HTML length
                        var currentHtml = ''; // 当前标签的HTML代码 The current tag's HTML code
                        var currentTagName = ''; // 当前标签的名称 The name of the current tag

                        // 逐个分析字符 Analyze characters one by one
                        for (currentPos = 0; currentPos < len; currentPos++) {
                            var c = html.charAt(currentPos);
                            if (tagStart === false) {
                                if (c === '<') {
                                    tagStart = currentPos;
                                    continue;
                                }
                            } else {
                                if (quoteStart === false) {
                                    if (c === '<') {
                                        rethtml += escapeHtml(html.slice(lastPos, currentPos));
                                        tagStart = currentPos;
                                        lastPos = currentPos;
                                        continue;
                                    }
                                    if (c === '>') {
                                        rethtml += escapeHtml(html.slice(lastPos, tagStart));
                                        currentHtml = html.slice(tagStart, currentPos + 1);
                                        currentTagName = getTagName(currentHtml);
                                        rethtml += onTag(tagStart,
                                            rethtml.length,
                                            currentTagName,
                                            currentHtml,
                                            isClosing(currentHtml));
                                        lastPos = currentPos + 1;
                                        tagStart = false;
                                        continue;
                                    }
                                    // HTML标签内的引号仅当前一个字符是等于号时才有效 The quotation marks in the HTML tag are valid only if the current character is equal to the number
                                    if ((c === '"' || c === "'") && html.charAt(currentPos - 1) === '=') {
                                        quoteStart = c;
                                        continue;
                                    }
                                } else {
                                    if (c === quoteStart) {
                                        quoteStart = false;
                                        continue;
                                    }
                                }
                            }
                        }
                        if (lastPos < html.length) {
                            rethtml += escapeHtml(html.substr(lastPos));
                        }

                        return rethtml;
                    }

                    // 不符合属性名称规则的正则表达式 A regular expression that does not conform to the attribute name rule
                    var REGEXP_ATTR_NAME = /[^a-zA-Z0-9_:\.\-]/img;

                    /**
                     * 分析标签HTML代码，调用相应的函数处理，返回HTML
                     *Analyze the tag HTML code, call the corresponding function to handle, and return the HTML
                     * @param {String} html 如标签'<a href="#" target="_blank">' 则为 'href="#" target="_blank"'
                     * @param {Function} onAttr 处理属性值的函数 A function that handles attribute values
                     *   函数格式： function (name, value)
                     * @return {String}
                     */
                    function parseAttr(html, onAttr) {
                        'user strict';

                        var lastPos = 0; // 当前位置 current location
                        var retAttrs = []; // 待返回的属性列表 The list of attributes to be returned
                        var tmpName = false; // 临时属性名称 Temporary attribute name
                        var len = html.length; // HTML代码长度 HTML code length

                        function addAttr(name, value) {
                            name = _.trim(name);
                            name = name.replace(REGEXP_ATTR_NAME, '').toLowerCase();
                            if (name.length < 1) return;
                            var ret = onAttr(name, value || '');
                            if (ret) retAttrs.push(ret);
                        };

                        // 逐个分析字符 Analyze characters one by one
                        for (var i = 0; i < len; i++) {
                            var c = html.charAt(i);
                            var v, j;
                            if (tmpName === false && c === '=') {
                                tmpName = html.slice(lastPos, i);
                                lastPos = i + 1;
                                continue;
                            }
                            if (tmpName !== false) {
                                // HTML标签内的引号仅当前一个字符是等于号时才有效 The quotation marks in the HTML tag are valid only if the current character is equal to the number
                                if (i === lastPos && (c === '"' || c === "'") && html.charAt(i - 1) === '=') {
                                    j = html.indexOf(c, i + 1);
                                    if (j === -1) {
                                        break;
                                    } else {
                                        v = _.trim(html.slice(lastPos + 1, j));
                                        addAttr(tmpName, v);
                                        tmpName = false;
                                        i = j;
                                        lastPos = i + 1;
                                        continue;
                                    }
                                }
                            }
                            if (c === ' ') {
                                if (tmpName === false) {
                                    j = findNextEqual(html, i);
                                    if (j === -1) {
                                        v = _.trim(html.slice(lastPos, i));
                                        addAttr(v);
                                        tmpName = false;
                                        lastPos = i + 1;
                                        continue;
                                    } else {
                                        i = j - 1;
                                        continue;
                                    }
                                } else {
                                    j = findBeforeEqual(html, i - 1);
                                    if (j === -1) {
                                        v = _.trim(html.slice(lastPos, i));
                                        v = stripQuoteWrap(v);
                                        addAttr(tmpName, v);
                                        tmpName = false;
                                        lastPos = i + 1;
                                        continue;
                                    } else {
                                        continue;
                                    }
                                }
                            }
                        }

                        if (lastPos < html.length) {
                            if (tmpName === false) {
                                addAttr(html.slice(lastPos));
                            } else {
                                addAttr(tmpName, stripQuoteWrap(_.trim(html.slice(lastPos))));
                            }
                        }

                        return _.trim(retAttrs.join(' '));
                    }

                    function findNextEqual(str, i) {
                        for (; i < str.length; i++) {
                            var c = str[i];
                            if (c === ' ') continue;
                            if (c === '=') return i;
                            return -1;
                        }
                    }

                    function findBeforeEqual(str, i) {
                        for (; i > 0; i--) {
                            var c = str[i];
                            if (c === ' ') continue;
                            if (c === '=') return i;
                            return -1;
                        }
                    }

                    function isQuoteWrapString(text) {
                        if ((text[0] === '"' && text[text.length - 1] === '"') ||
                            (text[0] === '\'' && text[text.length - 1] === '\'')) {
                            return true;
                        } else {
                            return false;
                        }
                    };

                    function stripQuoteWrap(text) {
                        if (isQuoteWrapString(text)) {
                            return text.substr(1, text.length - 2);
                        } else {
                            return text;
                        }
                    };


                    exports.parseTag = parseTag;
                    exports.parseAttr = parseAttr;

                }, { "./util": 4 }],
                4: [function(require, module, exports) {
                    module.exports = {
                        indexOf: function(arr, item) {
                            var i, j;
                            if (Array.prototype.indexOf) {
                                return arr.indexOf(item);
                            }
                            for (i = 0, j = arr.length; i < j; i++) {
                                if (arr[i] === item) {
                                    return i;
                                }
                            }
                            return -1;
                        },
                        forEach: function(arr, fn, scope) {
                            var i, j;
                            if (Array.prototype.forEach) {
                                return arr.forEach(fn, scope);
                            }
                            for (i = 0, j = arr.length; i < j; i++) {
                                fn.call(scope, arr[i], i, arr);
                            }
                        },
                        trim: function(str) {
                            if (String.prototype.trim) {
                                return str.trim();
                            }
                            return str.replace(/(^\s*)|(\s*$)/g, '');
                        }
                    };

                }, {}],
                5: [function(require, module, exports) {
                    /**
                     * 过滤XSS Filter XSS
                     */

                    var FilterCSS = require('cssfilter').FilterCSS;
                    var DEFAULT = require('./default');
                    var parser = require('./parser');
                    var parseTag = parser.parseTag;
                    var parseAttr = parser.parseAttr;
                    var _ = require('./util');


                    /**
                     * 返回值是否为空
                     * The return value is empty
                     * @param {Object} obj
                     * @return {Boolean}
                     */
                    function isNull(obj) {
                        return (obj === undefined || obj === null);
                    }

                    /**
                     * 取标签内的属性列表字符串
                     * Take the attribute list string in the tag
                     * @param {String} html
                     * @return {Object}
                     *   - {String} html
                     *   - {Boolean} closing
                     */
                    function getAttrs(html) {
                        var i = html.indexOf(' ');
                        if (i === -1) {
                            return {
                                html: '',
                                closing: (html[html.length - 2] === '/')
                            };
                        }
                        html = _.trim(html.slice(i + 1, -1));
                        var isClosing = (html[html.length - 1] === '/');
                        if (isClosing) html = _.trim(html.slice(0, -1));
                        return {
                            html: html,
                            closing: isClosing
                        };
                    }

                    /**
                     * XSS过滤对象
                     * XSS filter object
                     * @param {Object} options
                     *   选项：whiteList, onTag, onTagAttr, onIgnoreTag,
                     *        onIgnoreTagAttr, safeAttrValue, escapeHtml
                     *        stripIgnoreTagBody, allowCommentTag, stripBlankChar
                     *        css{whiteList, onAttr, onIgnoreAttr} css=false表示禁用cssfilter
                     */
                    function FilterXSS(options) {
                        options = options || {};

                        if (options.stripIgnoreTag) {
                            if (options.onIgnoreTag) {
                                console.error('Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time');
                            }
                            options.onIgnoreTag = DEFAULT.onIgnoreTagStripAll;
                        }

                        options.whiteList = options.whiteList || DEFAULT.whiteList;
                        options.onTag = options.onTag || DEFAULT.onTag;
                        options.onTagAttr = options.onTagAttr || DEFAULT.onTagAttr;
                        options.onIgnoreTag = options.onIgnoreTag || DEFAULT.onIgnoreTag;
                        options.onIgnoreTagAttr = options.onIgnoreTagAttr || DEFAULT.onIgnoreTagAttr;
                        options.safeAttrValue = options.safeAttrValue || DEFAULT.safeAttrValue;
                        options.escapeHtml = options.escapeHtml || DEFAULT.escapeHtml;
                        this.options = options;

                        if (options.css === false) {
                            this.cssFilter = false;
                        } else {
                            options.css = options.css || {};
                            this.cssFilter = new FilterCSS(options.css);
                        }
                    }

                    /**
                     * 开始处理
                     * Start processing
                     * @param {String} html
                     * @return {String}
                     */
                    FilterXSS.prototype.process = function(html) {
                        // 兼容各种奇葩输入 Compatible with a variety of wonderful input
                        html = html || '';
                        html = html.toString();
                        if (!html) return '';

                        var me = this;
                        var options = me.options;
                        var whiteList = options.whiteList;
                        var onTag = options.onTag;
                        var onIgnoreTag = options.onIgnoreTag;
                        var onTagAttr = options.onTagAttr;
                        var onIgnoreTagAttr = options.onIgnoreTagAttr;
                        var safeAttrValue = options.safeAttrValue;
                        var escapeHtml = options.escapeHtml;
                        var cssFilter = me.cssFilter;

                        // 是否清除不可见字符 Whether to remove invisible characters
                        if (options.stripBlankChar) {
                            html = DEFAULT.stripBlankChar(html);
                        }

                        // 是否禁止备注标签 Whether the label is forbidden
                        if (!options.allowCommentTag) {
                            html = DEFAULT.stripCommentTag(html);
                        }

                        // 如果开启了stripIgnoreTagBody If the stripIgnoreTagBody is turned on
                        var stripIgnoreTagBody = false;
                        if (options.stripIgnoreTagBody) {
                            var stripIgnoreTagBody = DEFAULT.StripTagBody(options.stripIgnoreTagBody, onIgnoreTag);
                            onIgnoreTag = stripIgnoreTagBody.onIgnoreTag;
                        }

                        var retHtml = parseTag(html, function(sourcePosition, position, tag, html, isClosing) {
                            var info = {
                                sourcePosition: sourcePosition,
                                position: position,
                                isClosing: isClosing,
                                isWhite: (tag in whiteList)
                            };

                            // 调用onTag处理 Call onTag processing
                            var ret = onTag(tag, html, info);
                            if (!isNull(ret)) return ret;

                            // 默认标签处理方法 Default label handling method
                            if (info.isWhite) {
                                // 白名单标签，解析标签属性 Whitelist label, parse label attribute
                                // 如果是闭合标签，则不需要解析属性 If it is a closed tag, you do not need to parse the attribute
                                if (info.isClosing) {
                                    return '</' + tag + '>';
                                }

                                var attrs = getAttrs(html);
                                var whiteAttrList = whiteList[tag];
                                var attrsHtml = parseAttr(attrs.html, function(name, value) {

                                    // 调用onTagAttr处理 Call onTagAttr processing
                                    var isWhiteAttr = (_.indexOf(whiteAttrList, name) !== -1);
                                    var ret = onTagAttr(tag, name, value, isWhiteAttr);
                                    if (!isNull(ret)) return ret;

                                    // 默认的属性处理方法 The default property handling method
                                    if (isWhiteAttr) {
                                        // 白名单属性，调用safeAttrValue过滤属性值 White list attribute, call safeAttrValue filter attribute value
                                        value = safeAttrValue(tag, name, value, cssFilter);
                                        if (value) {
                                            return name + '="' + value + '"';
                                        } else {
                                            return name;
                                        }
                                    } else {
                                        // 非白名单属性，调用onIgnoreTagAttr处理 Non-whitelist attribute, call onIgnoreTagAttr processing
                                        var ret = onIgnoreTagAttr(tag, name, value, isWhiteAttr);
                                        if (!isNull(ret)) return ret;
                                        return;
                                    }
                                });

                                // 构造新的标签代码 Construct a new tag code
                                var html = '<' + tag;
                                if (attrsHtml) html += ' ' + attrsHtml;
                                if (attrs.closing) html += ' /';
                                html += '>';
                                return html;

                            } else {
                                // 非白名单标签，调用onIgnoreTag处理 Non-white list label, call onIgnoreTag processing
                                var ret = onIgnoreTag(tag, html, info);
                                if (!isNull(ret)) return ret;
                                return escapeHtml(html);
                            }

                        }, escapeHtml);

                        // 如果开启了stripIgnoreTagBody，需要对结果再进行处理 If stripIgnoreTagBody is turned on, the results need to be processed again
                        if (stripIgnoreTagBody) {
                            retHtml = stripIgnoreTagBody.remove(retHtml);
                        }

                        return retHtml;
                    };


                    module.exports = FilterXSS;

                }, { "./default": 1, "./parser": 3, "./util": 4, "cssfilter": 8 }],
                6: [function(require, module, exports) {
                    /**
                     * cssfilter
                     */

                    var DEFAULT = require('./default');
                    var parseStyle = require('./parser');
                    var _ = require('./util');


                    /**
                     * 返回值是否为空
                     * The return value is empty
                     * @param {Object} obj
                     * @return {Boolean}
                     */
                    function isNull(obj) {
                        return (obj === undefined || obj === null);
                    }


                    /**
                     * 创建CSS过滤器
                     * Create a CSS filter
                     * @param {Object} options
                     *   - {Object} whiteList
                     *   - {Object} onAttr
                     *   - {Object} onIgnoreAttr
                     */
                    function FilterCSS(options) {
                        options = options || {};
                        options.whiteList = options.whiteList || DEFAULT.whiteList;
                        options.onAttr = options.onAttr || DEFAULT.onAttr;
                        options.onIgnoreAttr = options.onIgnoreAttr || DEFAULT.onIgnoreAttr;
                        this.options = options;
                    }

                    FilterCSS.prototype.process = function(css) {
                        // 兼容各种奇葩输入 Compatible with a variety of strange input
                        css = css || '';
                        css = css.toString();
                        if (!css) return '';

                        var me = this;
                        var options = me.options;
                        var whiteList = options.whiteList;
                        var onAttr = options.onAttr;
                        var onIgnoreAttr = options.onIgnoreAttr;

                        var retCSS = parseStyle(css, function(sourcePosition, position, name, value, source) {

                            var check = whiteList[name];
                            var isWhite = false;
                            if (check === true) isWhite = check;
                            else if (typeof check === 'function') isWhite = check(value);
                            else if (check instanceof RegExp) isWhite = check.test(value);
                            if (isWhite !== true) isWhite = false;

                            var opts = {
                                position: position,
                                sourcePosition: sourcePosition,
                                source: source,
                                isWhite: isWhite
                            };

                            if (isWhite) {

                                var ret = onAttr(name, value, opts);
                                if (isNull(ret)) {
                                    return name + ':' + value;
                                } else {
                                    return ret;
                                }

                            } else {

                                var ret = onIgnoreAttr(name, value, opts);
                                if (!isNull(ret)) {
                                    return ret;
                                }

                            }
                        });

                        return retCSS;
                    };


                    module.exports = FilterCSS;

                }, { "./default": 7, "./parser": 9, "./util": 10 }],
                7: [function(require, module, exports) {
                    /**
                     * cssfilter
                     */

                    function getDefaultWhiteList() {
                        // 白名单值说明：
                        // true: 允许该属性
                        // Function: function (val) { } 返回true表示允许该属性，其他值均表示不允许
                        // RegExp: regexp.test(val) 返回true表示允许该属性，其他值均表示不允许
                        // 除上面列出的值外均表示不允许
                        // Whitelist Value Description:
                        // true: Allow the attribute
                        // Function: function (val) {} returns true to allow the attribute, other values that are not allowed
                        // RegExp: regexp.test (val) returns true to allow this attribute, other values are not allowed
                        // In addition to the values listed above, it is not allowed
                        var whiteList = {};

                        whiteList['align-content'] = false; // default: auto
                        whiteList['align-items'] = false; // default: auto
                        whiteList['align-self'] = false; // default: auto
                        whiteList['alignment-adjust'] = false; // default: auto
                        whiteList['alignment-baseline'] = false; // default: baseline
                        whiteList['all'] = false; // default: depending on individual properties
                        whiteList['anchor-point'] = false; // default: none
                        whiteList['animation'] = false; // default: depending on individual properties
                        whiteList['animation-delay'] = false; // default: 0
                        whiteList['animation-direction'] = false; // default: normal
                        whiteList['animation-duration'] = false; // default: 0
                        whiteList['animation-fill-mode'] = false; // default: none
                        whiteList['animation-iteration-count'] = false; // default: 1
                        whiteList['animation-name'] = false; // default: none
                        whiteList['animation-play-state'] = false; // default: running
                        whiteList['animation-timing-function'] = false; // default: ease
                        whiteList['azimuth'] = false; // default: center
                        whiteList['backface-visibility'] = false; // default: visible
                        whiteList['background'] = true; // default: depending on individual properties
                        whiteList['background-attachment'] = true; // default: scroll
                        whiteList['background-clip'] = true; // default: border-box
                        whiteList['background-color'] = true; // default: transparent
                        whiteList['background-image'] = true; // default: none
                        whiteList['background-origin'] = true; // default: padding-box
                        whiteList['background-position'] = true; // default: 0% 0%
                        whiteList['background-repeat'] = true; // default: repeat
                        whiteList['background-size'] = true; // default: auto
                        whiteList['baseline-shift'] = false; // default: baseline
                        whiteList['binding'] = false; // default: none
                        whiteList['bleed'] = false; // default: 6pt
                        whiteList['bookmark-label'] = false; // default: content()
                        whiteList['bookmark-level'] = false; // default: none
                        whiteList['bookmark-state'] = false; // default: open
                        whiteList['border'] = true; // default: depending on individual properties
                        whiteList['border-bottom'] = true; // default: depending on individual properties
                        whiteList['border-bottom-color'] = true; // default: current color
                        whiteList['border-bottom-left-radius'] = true; // default: 0
                        whiteList['border-bottom-right-radius'] = true; // default: 0
                        whiteList['border-bottom-style'] = true; // default: none
                        whiteList['border-bottom-width'] = true; // default: medium
                        whiteList['border-collapse'] = true; // default: separate
                        whiteList['border-color'] = true; // default: depending on individual properties
                        whiteList['border-image'] = true; // default: none
                        whiteList['border-image-outset'] = true; // default: 0
                        whiteList['border-image-repeat'] = true; // default: stretch
                        whiteList['border-image-slice'] = true; // default: 100%
                        whiteList['border-image-source'] = true; // default: none
                        whiteList['border-image-width'] = true; // default: 1
                        whiteList['border-left'] = true; // default: depending on individual properties
                        whiteList['border-left-color'] = true; // default: current color
                        whiteList['border-left-style'] = true; // default: none
                        whiteList['border-left-width'] = true; // default: medium
                        whiteList['border-radius'] = true; // default: 0
                        whiteList['border-right'] = true; // default: depending on individual properties
                        whiteList['border-right-color'] = true; // default: current color
                        whiteList['border-right-style'] = true; // default: none
                        whiteList['border-right-width'] = true; // default: medium
                        whiteList['border-spacing'] = true; // default: 0
                        whiteList['border-style'] = true; // default: depending on individual properties
                        whiteList['border-top'] = true; // default: depending on individual properties
                        whiteList['border-top-color'] = true; // default: current color
                        whiteList['border-top-left-radius'] = true; // default: 0
                        whiteList['border-top-right-radius'] = true; // default: 0
                        whiteList['border-top-style'] = true; // default: none
                        whiteList['border-top-width'] = true; // default: medium
                        whiteList['border-width'] = true; // default: depending on individual properties
                        whiteList['bottom'] = false; // default: auto
                        whiteList['box-decoration-break'] = true; // default: slice
                        whiteList['box-shadow'] = true; // default: none
                        whiteList['box-sizing'] = true; // default: content-box
                        whiteList['box-snap'] = true; // default: none
                        whiteList['box-suppress'] = true; // default: show
                        whiteList['break-after'] = true; // default: auto
                        whiteList['break-before'] = true; // default: auto
                        whiteList['break-inside'] = true; // default: auto
                        whiteList['caption-side'] = false; // default: top
                        whiteList['chains'] = false; // default: none
                        whiteList['clear'] = true; // default: none
                        whiteList['clip'] = false; // default: auto
                        whiteList['clip-path'] = false; // default: none
                        whiteList['clip-rule'] = false; // default: nonzero
                        whiteList['color'] = true; // default: implementation dependent
                        whiteList['color-interpolation-filters'] = true; // default: auto
                        whiteList['column-count'] = false; // default: auto
                        whiteList['column-fill'] = false; // default: balance
                        whiteList['column-gap'] = false; // default: normal
                        whiteList['column-rule'] = false; // default: depending on individual properties
                        whiteList['column-rule-color'] = false; // default: current color
                        whiteList['column-rule-style'] = false; // default: medium
                        whiteList['column-rule-width'] = false; // default: medium
                        whiteList['column-span'] = false; // default: none
                        whiteList['column-width'] = false; // default: auto
                        whiteList['columns'] = false; // default: depending on individual properties
                        whiteList['contain'] = false; // default: none
                        whiteList['content'] = false; // default: normal
                        whiteList['counter-increment'] = false; // default: none
                        whiteList['counter-reset'] = false; // default: none
                        whiteList['counter-set'] = false; // default: none
                        whiteList['crop'] = false; // default: auto
                        whiteList['cue'] = false; // default: depending on individual properties
                        whiteList['cue-after'] = false; // default: none
                        whiteList['cue-before'] = false; // default: none
                        whiteList['cursor'] = false; // default: auto
                        whiteList['direction'] = false; // default: ltr
                        whiteList['display'] = true; // default: depending on individual properties
                        whiteList['display-inside'] = true; // default: auto
                        whiteList['display-list'] = true; // default: none
                        whiteList['display-outside'] = true; // default: inline-level
                        whiteList['dominant-baseline'] = false; // default: auto
                        whiteList['elevation'] = false; // default: level
                        whiteList['empty-cells'] = false; // default: show
                        whiteList['filter'] = false; // default: none
                        whiteList['flex'] = false; // default: depending on individual properties
                        whiteList['flex-basis'] = false; // default: auto
                        whiteList['flex-direction'] = false; // default: row
                        whiteList['flex-flow'] = false; // default: depending on individual properties
                        whiteList['flex-grow'] = false; // default: 0
                        whiteList['flex-shrink'] = false; // default: 1
                        whiteList['flex-wrap'] = false; // default: nowrap
                        whiteList['float'] = false; // default: none
                        whiteList['float-offset'] = false; // default: 0 0
                        whiteList['flood-color'] = false; // default: black
                        whiteList['flood-opacity'] = false; // default: 1
                        whiteList['flow-from'] = false; // default: none
                        whiteList['flow-into'] = false; // default: none
                        whiteList['font'] = true; // default: depending on individual properties
                        whiteList['font-family'] = true; // default: implementation dependent
                        whiteList['font-feature-settings'] = true; // default: normal
                        whiteList['font-kerning'] = true; // default: auto
                        whiteList['font-language-override'] = true; // default: normal
                        whiteList['font-size'] = true; // default: medium
                        whiteList['font-size-adjust'] = true; // default: none
                        whiteList['font-stretch'] = true; // default: normal
                        whiteList['font-style'] = true; // default: normal
                        whiteList['font-synthesis'] = true; // default: weight style
                        whiteList['font-variant'] = true; // default: normal
                        whiteList['font-variant-alternates'] = true; // default: normal
                        whiteList['font-variant-caps'] = true; // default: normal
                        whiteList['font-variant-east-asian'] = true; // default: normal
                        whiteList['font-variant-ligatures'] = true; // default: normal
                        whiteList['font-variant-numeric'] = true; // default: normal
                        whiteList['font-variant-position'] = true; // default: normal
                        whiteList['font-weight'] = true; // default: normal
                        whiteList['grid'] = false; // default: depending on individual properties
                        whiteList['grid-area'] = false; // default: depending on individual properties
                        whiteList['grid-auto-columns'] = false; // default: auto
                        whiteList['grid-auto-flow'] = false; // default: none
                        whiteList['grid-auto-rows'] = false; // default: auto
                        whiteList['grid-column'] = false; // default: depending on individual properties
                        whiteList['grid-column-end'] = false; // default: auto
                        whiteList['grid-column-start'] = false; // default: auto
                        whiteList['grid-row'] = false; // default: depending on individual properties
                        whiteList['grid-row-end'] = false; // default: auto
                        whiteList['grid-row-start'] = false; // default: auto
                        whiteList['grid-template'] = false; // default: depending on individual properties
                        whiteList['grid-template-areas'] = false; // default: none
                        whiteList['grid-template-columns'] = false; // default: none
                        whiteList['grid-template-rows'] = false; // default: none
                        whiteList['hanging-punctuation'] = false; // default: none
                        whiteList['height'] = true; // default: auto
                        whiteList['hyphens'] = false; // default: manual
                        whiteList['icon'] = false; // default: auto
                        whiteList['image-orientation'] = false; // default: auto
                        whiteList['image-resolution'] = false; // default: normal
                        whiteList['ime-mode'] = false; // default: auto
                        whiteList['initial-letters'] = false; // default: normal
                        whiteList['inline-box-align'] = false; // default: last
                        whiteList['justify-content'] = false; // default: auto
                        whiteList['justify-items'] = false; // default: auto
                        whiteList['justify-self'] = false; // default: auto
                        whiteList['left'] = false; // default: auto
                        whiteList['letter-spacing'] = true; // default: normal
                        whiteList['lighting-color'] = true; // default: white
                        whiteList['line-box-contain'] = false; // default: block inline replaced
                        whiteList['line-break'] = false; // default: auto
                        whiteList['line-grid'] = false; // default: match-parent
                        whiteList['line-height'] = false; // default: normal
                        whiteList['line-snap'] = false; // default: none
                        whiteList['line-stacking'] = false; // default: depending on individual properties
                        whiteList['line-stacking-ruby'] = false; // default: exclude-ruby
                        whiteList['line-stacking-shift'] = false; // default: consider-shifts
                        whiteList['line-stacking-strategy'] = false; // default: inline-line-height
                        whiteList['list-style'] = true; // default: depending on individual properties
                        whiteList['list-style-image'] = true; // default: none
                        whiteList['list-style-position'] = true; // default: outside
                        whiteList['list-style-type'] = true; // default: disc
                        whiteList['margin'] = true; // default: depending on individual properties
                        whiteList['margin-bottom'] = true; // default: 0
                        whiteList['margin-left'] = true; // default: 0
                        whiteList['margin-right'] = true; // default: 0
                        whiteList['margin-top'] = true; // default: 0
                        whiteList['marker-offset'] = false; // default: auto
                        whiteList['marker-side'] = false; // default: list-item
                        whiteList['marks'] = false; // default: none
                        whiteList['mask'] = false; // default: border-box
                        whiteList['mask-box'] = false; // default: see individual properties
                        whiteList['mask-box-outset'] = false; // default: 0
                        whiteList['mask-box-repeat'] = false; // default: stretch
                        whiteList['mask-box-slice'] = false; // default: 0 fill
                        whiteList['mask-box-source'] = false; // default: none
                        whiteList['mask-box-width'] = false; // default: auto
                        whiteList['mask-clip'] = false; // default: border-box
                        whiteList['mask-image'] = false; // default: none
                        whiteList['mask-origin'] = false; // default: border-box
                        whiteList['mask-position'] = false; // default: center
                        whiteList['mask-repeat'] = false; // default: no-repeat
                        whiteList['mask-size'] = false; // default: border-box
                        whiteList['mask-source-type'] = false; // default: auto
                        whiteList['mask-type'] = false; // default: luminance
                        whiteList['max-height'] = true; // default: none
                        whiteList['max-lines'] = false; // default: none
                        whiteList['max-width'] = true; // default: none
                        whiteList['min-height'] = true; // default: 0
                        whiteList['min-width'] = true; // default: 0
                        whiteList['move-to'] = false; // default: normal
                        whiteList['nav-down'] = false; // default: auto
                        whiteList['nav-index'] = false; // default: auto
                        whiteList['nav-left'] = false; // default: auto
                        whiteList['nav-right'] = false; // default: auto
                        whiteList['nav-up'] = false; // default: auto
                        whiteList['object-fit'] = false; // default: fill
                        whiteList['object-position'] = false; // default: 50% 50%
                        whiteList['opacity'] = false; // default: 1
                        whiteList['order'] = false; // default: 0
                        whiteList['orphans'] = false; // default: 2
                        whiteList['outline'] = false; // default: depending on individual properties
                        whiteList['outline-color'] = false; // default: invert
                        whiteList['outline-offset'] = false; // default: 0
                        whiteList['outline-style'] = false; // default: none
                        whiteList['outline-width'] = false; // default: medium
                        whiteList['overflow'] = false; // default: depending on individual properties
                        whiteList['overflow-wrap'] = false; // default: normal
                        whiteList['overflow-x'] = false; // default: visible
                        whiteList['overflow-y'] = false; // default: visible
                        whiteList['padding'] = true; // default: depending on individual properties
                        whiteList['padding-bottom'] = true; // default: 0
                        whiteList['padding-left'] = true; // default: 0
                        whiteList['padding-right'] = true; // default: 0
                        whiteList['padding-top'] = true; // default: 0
                        whiteList['page'] = false; // default: auto
                        whiteList['page-break-after'] = false; // default: auto
                        whiteList['page-break-before'] = false; // default: auto
                        whiteList['page-break-inside'] = false; // default: auto
                        whiteList['page-policy'] = false; // default: start
                        whiteList['pause'] = false; // default: implementation dependent
                        whiteList['pause-after'] = false; // default: implementation dependent
                        whiteList['pause-before'] = false; // default: implementation dependent
                        whiteList['perspective'] = false; // default: none
                        whiteList['perspective-origin'] = false; // default: 50% 50%
                        whiteList['pitch'] = false; // default: medium
                        whiteList['pitch-range'] = false; // default: 50
                        whiteList['play-during'] = false; // default: auto
                        whiteList['position'] = false; // default: static
                        whiteList['presentation-level'] = false; // default: 0
                        whiteList['quotes'] = false; // default: text
                        whiteList['region-fragment'] = false; // default: auto
                        whiteList['resize'] = false; // default: none
                        whiteList['rest'] = false; // default: depending on individual properties
                        whiteList['rest-after'] = false; // default: none
                        whiteList['rest-before'] = false; // default: none
                        whiteList['richness'] = false; // default: 50
                        whiteList['right'] = false; // default: auto
                        whiteList['rotation'] = false; // default: 0
                        whiteList['rotation-point'] = false; // default: 50% 50%
                        whiteList['ruby-align'] = false; // default: auto
                        whiteList['ruby-merge'] = false; // default: separate
                        whiteList['ruby-position'] = false; // default: before
                        whiteList['shape-image-threshold'] = false; // default: 0.0
                        whiteList['shape-outside'] = false; // default: none
                        whiteList['shape-margin'] = false; // default: 0
                        whiteList['size'] = false; // default: auto
                        whiteList['speak'] = false; // default: auto
                        whiteList['speak-as'] = false; // default: normal
                        whiteList['speak-header'] = false; // default: once
                        whiteList['speak-numeral'] = false; // default: continuous
                        whiteList['speak-punctuation'] = false; // default: none
                        whiteList['speech-rate'] = false; // default: medium
                        whiteList['stress'] = false; // default: 50
                        whiteList['string-set'] = false; // default: none
                        whiteList['tab-size'] = false; // default: 8
                        whiteList['table-layout'] = false; // default: auto
                        whiteList['text-align'] = true; // default: start
                        whiteList['text-align-last'] = true; // default: auto
                        whiteList['text-combine-upright'] = true; // default: none
                        whiteList['text-decoration'] = true; // default: none
                        whiteList['text-decoration-color'] = true; // default: currentColor
                        whiteList['text-decoration-line'] = true; // default: none
                        whiteList['text-decoration-skip'] = true; // default: objects
                        whiteList['text-decoration-style'] = true; // default: solid
                        whiteList['text-emphasis'] = true; // default: depending on individual properties
                        whiteList['text-emphasis-color'] = true; // default: currentColor
                        whiteList['text-emphasis-position'] = true; // default: over right
                        whiteList['text-emphasis-style'] = true; // default: none
                        whiteList['text-height'] = true; // default: auto
                        whiteList['text-indent'] = true; // default: 0
                        whiteList['text-justify'] = true; // default: auto
                        whiteList['text-orientation'] = true; // default: mixed
                        whiteList['text-overflow'] = true; // default: clip
                        whiteList['text-shadow'] = true; // default: none
                        whiteList['text-space-collapse'] = true; // default: collapse
                        whiteList['text-transform'] = true; // default: none
                        whiteList['text-underline-position'] = true; // default: auto
                        whiteList['text-wrap'] = true; // default: normal
                        whiteList['top'] = false; // default: auto
                        whiteList['transform'] = false; // default: none
                        whiteList['transform-origin'] = false; // default: 50% 50% 0
                        whiteList['transform-style'] = false; // default: flat
                        whiteList['transition'] = false; // default: depending on individual properties
                        whiteList['transition-delay'] = false; // default: 0s
                        whiteList['transition-duration'] = false; // default: 0s
                        whiteList['transition-property'] = false; // default: all
                        whiteList['transition-timing-function'] = false; // default: ease
                        whiteList['unicode-bidi'] = false; // default: normal
                        whiteList['vertical-align'] = false; // default: baseline
                        whiteList['visibility'] = false; // default: visible
                        whiteList['voice-balance'] = false; // default: center
                        whiteList['voice-duration'] = false; // default: auto
                        whiteList['voice-family'] = false; // default: implementation dependent
                        whiteList['voice-pitch'] = false; // default: medium
                        whiteList['voice-range'] = false; // default: medium
                        whiteList['voice-rate'] = false; // default: normal
                        whiteList['voice-stress'] = false; // default: normal
                        whiteList['voice-volume'] = false; // default: medium
                        whiteList['volume'] = false; // default: medium
                        whiteList['white-space'] = false; // default: normal
                        whiteList['widows'] = false; // default: 2
                        whiteList['width'] = true; // default: auto
                        whiteList['will-change'] = false; // default: auto
                        whiteList['word-break'] = true; // default: normal
                        whiteList['word-spacing'] = true; // default: normal
                        whiteList['word-wrap'] = true; // default: normal
                        whiteList['wrap-flow'] = false; // default: auto
                        whiteList['wrap-through'] = false; // default: wrap
                        whiteList['writing-mode'] = false; // default: horizontal-tb
                        whiteList['z-index'] = false; // default: auto

                        return whiteList;
                    }


                    /**
                     * 匹配到白名单上的一个属性时
                     * Match to a property on the whitelist
                     * @param {String} name
                     * @param {String} value
                     * @param {Object} options
                     * @return {String}
                     */
                    function onAttr(name, value, options) {
                        // do nothing
                    }

                    /**
                     * 匹配到不在白名单上的一个属性时
                     * Match to a property that is not on the whitelist
                     * @param {String} name
                     * @param {String} value
                     * @param {Object} options
                     * @return {String}
                     */
                    function onIgnoreAttr(name, value, options) {
                        // do nothing
                    }


                    exports.whiteList = getDefaultWhiteList();
                    exports.getDefaultWhiteList = getDefaultWhiteList;
                    exports.onAttr = onAttr;
                    exports.onIgnoreAttr = onIgnoreAttr;

                }, {}],
                8: [function(require, module, exports) {
                    /**
                     * cssfilter
                     */

                    var DEFAULT = require('./default');
                    var FilterCSS = require('./css');


                    /**
                     * XSS过滤
                     * XSS filtering
                     * @param {String} css 要过滤的CSS代码 The CSS code to filter
                     * @param {Object} options 选项：whiteList, onAttr, onIgnoreAttr
                     * @return {String}
                     */
                    function filterCSS(html, options) {
                        var xss = new FilterCSS(options);
                        return xss.process(html);
                    }


                    // 输出 Output
                    exports = module.exports = filterCSS;
                    exports.FilterCSS = FilterCSS;
                    for (var i in DEFAULT) exports[i] = DEFAULT[i];

                    // 在浏览器端使用 Used at the browser side
                    if (typeof window !== 'undefined') {
                        window.filterCSS = module.exports;
                    }

                }, { "./css": 6, "./default": 7 }],
                9: [function(require, module, exports) {
                    /**
                     * cssfilter
                     */

                    var _ = require('./util');


                    /**
                     * 解析style
                     * Parse the style
                     * @param {String} css
                     * @param {Function} onAttr 处理属性的函数 A function that handles a property
                     *   参数格式： function (sourcePosition, position, name, value, source)
                     * @return {String}
                     */
                    function parseStyle(css, onAttr) {
                        css = _.trimRight(css);
                        if (css[css.length - 1] !== ';') css += ';';
                        var cssLength = css.length;
                        var isParenthesisOpen = false;
                        var lastPos = 0;
                        var i = 0;
                        var retCSS = '';

                        function addNewAttr() {
                            // 如果没有正常的闭合圆括号，则直接忽略当前属性 If there is no normal closing parentheses, the current attribute is ignored
                            if (!isParenthesisOpen) {
                                var source = _.trim(css.slice(lastPos, i));
                                var j = source.indexOf(':');
                                if (j !== -1) {
                                    var name = _.trim(source.slice(0, j));
                                    var value = _.trim(source.slice(j + 1));
                                    // 必须有属性名称 Must have attribute name
                                    if (name) {
                                        var ret = onAttr(lastPos, retCSS.length, name, value, source);
                                        if (ret) retCSS += ret + '; ';
                                    }
                                }
                            }
                            lastPos = i + 1;
                        }

                        for (; i < cssLength; i++) {
                            var c = css[i];
                            if (c === '/' && css[i + 1] === '*') {
                                // 备注开始
                                var j = css.indexOf('*/', i + 2);
                                // 如果没有正常的备注结束，则后面的部分全部跳过 If there is no normal end of the note, then the latter part of the whole skip
                                if (j === -1) break;
                                // 直接将当前位置调到备注结尾，并且初始化状态 Directly to the current position to the end of the note, and initialize the state
                                i = j + 1;
                                lastPos = i + 1;
                                isParenthesisOpen = false;
                            } else if (c === '(') {
                                isParenthesisOpen = true;
                            } else if (c === ')') {
                                isParenthesisOpen = false;
                            } else if (c === ';') {
                                if (isParenthesisOpen) {
                                    // 在圆括号里面，忽略 In parentheses inside, ignored
                                } else {
                                    addNewAttr();
                                }
                            } else if (c === '\n') {
                                addNewAttr();
                            }
                        }

                        return _.trim(retCSS);
                    }

                    module.exports = parseStyle;

                }, { "./util": 10 }],
                10: [function(require, module, exports) {
                    module.exports = {
                        indexOf: function(arr, item) {
                            var i, j;
                            if (Array.prototype.indexOf) {
                                return arr.indexOf(item);
                            }
                            for (i = 0, j = arr.length; i < j; i++) {
                                if (arr[i] === item) {
                                    return i;
                                }
                            }
                            return -1;
                        },
                        forEach: function(arr, fn, scope) {
                            var i, j;
                            if (Array.prototype.forEach) {
                                return arr.forEach(fn, scope);
                            }
                            for (i = 0, j = arr.length; i < j; i++) {
                                fn.call(scope, arr[i], i, arr);
                            }
                        },
                        trim: function(str) {
                            if (String.prototype.trim) {
                                return str.trim();
                            }
                            return str.replace(/(^\s*)|(\s*$)/g, '');
                        },
                        trimRight: function(str) {
                            if (String.prototype.trimRight) {
                                return str.trimRight();
                            }
                            return str.replace(/(\s*$)/g, '');
                        }
                    };

                }, {}]
            }, {}, [2]);

            return filterXSS(input, options);
        }
    })

})();
