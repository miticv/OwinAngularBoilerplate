/// <reference path="_all.ts" />
//http://onoffswitch.net/angular-typescript-architecture/
//https://github.com/dotnetcurry/angularjs-with-typescript-dncmag-12/blob/master/OneStopTechVids/App/techVidsApp.ts
var app;
(function (app) {
    var Config = (function () {
        function Config($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/error');

            $stateProvider.state("test", {
                url: "/test",
                template: '<h1>{{title}}</h1>',
                controller: function ($scope) {
                    $scope.title = 'My Contacts';
                }
            }).state("login", {
                url: "/login",
                controller: "app.controllers.LogInController",
                templateUrl: '/app/main/partials/login.html'
            });
        }
        Config.$inject = ['$stateProvider', '$urlRouterProvider'];
        return Config;
    })();
    app.Config = Config;

    var App = (function () {
        function App() {
            this.app = angular.module(app.global.APP_NAME, [
                app.global.UI_ROUTER
            ]);
            this.directives = angular.module(app.global.APP_DIRECTIVES, []);
            this.services = angular.module(app.global.APP_SERVICES, []);
            this.models = angular.module(app.global.APP_MODELS, []);
            //public providers: ng.IModule = angular.module(NG_GLOBAL.APP_PROVIDERS, []);
            this.filters = angular.module(app.global.APP_FILTERS, []);
            this.controllers = angular.module(app.global.APP_CONTROLLERS, []);
            Config.$inject = [app.global.STATE_PROVIDER, app.global.ROUTE_PROVIDER];
            this.app.config(Config);
        }
        return App;
    })();
    app.App = App;
})(app || (app = {}));
/*
// to bootstrap angular application:
$(document).ready(function(){
var main = new Main.App();
angular.bootstrap(document, [NG_GLOBAL.APP_NAME]);
});
*/
//# sourceMappingURL=AppClass.js.map
