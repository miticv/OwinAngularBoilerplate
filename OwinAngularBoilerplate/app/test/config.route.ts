/// <reference path="../_all.ts" />


module app.test {
    'use strict';

    angular.
        module('app.test').
        config(UserAccountConfig);

    UserAccountConfig.$inject = [
        '$stateProvider',
        '$urlRouterProvider'];

    function UserAccountConfig(
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider) {

        //$urlRouterProvider.otherwise('/error');

        $stateProvider.
        state("test", {
            url: "/test",
            templateUrl: '/app/test/test.html',
            controller: function ($scope) {
                $scope.title = 'Test';
            }
        });
    }

}