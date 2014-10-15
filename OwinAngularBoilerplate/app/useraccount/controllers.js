/// <reference path="../_all.ts" />
'use strict';
var app;
(function (app) {
    (function (useraccount) {
        var LogInController = (function () {
            function LogInController(loginService, logger) {
                this.LogMeIn = function () {
                    var self = this;
                    var model = new useraccount.models.Login();
                    model.username = self.username;
                    model.password = self.password;
                    self.dataSvc.$post(model).then(function (data) {
                        self.tokenData = data;
                        localStorage.setItem("token", self.tokenData.access_token);
                        self.logger.success("Logged in!");
                    }, function (err) {
                        localStorage.removeItem("token");
                        self.logger.error("Wrong credentials!");
                    });
                };
                var self = this;
                self.dataSvc = loginService;
                self.logger = logger;
            }
            LogInController.$inject = ['loginService', 'logger'];
            return LogInController;
        })();
        useraccount.LogInController = LogInController;
    })(app.useraccount || (app.useraccount = {}));
    var useraccount = app.useraccount;
})(app || (app = {}));
angular.module('app.useraccount').controller('logInController', app.useraccount.LogInController);
//# sourceMappingURL=controllers.js.map
