/// <reference path="../../_all.ts" />
var Main;
(function (Main) {
    (function (DemoApp) {
        (function (services) {
            var LoginService = (function () {
                function LoginService($http, $q) {
                    this.apiPath = 'token';
                    this.httpService = $http;
                    this.qService = $q;
                }
                LoginService.prototype.$get = function (model) {
                    var self = this;
                    var deferred = self.qService.defer();
                    model.grant_type = 'password';
                    self.httpService.post(self.apiPath, model).then(function (result) {
                        self.data = result.data;
                        deferred.resolve(self.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                    return deferred.promise;
                };

                LoginService.LoginServiceFactory = function ($http, $q) {
                    return new LoginService($http, $q);
                };
                return LoginService;
            })();
            services.LoginService = LoginService;
        })(DemoApp.services || (DemoApp.services = {}));
        var services = DemoApp.services;
    })(Main.DemoApp || (Main.DemoApp = {}));
    var DemoApp = Main.DemoApp;
})(Main || (Main = {}));
//# sourceMappingURL=LoginService.js.map
