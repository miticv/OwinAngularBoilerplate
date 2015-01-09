﻿/// <reference path="../_all.ts" />


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
                controller: 'app.useraccount.UserController',
                controllerAs: 'login',
                templateUrl: '/app/useraccount/login.html',
            }).
            state("register", {
                url: '/register',
                controller: 'app.useraccount.UserController',
                controllerAs: 'register',
                templateUrl: '/app/useraccount/register.html',
            }).
            state("registerSuccess", {
                url: '/registerSuccess',
                controller: 'app.useraccount.UserController',
                controllerAs: 'registerSuccess',
                templateUrl: '/app/useraccount/registerSuccess.html',
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