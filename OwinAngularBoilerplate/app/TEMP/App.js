/// <reference path="_all.ts" />
'use strict';
var app;
(function (app) {
    

    var modules = ['app.controllers', 'app.directives', 'app.filters', 'app.services', 'app.models'];
    modules.forEach(function (module) {
        return angular.module(module, []);
    });
    angular.module(app.NG_GLOBAL.APP_NAME, modules);

    /*** Create angular application */
    var application;
    application = angular.module(app.NG_GLOBAL.APP_NAME, [app.NG_GLOBAL.UI_ROUTER]);

    //#endregion
    //#region Url routing
    application.config([
        app.NG_GLOBAL.STATE_PROVIDER, app.NG_GLOBAL.ROUTE_PROVIDER,
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
                controller: "app.controllers.MyController",
                templateUrl: '/app/main/partials/login.html'
            });
        }
    ]);

    //#endregion
    //#region register components
    function registerController(className, services) {
        if (typeof services === "undefined") { services = []; }
        var controller = 'app.controllers.' + className;
        services.push(app.controllers[className]);
        application.controller(controller, services);
    }
    app.registerController = registerController;

    function registerFilter(className, services) {
        if (typeof services === "undefined") { services = []; }
        var filter = className.toLowerCase();
        services.push(function () {
            return (new app.filters[className]()).filter;
        });
        application.filter(filter, services);
    }
    app.registerFilter = registerFilter;

    function registerDirective(className, services) {
        if (typeof services === "undefined") { services = []; }
        var directive = app.common.lowercaseFirstLetter(className);
        services.push(function () {
            return new app.directives[className]();
        });
        application.directive(directive, services);
    }
    app.registerDirective = registerDirective;

    function registerService(className, services) {
        if (typeof services === "undefined") { services = []; }
        var service = className[0].toLowerCase() + className.slice(1);
        services.push(function () {
            return new app.services[className]();
        });
        application.factory(service, services);
    }
    app.registerService = registerService;

    function registerValue(className, obj) {
        application.value(className, obj);
    }
    app.registerValue = registerValue;
})(app || (app = {}));
//# sourceMappingURL=App.js.map
