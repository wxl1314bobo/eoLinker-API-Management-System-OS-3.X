(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [数据库字段类型常量] [Database field type constants]
     * @version  3.0.2
     */
    angular
        .module('eolinker.constant')
        .constant('DATABASE', {
            TYPE: [
                'tinyint',
                'smallint',
                'mediumint',
                'int',
                'integer',
                'bigint',
                'bit',
                'real',
                'double',
                'float',
                'decimal',
                'numeric',
                'char',
                'varchar',
                'date',
                'time',
                'year',
                'timestamp',
                'datetime',
                'tinyblob',
                'blob',
                'mediumblob',
                'longblob',
                'tinytext',
                'text',
                'mediumtext',
                'longtext',
                'enum',
                'set',
                'binary',
                'varbinary',
                'point',
                'linestring',
                'polygon',
                'geometry',
                'multipoint',
                'multilinestring',
                'multipolygon',
                'geometrycollection'
            ]
        })
})();
