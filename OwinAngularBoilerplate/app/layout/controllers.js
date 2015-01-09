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
                    self.logger.success(self.title + ' ' + app.LANG.Loaded, null);
                    //            Using a resolver on all routes or dataservice.ready in every controller
                    //            dataservice.ready().then(function(){
                    //                hideSplash();
                    //            });
                    //self.hideSplash();
                };
                this.logout = function () {
                    var self = this;

                    //self.isLoggedIn = false;
                    sessionStorage.removeItem(app.CONST.sessionStorageKey);
                    self.dataSvc.$logout();
                    self.location.path('/login');
                };
                this.getData = function () {
                    var self = this;
                    self.dataSvc.$userInfo().then(function (data) {
                        self.test = data;
                        self.logger.success(self.title + ' ' + app.LANG.Loaded, null);
                        //self.hideSplash();
                    }, function (err) {
                        self.logger.success(self.title + ' ' + app.LANG.Loaded, null);
                        //self.hideSplash();
                    });
                };
                var self = this;

                self.isLoggedIn = false;
                self.logger = logger;

                //self.config = config;
                self.timeout = $timeout;
                self.scope = $scope;
                self.location = $location;
                self.dataSvc = accountService;

                self.title = app.LANG.applicationName; //   config.appTitle;
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
            LayoutController.$inject = ['$timeout', 'logger', '$scope', '$location', 'accountService'];
            return LayoutController;
        })();
        layout.LayoutController = LayoutController;
    })(app.layout || (app.layout = {}));
    var layout = app.layout;
})(app || (app = {}));
angular.module('app.layout').controller('layoutController', app.layout.LayoutController);
//# sourceMappingURL=controllers.js.map
