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
        private interval: ng.IIntervalService;
        private token: app.useraccount.models.Token;

        private title: string;
        private busyMessage: string;
        private isBusy: boolean;
        private expiresInShow: boolean;

        public isLoggedIn: boolean;
        public expiresIn: number;
        public refresh_token: string;
        public userName: string;

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
                self.isLoggedIn = true;
                self.countdown();
            }, function (err: app.ApiError) {
                self.logger.success(self.title + ' ' + app.LANG.Loaded, null);                 
            });
        }


        countdown = function () {
            var self = this;       
            var authData = sessionStorage.getItem(app.CONST.sessionStorageKey);
            if (authData) {

                self.token = JSON.parse(authData);                                
                self.expiresIn = self.calculateExpiredSeconds();

                var refreshId = self.interval(function () {
                    self.expiresIn = self.calculateExpiredSeconds();
                    if (self.expiresIn <= 0)
                    {
                        self.logout();              
                        self.interval.cancel(refreshId);
                    }
                    if (self.expiresIn <= app.CONST.sessionDisplaySessionEndWarningAtSecond) {
                        self.expiresInShow = true;
                    }
                }, 1000);
          }
        }

        calculateExpiredSeconds = function () {
            var self = this; 
            var sessionEndTime = moment.unix(self.token.clientIssuedTime).add(self.token.expires_in - app.CONST.sessionSlackTime, 'seconds');
            return sessionEndTime.diff(moment(), 'seconds');
        }

        static $inject = ['$timeout', 'logger', '$scope', '$location', 'accountService', '$interval'];
        constructor($timeout: ng.ITimeoutService, logger: ILogger, $scope: ng.IScope, $location: ng.ILocationService, accountService: ng.IServiceProvider, $interval: ng.IIntervalService) {
            var self = this;

            self.isLoggedIn = false;
            self.logger = logger;
            //self.config = config;
            self.timeout = $timeout;
            self.scope = $scope;
            self.location = $location;
            self.dataSvc = accountService;
            self.interval = $interval;


            self.title = app.LANG.applicationName;      //   config.appTitle; 
            self.busyMessage = app.LANG.PleaseWait + ' ...';
            self.isBusy = true;
            self.expiresInShow = false;

            //self.showSplash = true;
            //self.getData();
            //self.activate();

            $scope.$on(app.EVENTS.cacheUpdated, function (e, kvp) {
                if (kvp.key === app.EVENTS.loginSuccess) {
                    self.isLoggedIn = true;
                    self.countdown();
                
                } else if (kvp.key === app.EVENTS.logoutSuccess) {
                    self.isLoggedIn = false;
                    self.expiresIn = null;
                    self.refresh_token = null;
                    self.userName = null;

                }
            });

            $scope.$on(app.EVENTS.cacheRemoved, function (e, kvp) {
                if (kvp.key === app.EVENTS.logoutSuccess) {
                    self.isLoggedIn = false;  
                    self.expiresIn = null;
                    self.refresh_token = null;
                    self.userName = null;              
                }
            });

        }     
    }

}
angular.module('app.layout').controller('layoutController', app.layout.LayoutController);