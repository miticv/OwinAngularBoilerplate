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
        private tokenData: app.useraccount.models.Token;
        private notifyingCache: INotifyingCache;

        private title: string;
        private busyMessage: string;
        private isBusy: boolean;
        private expiresInShow: boolean;

        public isLoggedIn: boolean;
        public expiresIn: number;
        public refresh_token: string;
        public userName: string;

        private fetchingRefreshToken : boolean;

        logout = function () {
            var self = this;
            //self.isLoggedIn = false;
            sessionStorage.removeItem(app.CONST.sessionStorageKey);
            self.dataSvc.$logout();
            self.location.path('/login');
        }

        refreshToken = function () {
            var self = this;            
            var model = new app.useraccount.models.Refresh();
            self.tokenData = self.getAuthTokenData(); 
            if (!self.tokenData) {
                self.logger.warning('refresh token expired');
                return;
            }
            self.fetchingRefreshToken = true;
            model.username = self.tokenData.userName;
            model.refresh_token = self.tokenData.refresh_token;

            self.dataSvc.$refresh(model).then(function (data) {

                self.tokenData = data;
                self.tokenData.useRefreshTokens = true;
                self.tokenData.clientIssuedTime = moment().unix();
                sessionStorage.setItem(app.CONST.sessionStorageKey, JSON.stringify(self.tokenData));
                self.notifyingCache.put(app.EVENTS.loginSuccess, moment().toString());
                self.logger.success('session refreshed');
                self.fetchingRefreshToken = false;
            }, function (err: app.ApiError) {                
                self.fetchingRefreshToken = false;
            });


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

            self.tokenData = self.getAuthTokenData();            
            if (self.tokenData) {                
                var refreshId = self.interval(function () {
                    if (self.fetchingRefreshToken) self.interval.cancel(refreshId);
                    self.expiresIn = self.calculateExpiredSeconds();
                    if (self.expiresIn <= 0)
                    {
                        self.logout();              
                        self.interval.cancel(refreshId);
                    }
                    self.expiresInShow = self.expiresIn <= app.CONST.sessionDisplaySessionEndWarningAtSecond;

                }, 1000);

          }
        }

        getAuthTokenData = function () {
            var authData = sessionStorage.getItem(app.CONST.sessionStorageKey);
            if (authData) {
                return JSON.parse(authData);
            } else {
                return null;
            }

        }

        calculateExpiredSeconds = function (refreshId) {
            var self = this; 
            if (self.fetchingRefreshToken) return self.expiresIn; //freeze time if refreshing token.
            var sessionEndTime = moment.unix(self.tokenData.clientIssuedTime).add(self.tokenData.expires_in - app.CONST.sessionSlackTime, 'seconds');
            return sessionEndTime.diff(moment(), 'seconds');
        }

        static $inject = ['$timeout', 'logger', '$scope', '$location', 'accountService', '$interval', 'NotifyingCache'];
        constructor($timeout: ng.ITimeoutService, logger: ILogger, $scope: ng.IScope, $location: ng.ILocationService, accountService: ng.IServiceProvider, $interval: ng.IIntervalService, NotifyingCache: INotifyingCache) {
            var self = this;

            self.isLoggedIn = false;
            self.logger = logger;
            //self.config = config;
            self.timeout = $timeout;
            self.scope = $scope;
            self.location = $location;
            self.dataSvc = accountService;
            self.interval = $interval;
            self.notifyingCache = NotifyingCache; 

            self.fetchingRefreshToken = false;
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