/// <reference path="../../_all.ts" />
'use strict';
var app;
(function (app) {
    angular.module('app').config(routeConfig).run(routehelper);

    routeConfig.$inject = ['$urlRouterProvider', '$controllerProvider'];
    function routeConfig($urlRouterProvider, $controllerProvider) {
        /*
        * http://www.lcube.se/angular-js-controller-error-argument-is-not-a-function/
        * with versions of angular 1.3.0 and later - we need to enable global so that we can register controllers with typescript:
        **/
        $controllerProvider.allowGlobals();

        $urlRouterProvider.otherwise('/error');
    }

    routehelper.$inject = ['$location', '$rootScope', '$stateParams', '$state', 'logger'];
    function routehelper($location, $rootScope, $stateParams, $state, logger) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        //var handlingRouteChangeError = false;
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            logger.warning('$stateChangeError');
            //if (handlingRouteChangeError) {
            //    return;
            //}
            //handlingRouteChangeError = true;
            //var destination = (toState && (toState.title || toState.name || toState.loadedTemplateUrl)) ||
            //    'unknown target';
            //var msg = 'Error routing to ' + destination + '. ' + (error.msg || '');
            //logger.warning(msg, [toState]);
            //$location.path('/');
            //$rootScope.pageLoading = false;
        });

        $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
            logger.warning('$stateNotFound');
            //var msg = 'Error routing to ' + unfoundState;
            //logger.warning(msg, [unfoundState]);
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            logger.success('$stateChangeSuccess');
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
