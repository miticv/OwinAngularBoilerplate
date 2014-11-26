/// <reference path="../_all.ts" />
'use strict';
var app;
(function (app) {
    angular.module('app.core', [
        'ui.router',
        'blocks.logger',
        'blocks.interceptor',
        'blocks.exception',
        'blocks.router'
    ]);
})(app || (app = {}));
//# sourceMappingURL=core.module.js.map
