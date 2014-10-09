var app;
(function (app) {
    (function (NG_GLOBAL) {
        /* Local Variables */
        NG_GLOBAL.APP_NAME = "app";

        //export var APP_DIRECTIVES = "app.directives";
        //export var APP_SERVICES = "app.services";
        //export var APP_MODELS = "app.models";
        //export var APP_PROVIDERS = "app.providers";
        //export var APP_FILTERS = "app.filters";
        //export var APP_CONTROLLERS = "app.controllers";
        /* External Variables */
        NG_GLOBAL.UI_ROUTER = "ui.router";
        NG_GLOBAL.STATE_PROVIDER = "$stateProvider";
        NG_GLOBAL.ROUTE_PROVIDER = "$urlRouterProvider";

        NG_GLOBAL.$SCOPE = "$scope";
    })(app.NG_GLOBAL || (app.NG_GLOBAL = {}));
    var NG_GLOBAL = app.NG_GLOBAL;
})(app || (app = {}));
//# sourceMappingURL=global.js.map
