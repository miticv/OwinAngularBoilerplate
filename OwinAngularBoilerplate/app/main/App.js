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

            $stateProvider.state("home", {
                url: "/",
                template: '<div>{{title}}</div>',
                controller: function ($scope) {
                    $scope.title = 'home page';
                }
            }).state("test", {
                url: "/test",
                templateUrl: '/app/main/partials/test.html',
                controller: function ($scope) {
                    $scope.title = 'Test';
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
