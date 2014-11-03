/// <reference path="../_all.ts" />
'use strict';

module app.useraccount {

    export class LogInController implements IAccountController {
                                                             
        private dataSvc: ng.IServiceProvider;
        private tokenData: models.Token;
        private logger: ILogger;
        private location: any;

        LogMeIn = function () {            
            var self = this;            
            var model = new models.Login();
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
        }


        static $inject = ['$scope', 'accountService', 'logger', '$location'];
        constructor(scope: any, accountService: ng.IServiceProvider, logger: ILogger, location: any) {
            var self = this;                                   
            self.dataSvc = accountService;
            self.logger = logger;
            self.location = location;            
        }
    }  
  
    export class RegisterController implements IAccountController {

        private dataSvc: ng.IServiceProvider;
        private tokenData: models.Token;
        private logger: ILogger;


        RegisterMe = function () {
            var self = this;
            var model = new models.Register();
            model.email = self.username;
            model.password = self.password;
            model.confirmPassword = self.confirmPassword;
            self.dataSvc.$register(model).then(function (data) {
                self.tokenData = data;
                self.logger.success("Registered!");
            }, function (err: app.ApiError) {
                var returnArray = (new ApiErrorHelper()).getModelError(err.data);
                for(var error in returnArray)
                {
                    self.logger.error(returnArray[error].modelError, "Could not register!");
                }
            });
        }


        static $inject = ['$scope', 'accountService', 'logger'];
        constructor(scope: any, accountService: ng.IServiceProvider, logger: ILogger) {
            var self = this;
            self.dataSvc = accountService;
            self.logger = logger;
            //var originalClientProfile = angular.copy($scope.clientProfile.item);
            //function isClientFormChanged() {
            //    return !angular.equals($scope.clientProfile.item, originalClientProfile);
            //}
            //SAVE: ng-disabled="readOnly || clientForm.$invalid || !isClientFormChanged()"
        }
    }  
   
    export class UserController implements IAccountController {

        private dataSvc: ng.IServiceProvider;
        private tokenData: models.Token;
        private logger: ILogger;



        getData = function () { 
            var self = this;
            self.dataSvc.$userInfo().then(function (data) {
                self.test = data;
            }, function (err: app.ApiError) {
                var returnArray = (new ApiErrorHelper()).getModelError(err.data);
                var errorVisible = false;
                for (var error in returnArray) {
                    self.logger.error(returnArray[error].modelError, "No Access");
                    errorVisible = true;
                }
                if (!errorVisible) {
                    self.logger.error("No Access");
                }                   
            });
        }


        static $inject = ['$scope', 'accountService', 'logger'];
        constructor(scope: any, accountService: ng.IServiceProvider, logger: ILogger) {
            var self = this;
            self.dataSvc = accountService;
            self.logger = logger;
            self.getData();
        }
    }  
    
}
angular.module('app.useraccount').controller('loginController', app.useraccount.LogInController);
angular.module('app.useraccount').controller('registerController', app.useraccount.RegisterController);
angular.module('app.useraccount').controller('userController', app.useraccount.UserController);