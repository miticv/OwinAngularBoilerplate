/// <reference path="_all.ts" />
'use strict';
var Main;
(function (Main) {
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
    })(Main.app || (Main.app = {}));
    var app = Main.app;
})(Main || (Main = {}));

Main.app.registerFilter('RangeTo', []);
Main.app.registerFilter('Splice', []);
//# sourceMappingURL=filters.js.map
