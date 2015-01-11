/// <reference path="../_all.ts" />

'use strict';
module app.useraccount.services {

    export class BaseService {
        //public apiPath: string;
        public data: any;
        public httpService: ng.IHttpService;
        public qService: ng.IQService;
        public notifyingCache: INotifyingCache;


        static $inject = ['$http', '$q', 'NotifyingCache'];
        constructor($http: ng.IHttpService, $q: ng.IQService, NotifyingCache: INotifyingCache) {
            //log.debug("BaseService consturctor called");
            //this.apiPath = 'token';
            this.httpService = $http;
            this.qService = $q;
            this.notifyingCache = NotifyingCache;
        }

    }


    export class AccountService extends BaseService { //implements ng.IServiceProvider

        //token
        $login(model: models.Login): ng.IPromise<any> {
            var self = this;
            var deferred = self.qService.defer();
            model.grant_type = 'password';
            model.client_id = 'app';
            var config: ng.IRequestConfig = {                 
                url: 'token',                 
                dataType: 'json',
                method: 'POST',
                data: common.querifyObject(model),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            };

            self.httpService(config). //post(self.apiPath, model)
                then(
                function (result: any) {
                    self.data = result.data;
                    deferred.resolve(self.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        //api/account/Register
        $register(model: models.Register): ng.IPromise<any> {
            var self = this;
            var deferred = self.qService.defer();            
            var config: ng.IRequestConfig = {
                url: 'api/account/Register',
                dataType: 'json',
                method: 'POST',
                data: model
            };

            self.httpService(config). //post(self.apiPath, model)
                then(
                function (result: any) {
                    self.data = result.data;
                    deferred.resolve(self.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        //api/account/UserInfo
        $userInfo(): ng.IPromise<any> {
            var self = this;
            var deferred = self.qService.defer();
            var config: ng.IRequestConfig = {
                url: 'api/account/UserInfo',
                dataType: 'json',
                method: 'GET' //we are passing token header with the injector
            };

            self.httpService(config). 
                then(
                function (result: any) {
                    self.data = result.data;
                    //self.notifyingCache.put(app.EVENTS.cacheKeyLoggedIn, true);
                    deferred.resolve(self.data);
                }, function (error) {
                    //self.notifyingCache.put(app.EVENTS.cacheKeyLoggedIn, false);
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        //token (refresh)
        $refresh(model: models.Refresh): ng.IPromise<any> {
            var self = this;
            var model: models.Refresh;
            var deferred = self.qService.defer();
            model.grant_type = 'refresh_token';
            model.client_id = 'app';

            var config: ng.IRequestConfig = {
                url: 'token',
                dataType: 'json',
                method: 'POST',
                data: common.querifyObject(model),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            };

            self.httpService(config).
                then(
                function (result: any) {
                    self.data = result.data;
                    self.notifyingCache.put(app.EVENTS.loginSuccess, moment().toString());
                    deferred.resolve(self.data);
                }, function (error) {
                    self.notifyingCache.put(app.EVENTS.loginFailed, moment().toString());
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        $logout() {
            var self = this;
            self.notifyingCache.put(app.EVENTS.logoutSuccess, moment().toString());
        }

        static $inject = ['$http', '$q', 'NotifyingCache'];
        constructor($http: ng.IHttpService, $q: ng.IQService, NotifyingCache: INotifyingCache) {
            super($http, $q, NotifyingCache);
        }

    }

}

angular.module('app.useraccount').service('accountService', app.useraccount.services.AccountService);
