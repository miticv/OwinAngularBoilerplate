/// <reference path="../_all.ts" />

module app {

    angular.module('app.core').config(toastrConfig);   

    toastrConfig.$inject = ['toastr'];
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appTitle: 'Angular Typescript Template',
        version: '1.0.0'
    };

    angular.module('app.core').value('config', config);
         
    //angular.module('app.core').config(configure);

    //function configure($logProvider, $routeProvider, routehelperConfigProvider, exceptionHandlerProvider) {
    //    // turn debugging off/on (no info or warn)
    //    if ($logProvider.debugEnabled) {
    //        $logProvider.debugEnabled(true);
    //    }

    //    // Configure the common route provider
    //    routehelperConfigProvider.config.$routeProvider = $routeProvider;
    //    routehelperConfigProvider.config.docTitle = 'NG-Modular: ';
    //    var resolveAlways = { /* @ngInject */
    //        ready: function (dataservice) {
    //            return dataservice.ready();
    //        }
    //        // ready: ['dataservice', function (dataservice) {
    //        //    return dataservice.ready();
    //        // }]
    //    };
    //    routehelperConfigProvider.config.resolveAlways = resolveAlways;

    //    // Configure the common exception handler
    //    exceptionHandlerProvider.configure(config.appErrorPrefix);
    //}


}