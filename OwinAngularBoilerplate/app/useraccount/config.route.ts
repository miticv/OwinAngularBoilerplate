/// <reference path="../_all.ts" />


module app.useraccount {
    'use strict';

    angular.
        module('app.useraccount').
        config(UserAccountConfig);

    UserAccountConfig.$inject = [
        '$stateProvider',
        '$urlRouterProvider'];

    function UserAccountConfig(
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider) {

        //$urlRouterProvider.otherwise('/error');

        $stateProvider.
        //    url: "/",
        //    template: '<div>{{title}}</div>',
        //    controller: function ($scope) {
        //        $scope.title = 'home page';
        //    }
        //}).
        //state("test", {
        //    url: "/test",
        //    templateUrl: '/app/main/partials/test.html',
        //    controller: function ($scope) {
        //        $scope.title = 'Test';
        //    }
        //}).
            state("login", {
                url: '/login',
                controller: 'app.useraccount.LogInController',
                controllerAs: 'login',
                templateUrl: '/app/useraccount/login.html',
            });
    }

}