/// <reference path="../_all.ts" />
'use strict';

module app.controllers {

    export class LogInController implements ILogInController {
                                                              
        private dataSvc: ng.IServiceProvider;
        private tokenData: app.models.Token;

        LogmeIn: Function;

        LogMeIn = function () {
            var self = this;                       
            var model = new app.models.Login();
            model.username = self.username;
            model.password = self.password;
            self.dataSvc.$post(model).then(function (data) {
                self.tokenData = data;
                localStorage.setItem("token", self.tokenData.access_token);
            });
        }

        static $inject = ['loginService'];
        constructor( loginService: ng.IServiceProvider) {
            var self = this;                                   
            self.dataSvc = loginService;
        }
    }  
    
}
app.application.controller('logInController', app.controllers.LogInController);