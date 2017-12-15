(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [用户权限常量集] [User authority constant set]
     * @version  3.0.2
     */
    angular
        .module('eolinker.constant')
        .constant('AUTH_EVENTS', {
            LOGIN_SUCCESS: 'auth-login-success',//登录成功 Login successful
            LOGIN_FAILED: 'auth-login-failed',//登录失败 Logon failure
            LOGOUT_SUCCESS: 'auth-logout-success',//退出成功 Quit successfully
            SESSION_TIMEOUT: 'auth-session-timeout',//认证超时 Authentication timeout
            UNAUTHENTICATED: 'auth-not-authenticated',//未认证权限 Unauthorized authority
            UNAUTHORIZED: 'auth-not-authorized',//未登录 Not logged in
            SYSTEM_ERROR: 'something-wrong-system'//服务器出错 Server error
        })
        .constant('USER_ROLES', {
            USER: 'guest'
        })
})();
