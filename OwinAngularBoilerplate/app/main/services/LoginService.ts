/// <reference path="../../_all.ts" />

module Main.DemoApp.services {

        export class LoginService implements ng.IServiceProvider {
            private apiPath: string;
            private data: DemoApp.models.Token;

            private httpService: ng.IHttpService;
            private qService: ng.IQService;

            $get(model : DemoApp.models.Login): ng.IPromise<any> {
                var self = this;
                var deferred = self.qService.defer();
                model.grant_type = 'password';
                self.httpService.post(self.apiPath, model).then(
                    function (result: any) {
                        self.data = result.data;
                        deferred.resolve(self.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }


            constructor($http: ng.IHttpService, $q: ng.IQService) {
                this.apiPath = 'token';
                this.httpService = $http;
                this.qService = $q;
            }

            public static LoginServiceFactory($http: ng.IHttpService, $q: ng.IQService): LoginService {
                return new LoginService($http, $q);
            }
        }




} 