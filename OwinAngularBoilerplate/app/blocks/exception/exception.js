/// <reference path="../../_all.ts" />
'use strict';
var app;
(function (app) {
    angular.module('blocks.exception').factory('exception', exception);

    exception.$inject = ['logger'];
    function exception(logger) {
        var service = {
            catcher: catcher
        };
        return service;

        function catcher(message) {
            return function (reason) {
                logger.error(message, reason);
            };
        }
    }
})(app || (app = {}));
//# sourceMappingURL=exception.js.map
