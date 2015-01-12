/// <reference path="../../_all.ts" />
'use strict';
var app;
(function (app) {
    angular.module('blocks.cache').factory('NotifyingCache', NotifyingCache);

    NotifyingCache.$inject = ['$rootScope'];
    function NotifyingCache($rootScope) {
        var cache = {};

        this.put = function (key, value) {
            //login
            if (key === app.EVENTS.loginSuccess) {
                sessionStorage.setItem(app.CONST.sessionStorageKey, JSON.stringify(value));
                $rootScope.$broadcast(app.EVENTS.loginSuccess);
                //refresh
            } else if (key === app.EVENTS.loginRefreshTokenSuccess) {
                sessionStorage.setItem(app.CONST.sessionStorageKey, JSON.stringify(value));
                $rootScope.$broadcast(app.EVENTS.loginRefreshTokenSuccess);
                //login failed
            } else if (key === app.EVENTS.loginFailed) {
                sessionStorage.removeItem(app.CONST.sessionStorageKey);
                $rootScope.$broadcast(app.EVENTS.loginFailed);
                //logout
            } else if (key === app.EVENTS.logoutSuccess) {
                sessionStorage.removeItem(app.CONST.sessionStorageKey);
                $rootScope.$broadcast(app.EVENTS.logoutSuccess);
                //session Expired
            } else if (key === app.EVENTS.sessionExpired) {
                sessionStorage.removeItem(app.CONST.sessionStorageKey);
                $rootScope.$broadcast(app.EVENTS.sessionExpired);
                //session ending
            } else if (key === app.EVENTS.sessionEnding && value === true && cache[key] !== value) {
                $rootScope.$broadcast(app.EVENTS.sessionEnding);
            }

            var oldValue = this.get(key);
            cache[key] = value;
            $rootScope.$broadcast(app.EVENTS.cacheUpdated, { key: key, newValue: value, oldValue: oldValue });
        };

        this.remove = function (key) {
            if (key === app.CONST.sessionStorageKey) {
                sessionStorage.removeItem(app.CONST.sessionStorageKey);
            }
            var value = this.get(key);
            delete cache[key];
            $rootScope.$broadcast(app.EVENTS.cacheRemoved, { key: key, value: value });
        };

        this.get = function (key) {
            //check for session persistant variables
            if (key === app.CONST.sessionStorageKey && !cache[key]) {
                var authData = sessionStorage.getItem(app.CONST.sessionStorageKey);
                return authData ? JSON.parse(authData) : null;
            } else {
                return cache[key] || null;
            }
        };

        var service = {
            cache: cache,
            put: this.put,
            remove: this.remove,
            get: this.get
        };

        return service;
    }
})(app || (app = {}));
//# sourceMappingURL=cache.js.map
