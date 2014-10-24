/// <reference path="../_all.ts" />

'use strict';
module app.useraccount.services {

    export class BaseService {
        public apiPath: string;
        public data: any;
        public httpService: ng.IHttpService;
        public qService: ng.IQService;


        static $inject = ['$http', '$q'];
        constructor($http: ng.IHttpService, $q: ng.IQService) {
            //log.debug("BaseService consturctor called");
            //this.apiPath = 'token';
            this.httpService = $http;
            this.qService = $q;
        }

    }


    export class LoginService extends BaseService { //implements ng.IServiceProvider


        $post(model: models.Login): ng.IPromise<any> {
            var self = this;
            var deferred = self.qService.defer();
            model.grant_type = 'password';
            var config: ng.IRequestConfig = {                 
                url: self.apiPath,                 
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

        static $inject = ['$http', '$q'];
        constructor($http: ng.IHttpService, $q: ng.IQService) {
            super($http, $q);
            //log.debug("LoginService consturctor called");
            this.apiPath = 'token';

        }

    }

}

angular.module('app.useraccount').service('loginService', app.useraccount.services.LoginService);
