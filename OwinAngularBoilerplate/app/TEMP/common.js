/// <reference path="_all.ts" />
'use strict';
var app;
(function (app) {
    var common = (function () {
        function common() {
        }
        //#region strings
        common.capitaliseFirstLetter = function (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        };

        common.lowercaseFirstLetter = function (str) {
            return str.charAt(0).toLowerCase() + str.slice(1);
        };

        common.textContains = function (text, searchText) {
            return text && -1 !== text.toLowerCase().indexOf(searchText.toLowerCase());
        };

        common.isNumber = function (val) {
            // negative or positive
            return /^[-]?\d+$/.test(val);
        };

        //#endregion
        //#region dates
        common.prototype.addDays = function (date, days) {
            var result = new Date(date);
            result.setDate(date.getDate() + days);
            return result;
        };
        return common;
    })();
    app.common = common;

    var Dictionary = (function () {
        function Dictionary() {
            this.items = [];
        }
        Dictionary.prototype.add = function (key, value) {
            if (value && typeof value != "undefined") {
                this.items.push(value);
                this.items[key] = value;
            } else {
                app.log.error("Failed to add item to app cache (null) - " + key);
            }
        };

        Dictionary.prototype.getByIndex = function (index) {
            return this.items[index];
        };

        Dictionary.prototype.getByKey = function (key) {
            return this.items[key];
        };
        return Dictionary;
    })();
    app.Dictionary = Dictionary;

    var log = (function () {
        function log() {
        }
        log.debug = function (message) {
            var optionalParams = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                optionalParams[_i] = arguments[_i + 1];
            }
            console.debug(message, optionalParams);
        };

        log.info = function (message) {
            var optionalParams = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                optionalParams[_i] = arguments[_i + 1];
            }
            console.info(message, optionalParams);
        };

        log.warn = function (message) {
            var optionalParams = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                optionalParams[_i] = arguments[_i + 1];
            }
            console.warn(message, optionalParams);
        };

        log.error = function (message) {
            var optionalParams = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                optionalParams[_i] = arguments[_i + 1];
            }
            console.error(message, optionalParams);
        };

        log.clear = function () {
            console.log(new Array(24 + 1).join("\n"));
        };
        return log;
    })();
    app.log = log;
})(app || (app = {}));
//# sourceMappingURL=common.js.map
