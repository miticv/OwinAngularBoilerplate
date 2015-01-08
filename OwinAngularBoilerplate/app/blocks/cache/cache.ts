/// <reference path="../../_all.ts" />

'use strict';
module app {

    angular
        .module('blocks.cache')
        .factory('NotifyingCache', NotifyingCache);

    NotifyingCache.$inject = ['$rootScope'];
    function NotifyingCache($rootScope) {

        var cache = {};

        this.put = function (key, value) {
            var oldValue = this.get(key);
            cache[key] = value;
            $rootScope.$broadcast(
                app.EVENTS.cacheUpdated,
                { key: key, newValue: value, oldValue: oldValue });
        }

        this.remove = function (key) {
            var value = this.get(key);
            delete cache[key];
            $rootScope.$broadcast(
                app.EVENTS.cacheRemoved,
                { key: key, value: value });
        }

        this.get = function (key) {
            return cache[key] || null;
        }      

        var service = {
            cache: cache,
            put: this.put,
            remove: this.remove,
            get: this.get
        };

        return service;
    }
}