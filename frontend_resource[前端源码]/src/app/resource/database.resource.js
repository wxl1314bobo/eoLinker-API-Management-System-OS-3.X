(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [定义数据字典resource服务定义js] [Define the data dictionary resource service definition js]
     * @version  3.0.2
     * @service  $resource [注入$resource服务] [Inject the $resource service]
     * @constant serverUrl [注入前缀URL] [Inject the prefix URL]
     */
    angular.module('eolinker.resource')

    .factory('DatabaseResource', DatabaseResource)

    DatabaseResource.$inject = ['$resource', 'serverUrl'];

    function DatabaseResource($resource, serverUrl) {
        var data = {
            info: {
                api: [],
                method: 'POST'
            }
        }
        data.info.api['Database'] = $resource(serverUrl + '?g=Web&c=Database&o=:operate', {

            }, {
                Query: {
                    params: { operate: 'getDatabase' },
                    method: data.info.method
                },
                Add: {
                    params: { operate: 'addDatabase' },
                    method: data.info.method
                },
                Update: {
                    params: { operate: 'editDatabase' },
                    method: data.info.method
                },
                Delete: {
                    params: { operate: 'deleteDatabase' },
                    method: data.info.method
                },
                Import: {
                    params: { operate: 'importDatabase' },
                    method: data.info.method
                },
                ImportByJson: {
                    params: { operate: 'importDatabseByJson' },
                    method: data.info.method
                },
                Dump:{
                    params:{operate:'exportDatabase'},
                    method:data.info.method
                }
            }

        );
        data.info.api['DatabaseTable'] = $resource(serverUrl + '?g=Web&c=DatabaseTable&o=:operate', {

            }, {
                Query: {
                    params: { operate: 'getTable' },
                    method: data.info.method
                },
                Add: {
                    params: { operate: 'addTable' },
                    method: data.info.method
                },
                Update: {
                    params: { operate: 'editTable' },
                    method: data.info.method
                },
                Delete: {
                    params: { operate: 'deleteTable' },
                    method: data.info.method
                }
            }

        );
        data.info.api['Field'] = $resource(serverUrl + '?g=Web&c=DatabaseTableField&o=:operate', {

            }, {
                Query: {
                    params: { operate: 'getField' },
                    method: data.info.method
                },
                Add: {
                    params: { operate: 'addField' },
                    method: data.info.method
                },
                Update: {
                    params: { operate: 'editField' },
                    method: data.info.method
                },
                Delete: {
                    params: { operate: 'deleteField' },
                    method: data.info.method
                }
            }

        );
        data.info.api['Partner'] = $resource(serverUrl + '?g=Web&c=DatabasePartner&o=:operate', {

            }, {
                Query: {
                    params: { operate: 'getPartnerList' },
                    method: data.info.method
                },
                Add: {
                    params: { operate: 'invitePartner' },
                    method: data.info.method
                },
                Delete: {
                    params: { operate: 'removePartner' },
                    method: data.info.method
                },
                Quit: {
                    params: { operate: 'quitPartner' },
                    method: data.info.method
                },
                Search: {
                    params: { operate: 'getPartnerInfo' },
                    method: data.info.method
                },
                SetType: {
                    params: { operate: 'editPartnerType' },
                    method: data.info.method
                },
                SetNickName: {
                    params: { operate: 'editPartnerNickName' },
                    method: data.info.method
                }
            }

        );
        return data.info.api;
    }
})();
