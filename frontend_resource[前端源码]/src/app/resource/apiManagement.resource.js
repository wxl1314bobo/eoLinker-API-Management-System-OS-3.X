(function() {
    'use strict';

    angular.module('eolinker.resource')
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [接口管理接口服务定义js] [API management interface service definition js]
     * @version  3.0.2
     * @service  $resource [注入$resource服务] [Inject the $resource service]
     * @constant serverUrl [注入前缀URL] [Inject the prefix URL]
     */
    .factory('ApiManagementResource', ApiManagementResource)

    ApiManagementResource.$inject = ['$resource', 'serverUrl'];
    function ApiManagementResource($resource, serverUrl) {
        var data = {
            info: {
                api: [],
                method: 'POST'
            }
        }
        data.info.api['Import'] = $resource(serverUrl + '?g=Web&c=Import&o=:operate', {

            }, {
                Eoapi: {
                    params: { operate: 'importEoapi' },
                    method: data.info.method
                },
                Postman: {
                    params: { operate: 'importPostMan' },
                    method: data.info.method
                },
                Dhc: {
                    params: { operate: 'importDHC' },
                    method: data.info.method
                },
                Rap: {
                    params: { operate: 'importRAP' },
                    method: data.info.method
                },
                Swagger: {
                    params: { operate: 'importSwagger' },
                    method: data.info.method
                }
            }

        );

        data.info.api['Project'] = $resource(serverUrl + '?g=Web&c=Project&o=:operate', {

            }, {
                Query: {
                    params: { operate: 'getProjectList' },
                    method: data.info.method
                },
                Update: {
                    params: { operate: 'editProject' },
                    method: data.info.method
                },
                Add: {
                    params: { operate: 'addProject' },
                    method: data.info.method
                },
                Delete: {
                    params: { operate: 'deleteProject' },
                    method: data.info.method
                },
                Detail: {
                    params: { operate: 'getProject' },
                    method: data.info.method
                },
                Dump: {
                    params: { operate: 'dumpProject' },
                    method: data.info.method
                }
            }

        );

        data.info.api['Api'] = $resource(serverUrl + '?g=Web&c=Api&o=:operate', {

            }, {
                Query: {
                    params: { operate: 'getApiList' },
                    method: data.info.method
                },
                All: {
                    params: { operate: 'getAllApiList' },
                    method: data.info.method
                },
                Add: {
                    params: { operate: 'addApi' },
                    method: data.info.method
                },
                Delete: {
                    params: { operate: 'removeApi' },
                    method: data.info.method
                },
                Update: {
                    params: { operate: 'editApi' },
                    method: data.info.method
                },
                Search: {
                    params: { operate: 'searchApi' },
                    method: data.info.method
                },
                Detail: {
                    params: { operate: 'getApi' },
                    method: data.info.method
                }
            }

        );



        data.info.api['Trash'] = $resource(serverUrl + '?g=Web&c=Api&o=:operate', {

            }, {
                Query: {
                    params: { operate: 'getRecyclingStationApiList' },
                    method: data.info.method
                },
                Clean: {
                    params: { operate: 'cleanRecyclingStation' },
                    method: data.info.method
                },
                Delete: {
                    params: { operate: 'deleteApi' },
                    method: data.info.method
                },
                Recover: {
                    params: { operate: 'recoverApi' },
                    method: data.info.method
                }
            }

        );

        data.info.api['Test'] = $resource(serverUrl + '?g=Web&c=Test&o=:operate', {

            }, {
                Get: {
                    params: { operate: 'get' },
                    method: data.info.method
                },
                Post: {
                    params: { operate: 'post' },
                    method: data.info.method
                },
                Delete: {
                    params: { operate: 'delete' },
                    method: data.info.method
                },
                Patch: {
                    params: { operate: 'patch' },
                    method: data.info.method
                },
                Head: {
                    params: { operate: 'head' },
                    method: data.info.method
                },
                Options: {
                    params: { operate: 'options' },
                    method: data.info.method
                },
                Put: {
                    params: { operate: 'put' },
                    method: data.info.method
                },
                DeleteHistory: {
                    params: { operate: 'deleteTestHistory' },
                    method: data.info.method
                },
                DeleteAllHistory: {
                    params: { operate: 'deleteAllTestHistory' },
                    method: data.info.method
                }
            }

        );

        data.info.api['Star'] = $resource(serverUrl + '?g=Web&c=Api&o=:operate', {

            }, {
                Add: {
                    params: { operate: 'addStar' },
                    method: data.info.method
                },
                Delete: {
                    params: { operate: 'removeStar' },
                    method: data.info.method
                }
            }

        );

        data.info.api['Code'] = $resource(serverUrl + '?g=Web&c=StatusCode&o=:operate', {

            }, {
                Query: {
                    params: { operate: 'getCodeList' },
                    method: data.info.method
                },
                All: {
                    params: { operate: 'getAllCodeList' },
                    method: data.info.method
                },
                Add: {
                    params: { operate: 'addCode' },
                    method: data.info.method
                },
                Delete: {
                    params: { operate: 'deleteCode' },
                    method: data.info.method
                },
                Update: {
                    params: { operate: 'editCode' },
                    method: data.info.method
                },
                Search: {
                    params: { operate: 'searchStatusCode' },
                    method: data.info.method
                }
            }

        );
        data.info.api['Partner'] = $resource(serverUrl + '?g=Web&c=Partner&o=:operate', {

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
        
        data.info.api['Env'] = $resource(serverUrl + '?g=Web&c=Env&o=:operate', {

            }, {
                Query: {
                    params: { operate: 'getEnvList' },
                    method: data.info.method
                },
                Add: {
                    params: { operate: 'addEnv' },
                    method: data.info.method
                },
                Delete: {
                    params: { operate: 'deleteEnv' },
                    method: data.info.method
                },
                Edit: {
                    params: { operate: 'editEnv' },
                    method: data.info.method
                }
            }

        );

        data.info.api['ApiGroup'] = $resource(serverUrl + '?g=Web&c=Group&o=:operate', {

            }, {
                Query: {
                    params: { operate: 'getGroupList' },
                    method: data.info.method
                },
                Add: {
                    params: { operate: 'addGroup' },
                    method: data.info.method
                },
                Delete: {
                    params: { operate: 'deleteGroup' },
                    method: data.info.method
                },
                Update: {
                    params: { operate: 'editGroup' },
                    method: data.info.method
                },
                Sort: {
                    params: { operate: 'sortGroup' },
                    method: data.info.method
                }
            }

        );
        
        data.info.api['CodeGroup'] = $resource(serverUrl + '?g=Web&c=StatusCodeGroup&o=:operate', {

            }, {
                Query: {
                    params: { operate: 'getGroupList' },
                    method: data.info.method
                },
                Add: {
                    params: { operate: 'addGroup' },
                    method: data.info.method
                },
                Delete: {
                    params: { operate: 'deleteGroup' },
                    method: data.info.method
                },
                Update: {
                    params: { operate: 'editGroup' },
                    method: data.info.method
                },
                Sort: {
                    params: { operate: 'sortGroup' },
                    method: data.info.method
                }
            }

        );

        return data.info.api;
    }
})();
