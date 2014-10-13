/// <reference path="../_all.ts" />

'use strict';
module app.services {

    export class LoginService { //implements ng.IServiceProvider
        private apiPath: string;
        private data: app.models.Token;

        private httpService: ng.IHttpService;
        private qService: ng.IQService;

        $post(model: app.models.Login): ng.IPromise<any> {
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
            log.debug("LoginService consturctor called");
            this.apiPath = 'token';
            this.httpService = $http;
            this.qService = $q;
        }

    }

}

app.application.service('loginService', app.services.LoginService);
