/// <reference path="../_all.ts" />
'use strict';
var app;
(function (app) {
    (function (useraccount) {
        var UserController = (function () {
            function UserController(scope, accountService, logger, location, NotifyingCache) {
                this.LogMeIn = function () {
                    var self = this;
                    self.working = true;
                    var model = new useraccount.models.Login();
                    model.username = self.username;
                    model.password = self.password;
                    self.dataSvc.$login(model).then(function (data) {
                        self.working = false;
                        self.tokenData = data;
                        self.tokenData.useRefreshTokens = true;
                        self.logger.success(app.LANG.LoggedIn);
                        self.location.path('/userhome');
                    }, function (err) {
                        self.working = false;
                        var returnArray = (new app.ApiErrorHelper()).getModelError(err.data);
                        for (var error in returnArray) {
                            self.logger.error(returnArray[error].modelError, app.LANG.CanNotRegister);
                        }
                    });
                };
                this.RegisterMe = function () {
                    var self = this;
                    var model = new useraccount.models.Register();
                    model.email = self.username;
                    model.password = self.password;
                    model.confirmPassword = self.confirmPassword;
                    self.dataSvc.$register(model).then(function (data) {
                        self.tokenData = data;
                        self.logger.success(app.LANG.Registered);
                        self.location.path('/successRegister');
                    }, function (err) {
                        var returnArray = (new app.ApiErrorHelper()).getModelError(err.data);
                        for (var error in returnArray) {
                            self.logger.error(returnArray[error].modelError, app.LANG.CanNotRegister);
                        }
                    });
                };
                this.getData = function () {
                    var self = this;
                    self.dataSvc.$userInfo().then(function (data) {
                        self.test = data;
                    }, function (err) {
                        var returnArray = (new app.ApiErrorHelper()).getModelError(err.data);
                        var errorVisible = false;
                        for (var error in returnArray) {
                            self.logger.error(returnArray[error].modelError, app.LANG.NoAccess);
                            errorVisible = true;
                        }
                        if (!errorVisible) {
                            self.logger.error(app.LANG.NoAccess);
                        }
                    });
                };
                var self = this;
                self.working = false;

                self.dataSvc = accountService;
                self.logger = logger;
                self.location = location;
                self.notifyingCache = NotifyingCache;
            }
            UserController.$inject = ['$scope', 'accountService', 'logger', '$location', 'NotifyingCache'];
            return UserController;
        })();
        useraccount.UserController = UserController;
    })(app.useraccount || (app.useraccount = {}));
    var useraccount = app.useraccount;
})(app || (app = {}));
angular.module('app.useraccount').controller('userController', app.useraccount.UserController);
//# sourceMappingURL=controllers.js.map
