/// <reference path="../../_all.ts" />

'use strict';
module app {

    angular
        .module('blocks.exception')
        .factory('exception', exception);

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

}