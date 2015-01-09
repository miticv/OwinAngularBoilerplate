/// <reference path="../../_all.ts" />

'use strict';
module app {


    angular
        .module('blocks.cache')
        .factory('NotifyingCache', NotifyingCache);

    NotifyingCache.$inject = ['$rootScope'];
    function NotifyingCache($rootScope): INotifyingCache {

        var cache = {};

        this.put = function (key: string, value: any): void {
            var oldValue = this.get(key);
            cache[key] = value;
            $rootScope.$broadcast(
                app.EVENTS.cacheUpdated,
                { key: key, newValue: value, oldValue: oldValue });
        }

        this.remove = function (key: string): void {
            var value = this.get(key);
            delete cache[key];
            $rootScope.$broadcast(
                app.EVENTS.cacheRemoved,
                { key: key, value: value });
        }

        this.get = function (key: string): string {
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