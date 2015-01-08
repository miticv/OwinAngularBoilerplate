/// <reference path="../_all.ts" />
'use strict';
var app;
(function (app) {
    angular.module('app.core', [
        'ngAnimate',
        'ui.router',
        'blocks.cache',
        'blocks.logger',
        'blocks.interceptor',
        'blocks.exception',
        'blocks.router'
    ]);
})(app || (app = {}));
//# sourceMappingURL=core.module.js.map
