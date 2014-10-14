/// <reference path="../_all.ts" />
'use strict';
var app;
(function (app) {
    (function (filters) {
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
        filters.ToLowerCaseFilter = ToLowerCaseFilter;
    })(app.filters || (app.filters = {}));
    var filters = app.filters;
})(app || (app = {}));
app.application.filter("tolowercase", [app.filters.ToLowerCaseFilter.Factory]);
//# sourceMappingURL=filters.js.map
