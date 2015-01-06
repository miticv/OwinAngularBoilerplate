/// <reference path="../_all.ts" />
'use strict';

module app.layout {

    export class LayoutController implements IController {

        private logger: ILogger;
        private config: any;
        private timeout: any;
        private scope: any;
        private dataSvc: ng.IServiceProvider;

        private title: string;
        private busyMessage: string;
        private isBusy: boolean;
        private showSplash: boolean;

        public isLoggedIn: boolean;


        activate = function () {
            var self = this;

            //t: string = self.config.appTitle + ' loaded!';
            self.logger.success(self.title + ' loaded', null);
            //            Using a resolver on all routes or dataservice.ready in every controller
            //            dataservice.ready().then(function(){
            //                hideSplash();
            //            });
            self.hideSplash();

        }

        logout = function () {
            var self = this;
            self.isLoggedIn = false;
            sessionStorage.removeItem('authorizationData');
            self.location.path('/login');
        }

        getData = function () {
            var self = this;
            self.dataSvc.$userInfo().then(function (data) {
                self.test = data;
                self.logger.success(self.title + ' loaded', null);
                self.hideSplash();
                self.isLoggedIn = true;
            }, function (err: app.ApiError) {
                self.logger.success(self.title + ' loaded', null);
                self.hideSplash();
                self.isLoggedIn = false;                    
            });
        }

        hideSplash = function () {
            var self = this;
            //Force a 1 second delay so we can see the splash.
            self.timeout(function () {
                self.showSplash = false;
            }, 1000);
        }



        static $inject = ['$timeout', 'logger', '$scope', 'accountService'];
        constructor($timeout: any, logger: ILogger, $scope: any, accountService: ng.IServiceProvider) {
            var self = this;

            self.isLoggedIn = false;
            self.logger = logger;
            //self.config = config;
            self.timeout = $timeout;
            self.scope = $scope;
            self.dataSvc = accountService;

            self.title = 'test';      //   config.appTitle; 
            self.busyMessage = 'Please wait ...';
            self.isBusy = true;
            self.showSplash = true;
            self.getData();
            //self.activate();
        }     
    }

}
angular.module('app.layout').controller('layoutController', app.layout.LayoutController);