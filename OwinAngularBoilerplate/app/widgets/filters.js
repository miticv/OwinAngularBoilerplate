/// <reference path="../_all.ts" />
'use strict';
var app;
(function (app) {
    (function (widgets) {
        var ToLowerCaseFilter = (function () {
            function ToLowerCaseFilter() {
            }
            ToLowerCaseFilter.Factory = function () {
                return function (input) {
                    var result = "";
                    if (input)
                        result = input.toLowerCase();
                    return result;
                };
            };
            ToLowerCaseFilter.$inject = ['$filter'];
            return ToLowerCaseFilter;
        })();
        widgets.ToLowerCaseFilter = ToLowerCaseFilter;
    })(app.widgets || (app.widgets = {}));
    var widgets = app.widgets;
})(app || (app = {}));
angular.module('app.widgets').filter("tolowercase", [app.widgets.ToLowerCaseFilter.Factory]);
//# sourceMappingURL=filters.js.map
