/// <reference path="../_all.ts" />
'use strict';
var app;
(function (app) {
    (function (layout) {
        var LayoutController = (function () {
            function LayoutController($timeout, logger, $scope, $location, accountService) {
                this.activate = function () {
                    var self = this;

                    //t: string = self.config.appTitle + ' loaded!';
                    self.logger.success(self.title + ' loaded', null);

                    //            Using a resolver on all routes or dataservice.ready in every controller
                    //            dataservice.ready().then(function(){
                    //                hideSplash();
                    //            });
                    self.hideSplash();
                };
                this.logout = function () {
                    var self = this;
                    self.isLoggedIn = false;
                    sessionStorage.removeItem('authorizationData');
                    self.dataSvc.$logout();
                    self.location.path('/login');
                };
                this.getData = function () {
                    var self = this;
                    self.dataSvc.$userInfo().then(function (data) {
                        self.test = data;
                        self.logger.success(self.title + ' loaded', null);
                        self.hideSplash();
                        self.isLoggedIn = true;
                    }, function (err) {
                        self.logger.success(self.title + ' loaded', null);
                        self.hideSplash();
                        self.isLoggedIn = false;
                    });
                };
                this.hideSplash = function () {
                    var self = this;

                    //Force a 1 second delay so we can see the splash.
                    self.timeout(function () {
                        self.showSplash = false;
                    }, 1000);
                };
                var self = this;

                self.isLoggedIn = false;
                self.logger = logger;

                //self.config = config;
                self.timeout = $timeout;
                self.scope = $scope;
                self.location = $location;
                self.dataSvc = accountService;

                self.title = 'test'; //   config.appTitle;
                self.busyMessage = 'Please wait ...';
                self.isBusy = true;
                self.showSplash = true;
                self.getData();

                //self.activate();
                $scope.$on(app.EVENTS.cacheUpdated, function (e, kvp) {
                    if (kvp.key === app.EVENTS.cacheKeyLoggedIn) {
                        self.isLoggedIn = kvp.newValue;
                    }
                });
            }
            LayoutController.$inject = ['$timeout', 'logger', '$scope', '$location', 'accountService'];
            return LayoutController;
        })();
        layout.LayoutController = LayoutController;
    })(app.layout || (app.layout = {}));
    var layout = app.layout;
})(app || (app = {}));
angular.module('app.layout').controller('layoutController', app.layout.LayoutController);
//# sourceMappingURL=controllers.js.map
