/// <reference path="../_all.ts" />
'use strict';
var app;
(function (app) {
    angular.module('app.core').constant('toastr', toastr).constant('moment', moment);

    (function (EVENTS) {
        EVENTS.loginSuccess = 'auth-login-success';
        EVENTS.loginFailed = 'auth-login-failed';
        EVENTS.logoutSuccess = 'auth-logout-success';
        EVENTS.sessionTimeout = 'auth-session-timeout';
        EVENTS.notAuthenticated = 'auth-not-authenticated';
        EVENTS.notAuthorized = 'auth-not-authorized';

        EVENTS.cacheUpdated = 'cache-item-updated';
        EVENTS.cacheRemoved = 'cache-item-removed';

        EVENTS.cacheKeyLoggedIn = 'cache-key-loggedIn';
    })(app.EVENTS || (app.EVENTS = {}));
    var EVENTS = app.EVENTS;
    ;
})(app || (app = {}));
//# sourceMappingURL=constants.js.map
