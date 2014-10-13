/// <reference path="../_all.ts" />
'use strict';
var app;
(function (app) {
    (function (services) {
        var LoginService = (function () {
            function LoginService($http, $q) {
                app.log.debug("LoginService consturctor called");
                this.apiPath = 'token';
                this.httpService = $http;
                this.qService = $q;
            }
            LoginService.prototype.$post = function (model) {
                var self = this;
                var deferred = self.qService.defer();
                model.grant_type = 'password';
                var config = {
                    url: self.apiPath,
                    dataType: 'json',
                    method: 'POST',
                    data: app.common.querifyObject(model),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                };

                self.httpService(config).then(function (result) {
                    self.data = result.data;
                    deferred.resolve(self.data);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            };

            LoginService.$inject = ['$http', '$q'];
            return LoginService;
        })();
        services.LoginService = LoginService;
    })(app.services || (app.services = {}));
    var services = app.services;
})(app || (app = {}));

app.application.service('loginService', app.services.LoginService);
//# sourceMappingURL=services.js.map
