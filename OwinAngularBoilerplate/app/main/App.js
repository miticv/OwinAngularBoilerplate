/// <reference path="_all.ts" />
'use strict';
var app;
(function (app) {
    

    var modules = ['controllers', 'directives', 'filters', 'services', 'models'];
    modules.forEach(function (module) {
        return angular.module(module, []);
    });
    angular.module(app.global.APP_NAME, modules);

    /*** Create angular application */
    app.application;
    app.application = angular.module(app.global.APP_NAME, [app.global.UI_ROUTER]);

    //#endregion
    //#region Url routing
    app.application.config([
        app.global.STATE_PROVIDER, app.global.ROUTE_PROVIDER,
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/error');

            $stateProvider.state("test", {
                url: "/test",
                template: '<h1>{{title}}</h1>',
                controller: function ($scope) {
                    $scope.title = 'My Contacts';
                }
            }).state("login", {
                url: "/login",
                controller: "app.controllers.LogInController",
                templateUrl: '/app/main/partials/login.html'
            });
        }
    ]);
})(app || (app = {}));
//# sourceMappingURL=App.js.map
