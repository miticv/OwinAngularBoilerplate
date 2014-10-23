/// <reference path="../_all.ts" />


module app.useraccount {
    'use strict';

    angular.
        module('app.useraccount').
        config(UserAccountConfig);

    UserAccountConfig.$inject = ['$stateProvider'];

    function UserAccountConfig($stateProvider: ng.ui.IStateProvider) {

        $stateProvider.
            state("login", {
                url: '/login',
                controller: 'app.useraccount.LogInController',
                controllerAs: 'login',
                templateUrl: '/app/useraccount/login.html',
            });
    }

}