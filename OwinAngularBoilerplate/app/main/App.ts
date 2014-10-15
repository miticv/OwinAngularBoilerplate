﻿/// <reference path="_all.ts" />

'use strict';
module app {

    //#region Create angular modules structure
    export module controllers { }
    export module directives { }
    export module filters { }
    export module services { }
    export module models { }

    var modules = ['controllers', 'directives', 'filters', 'services', 'models'];
    modules.forEach((module) => angular.module(module, []));
    angular.module(global.APP_NAME, modules);

    /*** Create angular application */
    export var application: ng.IModule;
    application = angular.module(global.APP_NAME, [global.UI_ROUTER]);
    //#endregion

    //#region Url routing
    application.config([global.STATE_PROVIDER, global.ROUTE_PROVIDER,
        function ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {

            $urlRouterProvider.otherwise('/error');

            $stateProvider.
                state("home", {
                    url: "/",
                    template: '<div>{{title}}</div>',
                    controller: function ($scope) {
                        $scope.title = 'home page';
                    }
                }).
                state("test", {
                    url: "/test",
                    templateUrl: '/app/main/partials/test.html',
                    controller: function ($scope) {
                        $scope.title = 'Test';
                    }
                }).
                state("login", {
                    url: '/login',
                    controller: 'app.controllers.LogInController',
                    controllerAs: 'login',
                    templateUrl: '/app/main/UserAccount/login.html',

                });
        }
    ]);
    //#endregion

}
