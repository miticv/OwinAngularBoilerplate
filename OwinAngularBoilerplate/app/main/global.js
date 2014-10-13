/// <reference path="_all.ts" />
var app;
(function (app) {
    var global = (function () {
        function global() {
        }
        global.APP_NAME = "app";

        global.APP_DIRECTIVES = "directives";
        global.APP_SERVICES = "services";
        global.APP_MODELS = "models";
        global.APP_PROVIDERS = "providers";
        global.APP_FILTERS = "filters";
        global.APP_CONTROLLERS = "controllers";

        global.UI_ROUTER = "ui.router";
        global.STATE_PROVIDER = "$stateProvider";
        global.ROUTE_PROVIDER = "$urlRouterProvider";

        global.$SCOPE = "$scope";
        return global;
    })();
    app.global = global;
})(app || (app = {}));
//# sourceMappingURL=global.js.map
