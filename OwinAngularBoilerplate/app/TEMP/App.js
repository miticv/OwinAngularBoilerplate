/// <reference path="_all.ts" />
'use strict';
// Create and register modules
var modules = ['app.controllers', 'app.directives', 'app.filters', 'app.services'];
modules.forEach(function (module) {
    return angular.module(module, []);
});
angular.module('app', modules);

// Url routing
angular.module('app', ['ui.router']).config([
    '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/error');

        $stateProvider.state("test", {
            url: "/test",
            template: '<h1>{{title}}</h1>',
            controller: function ($scope) {
                $scope.title = 'My Contacts';
            }
        });
    }
]);

var app;
(function (app) {
    /**
    * Register new controller.
    *
    * @param className
    * @param services
    */
    function registerController(className, services) {
        if (typeof services === "undefined") { services = []; }
        var controller = 'app.controllers.' + className;
        services.push(app.controllers[className]);
        angular.module('app.controllers').controller(controller, services);
    }
    app.registerController = registerController;

    /**
    * Register new filter.
    *
    * @param className
    * @param services
    */
    function registerFilter(className, services) {
        if (typeof services === "undefined") { services = []; }
        var filter = className.toLowerCase();
        services.push(function () {
            return (new app.filters[className]()).filter;
        });
        angular.module('app.filters').filter(filter, services);
    }
    app.registerFilter = registerFilter;

    /**
    * Register new directive.
    *
    * @param className
    * @param services
    */
    function registerDirective(className, services) {
        if (typeof services === "undefined") { services = []; }
        var directive = className[0].toLowerCase() + className.slice(1);
        services.push(function () {
            return new app.directives[className]();
        });
        angular.module('app.directives').directive(directive, services);
    }
    app.registerDirective = registerDirective;

    /**
    * Register new service.
    *
    * @param className
    * @param services
    */
    function registerService(className, services) {
        if (typeof services === "undefined") { services = []; }
        var service = className[0].toLowerCase() + className.slice(1);
        services.push(function () {
            return new app.services[className]();
        });
        angular.module('app.services').factory(service, services);
    }
    app.registerService = registerService;
})(app || (app = {}));
//# sourceMappingURL=App.js.map
