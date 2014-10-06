/// <reference path="_all.ts" />
'use strict';
var app;
(function (app) {
    (function (services) {
        var MyService = (function () {
            function MyService() {
                this.meaningOfLife = 42;
            }
            MyService.prototype.someMethod = function () {
                return 'Meaning of life is ' + this.meaningOfLife;
            };
            return MyService;
        })();
        services.MyService = MyService;
    })(app.services || (app.services = {}));
    var services = app.services;
})(app || (app = {}));

app.registerService('MyService', []);
//# sourceMappingURL=services.js.map
