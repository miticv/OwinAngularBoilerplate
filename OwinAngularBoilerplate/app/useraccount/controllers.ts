/// <reference path="../_all.ts" />
'use strict';

module app.useraccount {

    export class LogInController implements ILogInController {
                                                              
        private dataSvc: ng.IServiceProvider;
        private tokenData: models.Token;
        private logger: ILogger;

        LogmeIn: Function;

        LogMeIn = function () {
            var self = this;            
            var model = new models.Login();
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
        }

        static $inject = ['loginService', 'logger'];
        constructor(loginService: ng.IServiceProvider, logger: ILogger) {
            var self = this;                                   
            self.dataSvc = loginService;
            self.logger = logger;
        }
    }  
    
}
angular.module('app.useraccount').controller('logInController', app.useraccount.LogInController);