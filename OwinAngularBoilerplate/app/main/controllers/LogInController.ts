/// <reference path="../../_all.ts" />

module Main.DemoApp.controllers {
    
     export class LogInController {

        private $scope : Main.DemoApp.interfaces.ILogInScope; //ng.IScope; 
        private dataSvc: Main.DemoApp.services.LoginService; //ng.IServiceProvider; 
        private tokenData : Main.DemoApp.models.Token;            



        //private init(): void {
        //    var self = this;            
        //}

        constructor($scope: Main.DemoApp.interfaces.ILogInScope, dataSvc: Main.DemoApp.services.LoginService) {
            var self = this;

            self.$scope = $scope;
            self.dataSvc = dataSvc;


            self.$scope.LogMeIn = function() {
                var self = this;
                self.dataSvc.$get(self.$scope.Login).then(function (data) {
                    self.tokenData = data;                
                });
            }
        }
   }    
}