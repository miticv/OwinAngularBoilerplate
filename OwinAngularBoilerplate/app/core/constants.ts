/// <reference path="../_all.ts" />
                 
'use strict';
module app {

    angular
        .module('app.core')
        .constant('toastr', toastr)
        .constant('moment', moment);


    /* move this section into the API to enable multiple languages */
    export module LANG {

        export var applicationName: string = 'Boilerplate';
        export var LoggedIn: string = 'Logged in!';
        export var Registered: string = 'Registered!';
        export var WrongCredentals: string = 'Wrong credentials!';
        export var CanNotRegister: string = 'Cannot register!';
        export var NoAccess: string = 'No Access';
        export var Loaded: string = 'loaded';
        export var PleaseWait: string = 'Please Wait';

        export var login: string = 'login';
        export var test: string = 'test';
        export var logedinpage: string = 'loged in page';
        export var register: string = 'register';
        export var invalidpage: string = 'invalid page';
        export var logout: string = 'logout';
    }                                             

    export module CONST {
        export var sessionStorageKey: string = 'authorizationData';
        export var sessionSlackTime: number = 10; //kill session 10s before expires - if user want to renew session at 0 sec countdown, give server some slack time   
        export var sessionDisplaySessionEndWarningAtSecond: number = 30; //show warning 50sec before session expires       
    }

    export module EVENTS {

        export var loginSuccess: string = 'auth-login-success';
        export var loginFailed: string = 'auth-login-failed';
        export var logoutSuccess: string = 'auth-logout-success';
        //export var sessionTimeout: string = 'auth-session-timeout';
        //export var notAuthenticated: string = 'auth-not-authenticated';
        //export var notAuthorized: string = 'auth-not-authorized';

        export var cacheUpdated: string = 'cache-item-updated';
        export var cacheRemoved: string = 'cache-item-removed';

        export var loginRefreshTokenFailed: string = 'auth-refresh-failed';
        export var loginRefreshTokenSuccess: string = 'auth-refresh-success';
        export var sessionExpired: string = 'auth-session-expired';
        export var sessionEnding: string = 'auth-session-ending';

        //export var cacheKeyLoggedIn: string = 'cache-key-loggedIn';
        };   
}

