/// <reference path="../_all.ts" />
'use strict';
var app;
(function (app) {
    (function (controllers) {
        var LogInController = (function () {
            function LogInController($scope, loginService) {
                this.LogMeIn = function () {
                    var self = this;
                    var model = new app.models.Login();
                    model.username = self.username;
                    model.password = self.password;
                    self.dataSvc.$post(model).then(function (data) {
                        self.tokenData = data;
                        localStorage.setItem("token", self.tokenData.access_token);
                    });
                };
                var self = this;
                self.$scope = $scope;
                self.dataSvc = loginService;
            }
            LogInController.$inject = ['$scope', 'loginService'];
            return LogInController;
        })();
        controllers.LogInController = LogInController;
    })(app.controllers || (app.controllers = {}));
    var controllers = app.controllers;
})(app || (app = {}));
app.application.controller('logInController', app.controllers.LogInController);
//# sourceMappingURL=controllers.js.map
