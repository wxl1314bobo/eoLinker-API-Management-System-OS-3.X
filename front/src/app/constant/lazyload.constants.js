(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [按需加载文件存放常量集] [Loading files on demand to store const sets]
     * @version  3.0.2
     */
    angular
        .module('eolinker.constant')
        .constant('APP_REQUIRES', {
            // jQuery based and standalone scripts
            SCRIPTS: {},
            // Angular based script (use the right module name)
            MODULES: [
                // options {serie: true,insertBefore: '#load_styles_before'}
                {
                    name: 'PARTICLES',
                    files: ['vendor/particles.js/particles.min.js']
                }, {
                    name: 'CLIPBOARD',
                    files: ['vendor/clipboard/dist/clipboard.min.js']
                }, {
                    name: 'WANG_EDITOR',
                    files: [
                        'libs/wangEditor/dist/js/wangEditor.min.js',
                        "libs/wangEditor/dist/js/lib/plupload.full.min.js",
                        "libs/wangEditor/dist/js/lib/qiniu.min.js"
                    ]
                }, {
                    name: 'MARKDOWN_CSS',
                    files: [
                        "libs/editor.md/images/loading.gif",
                        "libs/editor.md/fonts/fontawesome-webfont.*",
                        "libs/editor.md/css/editormd.min.css"
                    ]
                }, {
                    name: 'MARKDOWN',
                    files: [
                        "libs/editor.md/images/loading.gif",
                        "libs/editor.md/fonts/fontawesome-webfont.*",
                        "libs/editor.md/css/editormd.min.css",
                        "libs/editor.md/editormd.min.js",
                        "libs/editor.md/plugins/link-dialog/link-dialog.js ",
                        "libs/editor.md/plugins/table-dialog/table-dialog.js ",
                        "libs/editor.md/lib/**"
                    ]
                }, {
                    name: 'MOCK',
                    files: [
                        "vendor/mockjs/dist/mock.js"
                    ]
                }, {
                    name: 'QINIU_UPLOAD',
                    files: ['libs/angular-qiniu-upload/src/qupload.js', "libs/angular-local-storage/dist/angular-local-storage.js", ]
                }, {
                    name: 'HIGH_LIGHT',
                    files: ['libs/highlight.js/styles/rainbow.css','libs/highlight.js/lib/highlight.pack.js']
                }, {
                    name: 'IMG_CROP',
                    files: [
                        "libs/imgCrop/ng-img-crop.js"
                    ]
                }
            ]
        });

})();