/// <reference path="../_all.ts" />
'use strict';

module app.layout {

    export class LayoutController implements IController {

        private logger: ILogger;
        private config: any;
        private timeout: ng.ITimeoutService;
        private scope: ng.IScope;
        private location: ng.ILocationService;
        private dataSvc: ng.IServiceProvider;

        private title: string;
        private busyMessage: string;
        private isBusy: boolean;
        //private showSplash: boolean;

        public isLoggedIn: boolean;


        activate = function () {
            var self = this;

            //t: string = self.config.appTitle + ' loaded!';
            self.logger.success(self.title + ' ' + app.LANG.Loaded, null);
            //            Using a resolver on all routes or dataservice.ready in every controller
            //            dataservice.ready().then(function(){
            //                hideSplash();
            //            });
            //self.hideSplash();

        }

        logout = function () {
            var self = this;
            //self.isLoggedIn = false;
            sessionStorage.removeItem(app.CONST.sessionStorageKey);
            self.dataSvc.$logout();
            self.location.path('/login');
        }

        getData = function () {
            var self = this;
            self.dataSvc.$userInfo().then(function (data) {
                self.test = data;
                self.logger.success(self.title + ' ' + app.LANG.Loaded, null);
                //self.hideSplash();
            }, function (err: app.ApiError) {
                self.logger.success(self.title + ' ' + app.LANG.Loaded, null);
                //self.hideSplash();                  
            });
        }

        //hideSplash = function () {
        //    var self = this;
        //    //Force a 1 second delay so we can see the splash.
        //    self.timeout(function () {
        //        self.showSplash = false;
        //    }, 1000);
        //}



        static $inject = ['$timeout', 'logger', '$scope', '$location', 'accountService'];
        constructor($timeout: ng.ITimeoutService, logger: ILogger, $scope: ng.IScope, $location: ng.ILocationService, accountService: ng.IServiceProvider) {
            var self = this;

            self.isLoggedIn = false;
            self.logger = logger;
            //self.config = config;
            self.timeout = $timeout;
            self.scope = $scope;
            self.location = $location;
            self.dataSvc = accountService;

            self.title = app.LANG.applicationName;      //   config.appTitle; 
            self.busyMessage = app.LANG.PleaseWait + ' ...';
            self.isBusy = true;
            //self.showSplash = true;
            //self.getData();
            //self.activate();

            $scope.$on(app.EVENTS.cacheUpdated, function (e, kvp) {
                if (kvp.key === app.EVENTS.cacheKeyLoggedIn) {
                    self.isLoggedIn = kvp.newValue;
                }
            });
        }     
    }

}
angular.module('app.layout').controller('layoutController', app.layout.LayoutController);