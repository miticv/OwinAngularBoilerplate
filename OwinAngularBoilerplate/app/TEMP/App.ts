/// <reference path="_all.ts" />

'use strict';

// Create and register modules
var modules = ['app.controllers', 'app.directives', 'app.filters', 'app.services'];
modules.forEach((module) => angular.module(module, []));
angular.module('app', modules);

// Url routing
angular.module('app', ['ui.router']).config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {

        $urlRouterProvider.otherwise('/error');

        $stateProvider.
            state("test", {
                url: "/test",
                template: '<h1>{{title}}</h1>',
                controller: function ($scope) {
                    $scope.title = 'My Contacts';
                }
            });
    }
]);

      module app {
          export module controllers {}
          export module directives {}
          export module filters {}
          export module services {}

          export interface IController {}
          export interface IDirective {
          restrict: string;
            link($scope: ng.IScope, element: JQuery, attrs: ng.IAttributes): any;
          }
          export interface IFilter {
            filter (input: any, ...args: any[]): any;
          }
          export interface IService {}

        /**
         * Register new controller.
         *
         * @param className
         * @param services
         */
          export function registerController (className: string, services = []) {
            var controller = 'app.controllers.' + className;
            services.push(app.controllers[className]);
            angular.module('app.controllers').controller(controller, services);
          }

            /**
             * Register new filter.
             *
             * @param className
             * @param services
             */
          export function registerFilter (className: string, services = []) {
            var filter = className.toLowerCase();
            services.push(() => (new app.filters[className]()).filter);
            angular.module('app.filters').filter(filter, services);
          }

            /**
             * Register new directive.
             *
             * @param className
             * @param services
             */
          export function registerDirective (className: string, services = []) {
            var directive = className[0].toLowerCase() + className.slice(1);
            services.push(() => new app.directives[className]());
            angular.module('app.directives').directive(directive, services);
          }

            /**
             * Register new service.
             *
             * @param className
             * @param services
             */
          export function registerService (className: string, services = []) {
            var service = className[0].toLowerCase() + className.slice(1);
            services.push(() => new app.services[className]());
            angular.module('app.services').factory(service, services);
          }
          }