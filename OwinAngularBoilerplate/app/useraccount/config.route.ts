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
            }).
            state("register", {
                url: '/register',
                controller: 'app.useraccount.RegisterController',
                controllerAs: 'register',
                templateUrl: '/app/useraccount/register.html',
            }).
            state("userhome", {
                url: '/userhome',
                controller: 'app.useraccount.UserController',
                controllerAs: 'user',
                templateUrl: '/app/useraccount/userhome.html',
                resolve: {
                    'auth': ['accountService', function (accountService) {
                        return accountService.$userInfo();
                    }]
                }
            });
    }

}