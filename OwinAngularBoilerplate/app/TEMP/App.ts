/// <reference path="_all.ts" />

'use strict';
module app {

    //#region Create angular modules structure
    export module controllers { }
    export module directives { }
    export module filters { }
    export module services { }
    export module models { }
        
    var modules = ['app.controllers', 'app.directives', 'app.filters', 'app.services', 'app.models'];
    modules.forEach((module) => angular.module(module, []));
    angular.module(NG_GLOBAL.APP_NAME, modules);

    /*** Create angular application */
    var application: ng.IModule;
    application = angular.module(NG_GLOBAL.APP_NAME, [NG_GLOBAL.UI_ROUTER]);
    //#endregion

    //#region Url routing
    application.config([NG_GLOBAL.STATE_PROVIDER, NG_GLOBAL.ROUTE_PROVIDER,
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
                    controller: "app.controllers.MyController",
                    templateUrl: '/app/main/partials/login.html',
                   
                });
        }
    ]);
    //#endregion

    //#region register components
    export function registerController(className: string, services = []) {
        var controller = 'app.controllers.' + className;
        services.push(app.controllers[className]);
        application.controller(controller, services);
    }

    export function registerFilter(className: string, services = []) {
        var filter = className.toLowerCase();
        services.push(() => (new app.filters[className]()).filter);
        application.filter(filter, services);
    }

    export function registerDirective(className: string, services = []) {
        var directive = common.lowercaseFirstLetter(className);
        services.push(() => new app.directives[className]());
        application.directive(directive, services);
    }

    export function registerService(className: string, services = []) {
        var service = className[0].toLowerCase() + className.slice(1);
        services.push(() => new app.services[className]());
        application.factory(service, services);
    }

    export function registerValue(className: string, obj: any) {        
        application.value(className, obj);
    }
    //#endregion

    }
