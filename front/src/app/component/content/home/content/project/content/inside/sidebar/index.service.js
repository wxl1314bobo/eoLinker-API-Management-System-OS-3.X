(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [顶部栏（navbar）相关服务js] [Top bar (navbar) related services js]
     * @version  3.0.2
     * @service  GroupService [注入GroupService服务] [Inject GroupService service]
     */
    angular.module('eolinker')
        .factory('HomeProjectSidebarService', HomeProjectSidebarService);

    HomeProjectSidebarService.$inject = ['GroupService']

    function HomeProjectSidebarService(GroupService) {
        var data = {
            service: GroupService,
            fun: {
                clear: null
            }
        }

        /**
         * @function [清空分组信息] [Empty the packet information]
         */
        data.fun.clear = function() {
            data.service.clear();
        };
        return data;
    }
})();
