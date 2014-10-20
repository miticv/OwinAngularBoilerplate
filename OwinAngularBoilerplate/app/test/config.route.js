/// <reference path="../_all.ts" />
var app;
(function (app) {
    (function (test) {
        'use strict';

        angular.module('app.test').config(UserAccountConfig);

        UserAccountConfig.$inject = [
            '$stateProvider',
            '$urlRouterProvider'];

        function UserAccountConfig($stateProvider, $urlRouterProvider) {
            //$urlRouterProvider.otherwise('/error');
            $stateProvider.state("test", {
                url: "/test",
                templateUrl: '/app/test/test.html',
                controller: function ($scope) {
                    $scope.title = 'Test';
                }
            });
        }
    })(app.test || (app.test = {}));
    var test = app.test;
})(app || (app = {}));
//# sourceMappingURL=config.route.js.map
