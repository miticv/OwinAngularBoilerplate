/// <reference path="../_all.ts" />
'use strict';

module app.useraccount {

    export class UserController implements IAccountController {
                                                             
        private dataSvc: ng.IServiceProvider;
        private tokenData: models.Token;
        private logger: ILogger;
        private location: ng.ILocationService;

        working: boolean;

        LogMeIn = function () {            
            var self = this;            
            self.working = true;
            var model = new models.Login();
            model.username = self.username;
            model.password = self.password;
            self.dataSvc.$login(model).then(function (data) {
                self.working = false;
                self.tokenData = data;
                self.tokenData.useRefreshTokens = true;
                sessionStorage.setItem(app.CONST.sessionStorageKey, JSON.stringify(self.tokenData));
                self.logger.success(app.LANG.LoggedIn);
                self.location.path('/userhome');
                
            }, function (err) {
                self.working = false;
                sessionStorage.removeItem(app.CONST.sessionStorageKey);  
                self.logger.error(app.LANG.WrongCredentals);               
            });


        }

        RegisterMe = function () {
            var self = this;
            var model = new models.Register();
            model.email = self.username;
            model.password = self.password;
            model.confirmPassword = self.confirmPassword;
            self.dataSvc.$register(model).then(function (data) {
                self.tokenData = data;
                self.tokenData.useRefreshTokens = true;
                sessionStorage.setItem(app.CONST.sessionStorageKey, JSON.stringify(self.tokenData));
                self.logger.success(app.LANG.Registered);
                self.location.path('/userhome');
            }, function (err: app.ApiError) {
                sessionStorage.removeItem(app.CONST.sessionStorageKey); 
                    var returnArray = (new ApiErrorHelper()).getModelError(err.data);
                    for (var error in returnArray) {
                        self.logger.error(returnArray[error].modelError, app.LANG.CanNotRegister);
                    }
                });
        }

        getData = function () {
            var self = this;
            self.dataSvc.$userInfo().then(function (data) {
                self.test = data;
            }, function (err: app.ApiError) {
                    var returnArray = (new ApiErrorHelper()).getModelError(err.data);
                    var errorVisible = false;
                    for (var error in returnArray) {
                        self.logger.error(returnArray[error].modelError, app.LANG.NoAccess);
                        errorVisible = true;
                    }
                    if (!errorVisible) {
                        self.logger.error(app.LANG.NoAccess);
                    }
                });
        }


        static $inject = ['$scope', 'accountService', 'logger', '$location'];
        constructor(scope: ng.IScope, accountService: ng.IServiceProvider, logger: ILogger, location: ng.ILocationService) {
            var self = this;   
            self.working = false;

            self.dataSvc = accountService;
            self.logger = logger;
            self.location = location;           
        }
    }  
                
}
angular.module('app.useraccount').controller('userController', app.useraccount.UserController);