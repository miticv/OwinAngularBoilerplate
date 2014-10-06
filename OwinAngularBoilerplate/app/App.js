/// <reference path="_all.ts" />
//http://onoffswitch.net/angular-typescript-architecture/
//https://github.com/dotnetcurry/angularjs-with-typescript-dncmag-12/blob/master/OneStopTechVids/App/techVidsApp.ts
var Main;
(function (Main) {
    var NG_GLOBAL = (function () {
        function NG_GLOBAL() {
        }
        NG_GLOBAL.APP_NAME = "DemoApp";
        NG_GLOBAL.APP_DIRECTIVES = "DemoApp.directives";
        NG_GLOBAL.APP_SERVICES = "DemoApp.services";
        NG_GLOBAL.APP_MODELS = "DemoApp.models";

        NG_GLOBAL.APP_FILTERS = "DemoApp.filters";
        NG_GLOBAL.APP_CONTROLLERS = "DemoApp.controllers";

        NG_GLOBAL.UI_ROUTER = "ui.router";
        NG_GLOBAL.STATE_PROVIDER = "$stateProvider";
        NG_GLOBAL.ROUTE_PROVIDER = "$urlRouterProvider";

        NG_GLOBAL.$SCOPE = "$scope";
        return NG_GLOBAL;
    })();
    Main.NG_GLOBAL = NG_GLOBAL;

    var Config = (function () {
        function Config($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/error');

            $stateProvider.state("test", {
                template: '<h1>{{title}}</h1>',
                controller: function ($scope) {
                    $scope.title = 'My Contacts';
                }
            });
        }
        return Config;
    })();
    Main.Config = Config;

    var App = (function () {
        function App() {
            this.app = angular.module(NG_GLOBAL.APP_NAME, [
                NG_GLOBAL.UI_ROUTER
            ]);
            //public directives: ng.IModule = angular.module(NG_GLOBAL.APP_DIRECTIVES, []);
            this.services = angular.module(NG_GLOBAL.APP_SERVICES, [NG_GLOBAL.APP_MODELS]);
            this.models = angular.module(NG_GLOBAL.APP_MODELS, []);
            //public providers: ng.IModule = angular.module(NG_GLOBAL.APP_PROVIDERS, []);
            //public filters: ng.IModule = angular.module(NG_GLOBAL.APP_FILTERS, []);
            this.controllers = angular.module(NG_GLOBAL.APP_CONTROLLERS, [NG_GLOBAL.APP_SERVICES]);
            Config.$inject = [NG_GLOBAL.STATE_PROVIDER, NG_GLOBAL.ROUTE_PROVIDER];
            this.app.config(Config);
        }
        return App;
    })();
    Main.App = App;
})(Main || (Main = {}));
/*
// to bootstrap angular application:
$(document).ready(function(){
var main = new Main.App();
angular.bootstrap(document, [NG_GLOBAL.APP_NAME]);
});
*/
//# sourceMappingURL=App.js.map
