/// <reference path="../../_all.ts" />

'use strict';
module app {

    angular
        .module('blocks.interceptor')
        .factory('interceptor', interceptor);

    interceptor.$inject = ['$q', '$injector', '$location'];
    function interceptor($q, $injector, $location) {


        var _request = function (config) {

            config.headers = config.headers || {};

            var authData = sessionStorage.getItem('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + JSON.parse(authData).access_token;
            }

            return config;
        }

        //var _responseError = function (rejection) {
        //    if (rejection.status === 401) {
        //        var authService = $injector.get('authService');
        //        var authData = sessionStorage.getItem('authorizationData');

        //        if (authData) {
        //            if (JSON.parse(authData).useRefreshTokens) {
        //                $location.path('/refresh');
        //                return $q.reject(rejection);
        //            }
        //        }
        //        authService.logOut();
        //        $location.path('/login');
        //    }
        //    return $q.reject(rejection);
        //}

        var authInterceptorServiceFactory = {
            request: _request
            //,
            //responseError: _responseError
        };


        return authInterceptorServiceFactory ;

    }

}