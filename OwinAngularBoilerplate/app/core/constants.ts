/// <reference path="../_all.ts" />

'use strict';
module app {

    angular
        .module('app.core')
        .constant('toastr', toastr)
        .constant('moment', moment);


    export module EVENTS {
        export var loginSuccess: string = 'auth-login-success';
        export var loginFailed: string = 'auth-login-failed';
        export var logoutSuccess: string = 'auth-logout-success';
        export var sessionTimeout: string = 'auth-session-timeout';
        export var notAuthenticated: string = 'auth-not-authenticated';
        export var notAuthorized: string = 'auth-not-authorized';

        export var cacheUpdated: string = 'cache-item-updated';
        export var cacheRemoved: string = 'cache-item-removed';

        export var cacheKeyLoggedIn: string = 'cache-key-loggedIn';
        };   
}
