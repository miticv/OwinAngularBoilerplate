/// <reference path="../../_all.ts" />
'use strict';
var app;
(function (app) {
    angular.module('app').config(routeConfig).run(routehelper);

    routeConfig.$inject = ['$controllerProvider', '$stateProvider', '$urlRouterProvider'];
    function routeConfig($controllerProvider, $stateProvider, $urlRouterProvider) {
        //#region Angular 1.3.0 - register controllers with typescript fix
        /* https://github.com/angular/angular.js/issues/8296
        * http://www.lcube.se/angular-js-controller-error-argument-is-not-a-function/
        * with versions of angular 1.3.0 and later - we need to enable global so that we can register controllers with typescript:
        **/
        $controllerProvider.allowGlobals();

        //#endregion Angular 1.3.0 - register controllers with typescript fix
        //$urlRouterProvider.otherwise(stateNotFound);
        //stateNotFound.$inject = ['$injector', '$location']
        //function stateNotFound($injector, $location) {
        //   // $rootScope.$broadcast('$stateNotFound');
        //}
        //#region define home page - as escape page also
        $stateProvider.state("home", {
            url: "/",
            template: '<div>{{title}}</div>',
            controller: function ($scope) {
                $scope.title = 'home page';
            }
        });

        //#endregion define home page - as escape page also
        //#region allow case insensitive urls
        $urlRouterProvider.rule(routerRule);

        routerRule.$inject = ['$injector', '$location'];
        function routerRule($injector, $location) {
            //what this function returns will be set as the $location.url
            var path = $location.path(), normalized = path.toLowerCase();
            if (path != normalized) {
                //instead of returning a new url string, I'll just change the $location.path directly
                //so I don't have to worry about constructing a new url string and so a new state change is not triggered
                $location.replace().path(normalized);
            }
            // because we've returned nothing, no state change occurs
        }
        //#endregion allow case insensitive urls
    }

    routehelper.$inject = ['$location', '$rootScope', '$stateParams', '$state', 'logger', '$injector'];
    function routehelper($location, $rootScope, $stateParams, $state, logger, $injector) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        //var handlingRouteChangeError = false;
        $rootScope.$on('$locationChangeSuccess', function (evt) {
            //evt.targetScope.$state.current.name
            //evt.currentScope.$state.current.name
            //#region Handle page not found!
            /* path = get current page from the url  */
            var path = window.location.href.substring(window.location.href.indexOf(window.location.host) + window.location.host.length).replace('/#', '');
            var normalized = path.toLowerCase();

            //var path = $location.path(), normalized = path.toLowerCase(); /* this always returns normalized url so can not use */
            if (path != normalized) {
                return;
            }

            var stateExist = false;
            $state.get().forEach(function (x) {
                if (x.url == path)
                    stateExist = true;
            });

            if (!stateExist) {
                logger.warning('"' + path.replace('/', '') + '" page is not found!');
                $location.replace().path($rootScope.currentUrl || '/'); /* rewrite path to last known url */
            }
            //#endregion
        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            //any errors in resolve functions: javascript errors, non-existent services, etc...
            if (error.status === 401) {
                if (error.data.Message) {
                    logger.error(error.data.Message);
                } else {
                    logger.error('No Access');
                }
                $location.path('/login');
                return;
            }

            //if (handlingRouteChangeError) {
            //    return;
            //}
            //handlingRouteChangeError = true;
            var destination = (toState && (toState.title || toState.name || toState.loadedTemplateUrl)) || 'unknown target';
            var msg = 'Error routing to ' + destination + '. ' + (error.msg || '');
            logger.warning(msg, [toState]);
            //$location.path('/');
            //$rootScope.pageLoading = false;
        });

        $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
            //catch if trying to call something like: $state.go("nonexistent.state")
            logger.warning('Cannot find state: ' + unfoundState.to);
            //unfoundState.toParams, unfoundState.options
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            //logger.success('$stateChangeSuccess');
            $rootScope.currentUrl = $location.path();
            $rootScope.activePage = $location.path().split('/')[2];
        });
        //$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        //    logger.success('$stateChangeStart');
        //});
        //$rootScope.$on('$viewContentLoading', function (event, viewConfig) {
        //    logger.success('$viewContentLoading');
        //});
        //$rootScope.$on('viewContentLoaded', function (event) {
        //    logger.success('viewContentLoaded');
        //});
    }
})(app || (app = {}));
//# sourceMappingURL=router.js.map
