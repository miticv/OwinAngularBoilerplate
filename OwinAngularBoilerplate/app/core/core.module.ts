/// <reference path="../_all.ts" />

'use strict';
module app {

    angular.module('app.core', [
        /*
         *  Angular Modules
         */
        //'ngResource', 'ngAnimate', 'ngRoute', 'ngSanitize',
        'ui.router', 
        /*
         * Our reusable cross app code modules
         */
        'blocks.logger',
        'blocks.exception',
        'blocks.router'
    ]);

}