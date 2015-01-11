/// <reference path="../_all.ts" />
'use strict';
var app;
(function (app) {
    angular.module('app.core').constant('toastr', toastr).constant('moment', moment);

    /* move this section into the API to enable multiple languages */
    (function (LANG) {
        LANG.applicationName = 'Boilerplate';
        LANG.LoggedIn = 'Logged in!';
        LANG.Registered = 'Registered!';
        LANG.WrongCredentals = 'Wrong credentials!';
        LANG.CanNotRegister = 'Cannot register!';
        LANG.NoAccess = 'No Access';
        LANG.Loaded = 'loaded';
        LANG.PleaseWait = 'Please Wait';

        LANG.login = 'login';
        LANG.test = 'test';
        LANG.logedinpage = 'loged in page';
        LANG.register = 'register';
        LANG.invalidpage = 'invalid page';
        LANG.logout = 'logout';
    })(app.LANG || (app.LANG = {}));
    var LANG = app.LANG;

    (function (CONST) {
        CONST.sessionStorageKey = 'authorizationData';
        CONST.sessionSlackTime = 10;
        CONST.sessionDisplaySessionEndWarningAtSecond = 50;
    })(app.CONST || (app.CONST = {}));
    var CONST = app.CONST;

    (function (EVENTS) {
        EVENTS.loginSuccess = 'auth-login-success';
        EVENTS.loginFailed = 'auth-login-failed';
        EVENTS.logoutSuccess = 'auth-logout-success';

        //export var sessionTimeout: string = 'auth-session-timeout';
        //export var notAuthenticated: string = 'auth-not-authenticated';
        //export var notAuthorized: string = 'auth-not-authorized';
        EVENTS.cacheUpdated = 'cache-item-updated';
        EVENTS.cacheRemoved = 'cache-item-removed';
    })(app.EVENTS || (app.EVENTS = {}));
    var EVENTS = app.EVENTS;
    ;
})(app || (app = {}));
//# sourceMappingURL=constants.js.map
