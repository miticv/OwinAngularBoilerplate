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
        private i18next: any;

        private title: string;
        private busyMessage: string;
        private isBusy: boolean;
        private expiresInShow: boolean;

        public isLoggedIn: boolean;
        public expiresIn: number;
        private fetchingRefreshToken: boolean;

        logout = function () {
            var self = this;
            self.dataSvc.$logout();
            self.location.path('/login');
        }

        refreshToken = function () {
            var self = this;            
            var model = new app.useraccount.models.Refresh();
            self.tokenData = self.notifyingCache.get(app.CONST.sessionStorageKey); 
            if (!self.tokenData) {
                self.logger.warning(self.i18next('refreshtokenexpired'));
                return;
            }
            self.fetchingRefreshToken = true;
            model.username = self.tokenData.userName;
            model.refresh_token = self.tokenData.refresh_token;

            self.dataSvc.$refresh(model).then(function (data) {               
                self.tokenData = data;
                self.logger.success(self.i18next('sessionrefreshed'));                
            }, function (err: app.ApiError) {                
                self.fetchingRefreshToken = false;
            });


        }

        getData = function () {
            var self = this;
            self.dataSvc.$userInfo().then(function (data) {
                self.test = data;
                self.isLoggedIn = true;
                self.countdown();
            }, function (err: app.ApiError) {               
            });
        }

        changeLanguage = function (lng) {
            var self = this;
            self.i18next.options.lng = lng;            
        }

        countdown = function () {
            var self = this;  

            self.tokenData = self.notifyingCache.get(app.CONST.sessionStorageKey);            
            if (self.tokenData && self.isLoggedIn) {                
                var refreshId = self.interval(function () {
                    if (self.fetchingRefreshToken || !self.isLoggedIn) self.interval.cancel(refreshId);
                    self.expiresIn = self.calculateExpiredSeconds();
                    if (self.expiresIn <= 0)
                    {
                        self.logout();              
                        self.interval.cancel(refreshId);
                    }
                    self.expiresInShow = self.expiresIn <= app.CONST.sessionDisplaySessionEndWarningAtSecond;

                }, 1000);

            }
            self.fetchingRefreshToken = false;
        }

        calculateExpiredSeconds = function () {
            var self = this; 
            if (self.fetchingRefreshToken) return self.expiresIn; //freeze time if refreshing token.
            var sessionEndTime = moment.unix(self.tokenData.clientIssuedTime).add(self.tokenData.expires_in - app.CONST.sessionSlackTime, 'seconds');
            return sessionEndTime.diff(moment(), 'seconds');
        }

        static $inject = ['$timeout', 'logger', '$scope', '$location', 'accountService', '$interval', 'NotifyingCache','$i18next'];
        constructor($timeout: ng.ITimeoutService, logger: ILogger, $scope: ng.IScope, $location: ng.ILocationService, accountService: ng.IServiceProvider, $interval: ng.IIntervalService, NotifyingCache: INotifyingCache, $i18next: any) {
            var self = this;

            self.isLoggedIn = false;
            self.logger = logger;
            self.timeout = $timeout;
            self.scope = $scope;
            self.location = $location;
            self.dataSvc = accountService;
            self.interval = $interval;
            self.notifyingCache = NotifyingCache; 
            self.i18next = $i18next;

            self.fetchingRefreshToken = false;            
            self.isBusy = true;
            self.expiresInShow = false;

            $scope.$on(app.EVENTS.loginSuccess, function (e, kvp) {
                    self.isLoggedIn = true;
                    self.countdown();                
            });

            $scope.$on(app.EVENTS.loginRefreshTokenSuccess, function (e, kvp) {
                self.expiresInShow = false; 
                self.fetchingRefreshToken = false;                 
                self.isLoggedIn = true;
                self.countdown();
            });

            $scope.$on(app.EVENTS.logoutSuccess, function (e, kvp) {
                    self.isLoggedIn = false;  
                    self.expiresIn = null;            
            });

            $scope.$on(app.EVENTS.i18LanguageChange, function () {
                self.title = self.i18next('applicationname');      //   config.appTitle; 
                //self.busyMessage = self.i18next('pleasewait') + ' ...';
                self.logger.success(self.title + ' ' + self.i18next('loaded'), null);
            });

        }     
    }

}
angular.module('app.layout').controller('layoutController', app.layout.LayoutController);