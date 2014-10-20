/// <reference path="../_all.ts" />
var app;
(function (app) {
    (function (useraccount) {
        'use strict';

        angular.module('app.useraccount').config(UserAccountConfig);

        UserAccountConfig.$inject = [
            '$stateProvider',
            '$urlRouterProvider'];

        function UserAccountConfig($stateProvider, $urlRouterProvider) {
            //$urlRouterProvider.otherwise('/error');
            $stateProvider.state("login", {
                url: '/login',
                controller: 'app.useraccount.LogInController',
                controllerAs: 'login',
                templateUrl: '/app/useraccount/login.html'
            });
        }
    })(app.useraccount || (app.useraccount = {}));
    var useraccount = app.useraccount;
})(app || (app = {}));
//# sourceMappingURL=config.route.js.map
