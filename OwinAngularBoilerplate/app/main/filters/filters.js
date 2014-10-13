/// <reference path="../_all.ts" />
'use strict';
var app;
(function (app) {
    (function (filters) {
        var RangeTo = (function () {
            function RangeTo() {
            }
            RangeTo.prototype.filter = function (start, end) {
                var out = [];
                for (var i = start; i < end; ++i)
                    out.push(i);
                return out;
            };
            return RangeTo;
        })();
        filters.RangeTo = RangeTo;

        var Splice = (function () {
            function Splice() {
            }
            Splice.prototype.filter = function (input, start, howMany) {
                return input.splice(start, howMany);
            };
            return Splice;
        })();
        filters.Splice = Splice;
    })(app.filters || (app.filters = {}));
    var filters = app.filters;
})(app || (app = {}));
app.application.filter('RangeTo', app.filters.RangeTo);
app.application.filter('Splice', app.filters.Splice);
//# sourceMappingURL=filters.js.map
