/// <reference path="../_all.ts" />
'use strict';
var app;
(function (app) {
    (function (useraccount) {
        var LogInController = (function () {
            function LogInController(scope, accountService, logger, location) {
                this.LogMeIn = function () {
                    var self = this;
                    var model = new useraccount.models.Login();
                    model.username = self.username;
                    model.password = self.password;
                    self.dataSvc.$login(model).then(function (data) {
                        self.tokenData = data;
                        localStorage.setItem("token", self.tokenData.access_token);
                        self.logger.success("Logged in!");
                        self.location.path('/userhome');
                    }, function (err) {
                        localStorage.removeItem("token");
                        self.logger.error("Wrong credentials!");
                    });
                };
                var self = this;
                self.dataSvc = accountService;
                self.logger = logger;
                self.location = location;
            }
            LogInController.$inject = ['$scope', 'accountService', 'logger', '$location'];
            return LogInController;
        })();
        useraccount.LogInController = LogInController;

        var RegisterController = (function () {
            function RegisterController(scope, accountService, logger) {
                this.RegisterMe = function () {
                    var self = this;
                    var model = new useraccount.models.Register();
                    model.email = self.username;
                    model.password = self.password;
                    model.confirmPassword = self.confirmPassword;
                    self.dataSvc.$register(model).then(function (data) {
                        self.tokenData = data;
                        self.logger.success("Registered!");
                    }, function (err) {
                        var returnArray = (new app.ApiErrorHelper()).getModelError(err.data);
                        for (var error in returnArray) {
                            self.logger.error(returnArray[error].modelError, "Could not register!");
                        }
                    });
                };
                var self = this;
                self.dataSvc = accountService;
                self.logger = logger;
                //var originalClientProfile = angular.copy($scope.clientProfile.item);
                //function isClientFormChanged() {
                //    return !angular.equals($scope.clientProfile.item, originalClientProfile);
                //}
                //SAVE: ng-disabled="readOnly || clientForm.$invalid || !isClientFormChanged()"
            }
            RegisterController.$inject = ['$scope', 'accountService', 'logger'];
            return RegisterController;
        })();
        useraccount.RegisterController = RegisterController;

        var UserController = (function () {
            function UserController(scope, accountService, logger) {
                this.getData = function () {
                    var self = this;
                    self.dataSvc.$userInfo().then(function (data) {
                        self.test = data;
                    }, function (err) {
                        var returnArray = (new app.ApiErrorHelper()).getModelError(err.data);
                        var errorVisible = false;
                        for (var error in returnArray) {
                            self.logger.error(returnArray[error].modelError, "No Access");
                            errorVisible = true;
                        }
                        if (!errorVisible) {
                            self.logger.error("No Access");
                        }
                    });
                };
                var self = this;
                self.dataSvc = accountService;
                self.logger = logger;
                self.getData();
            }
            UserController.$inject = ['$scope', 'accountService', 'logger'];
            return UserController;
        })();
        useraccount.UserController = UserController;
    })(app.useraccount || (app.useraccount = {}));
    var useraccount = app.useraccount;
})(app || (app = {}));
angular.module('app.useraccount').controller('loginController', app.useraccount.LogInController);
angular.module('app.useraccount').controller('registerController', app.useraccount.RegisterController);
angular.module('app.useraccount').controller('userController', app.useraccount.UserController);
//# sourceMappingURL=controllers.js.map
