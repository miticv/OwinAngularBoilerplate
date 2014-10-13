/// <reference path="_all.ts" />
'use strict';
var app;
(function (app) {
    // export var commonSvc: app.services.Common;
    var common = (function () {
        function common() {
        }
        //public static spinStart(key= "spinner") {
        //    app.commonSvc.broadcast("cc-spinner:spin", key);
        //}
        //public static spinStop(key= "spinner") {
        //    app.commonSvc.broadcast("cc-spinner:stop", key);
        //}
        //#region strings
        common.querifyObject = function (obj) {
            var str = [];
            for (var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        };

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

    //#region dictionary
    var Item = (function () {
        function Item(name, object) {
            this.name = name;
            this.object = object;
        }
        return Item;
    })();
    app.Item = Item;
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

    //#endregion
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

    var InstanceLoader = (function () {
        function InstanceLoader() {
        }
        InstanceLoader.getInstance = function (context, name) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 2); _i++) {
                args[_i] = arguments[_i + 2];
            }
            var instance = Object.create(context[name].prototype);
            instance.constructor.apply(instance, args);
            return instance;
        };

        InstanceLoader.create = function () {
            return {};
        };
        return InstanceLoader;
    })();
    app.InstanceLoader = InstanceLoader;

    var Describer = (function () {
        function Describer() {
        }
        Describer.getName = function (ent) {
            if (typeof ent == "string")
                return ent;

            if (ent.constructor && ent.constructor.name != "Function") {
                return ent.constructor.name || (ent.toString().match(/function (.+?)\(/) || [, ''])[1];
            } else {
                return ent.name;
            }
            //var funcNameRegex = /function (.{1,})\(/;
            //var results = (funcNameRegex).exec((<any> inputClass).constructor.toString());
            //return (results && results.length > 1) ? results[1] : "";
        };
        return Describer;
    })();
    app.Describer = Describer;
})(app || (app = {}));
//# sourceMappingURL=common.js.map
