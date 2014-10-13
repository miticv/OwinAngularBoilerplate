/// <reference path="../_all.ts" />
'use strict';

module app.controllers {

    export class LogInController implements ILogInController {

        private $scope: any; 
        private dataSvc: ng.IServiceProvider;
        private tokenData: app.models.Token;

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

        static $inject = ['$scope', 'loginService'];
        constructor($scope: any, loginService: ng.IServiceProvider) {
            var self = this;            
            self.$scope = $scope;                        
            self.dataSvc = loginService;
        }
    }  
    
}
app.application.controller('logInController', app.controllers.LogInController);