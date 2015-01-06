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
            if (authData && config.url != 'token') {  //do not use when loging in
                config.headers.Authorization = 'Bearer ' + JSON.parse(authData).access_token;
            }

            return config;
        }

        //var _responseError = function (rejection) {
        //    if (rejection.status === 401) {
        //        var accountService = $injector.get('accountService');
        //        var authData = sessionStorage.getItem('authorizationData');

        //        if (authData) {
        //            var parsedAuthData = JSON.parse(authData);
        //            if (parsedAuthData.useRefreshTokens) {
        //                /* remember the url that caused 401 and retry only once more */
        //                var authorizationRefreshTorUrl = sessionStorage.getItem('authorizationRefreshTorUrl');
        //                if (authorizationRefreshTorUrl !== rejection.url) {                                                    
        //                    /* refresh access_token using refresh token */
        //                    var model = new app.useraccount.models.Refresh();
        //                    model.username = parsedAuthData.userName;
        //                    model.refresh_token = parsedAuthData.refresh_token;
        //                    accountService.$refresh(model).then(function (data) {
        //                        $location.path(rejection.config.url);
        //                        sessionStorage.removeItem('authorizationRefreshTorUrl');
        //                    }, function (err) {
        //                        sessionStorage.setItem('authorizationRefreshTorUrl', rejection.url);
        //                    });
                           
        //                    return $q.reject(rejection);
        //                }
                        
        //                $location.path('/401');                       
        //            }
        //        }
        //        //authService.logOut();
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