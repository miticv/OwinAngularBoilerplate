/// <reference path="../_all.ts" />

'use strict';
module app {

    angular.module('app.core', [
        /*
         *  Angular Modules
         */
        //'ngResource', 'ngRoute', 'ngSanitize',
        'ngAnimate',
        //'ngplus',
        'ui.router', 
        /*
         * Our reusable cross app code modules
         */
        'blocks.logger',
        'blocks.interceptor',
        'blocks.exception',
        'blocks.router'
    ]);

}