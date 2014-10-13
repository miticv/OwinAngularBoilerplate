/// <reference path="_all.ts" />

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
                state("test", {
                    url: "/test",
                    template: '<h1>{{title}}</h1>',
                    controller: function ($scope) {
                        $scope.title = 'My Contacts';
                    }
                }).
                state("login", {
                    url: "/login",
                    controller: "app.controllers.LogInController",
                    templateUrl: '/app/main/partials/login.html',

                });
        }
    ]);
    //#endregion

}
