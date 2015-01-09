/// <reference path="../_all.ts" />
var app;
(function (app) {
    (function (useraccount) {
        'use strict';

        angular.module('app.useraccount').config(UserAccountConfig);

        UserAccountConfig.$inject = ['$stateProvider'];

        function UserAccountConfig($stateProvider) {
            $stateProvider.state("login", {
                url: '/login',
                controller: 'app.useraccount.UserController',
                controllerAs: 'login',
                templateUrl: '/app/useraccount/login.html'
            }).state("register", {
                url: '/register',
                controller: 'app.useraccount.UserController',
                controllerAs: 'register',
                templateUrl: '/app/useraccount/register.html'
            }).state("userhome", {
                url: '/userhome',
                controller: 'app.useraccount.UserController',
                controllerAs: 'user',
                templateUrl: '/app/useraccount/userhome.html',
                resolve: {
                    'auth': [
                        'accountService', function (accountService) {
                            return accountService.$userInfo();
                        }]
                }
            });
        }
    })(app.useraccount || (app.useraccount = {}));
    var useraccount = app.useraccount;
})(app || (app = {}));
//# sourceMappingURL=config.route.js.map
