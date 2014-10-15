/// <reference path="../_all.ts" />

'use strict';
module app {

    angular.module('app.core', [
        /*
         *  Angular Modules
         */
        'ui.router',
        /*
         * Our reusable cross app code modules
         */
        'blocks.logger'
    ]);

}