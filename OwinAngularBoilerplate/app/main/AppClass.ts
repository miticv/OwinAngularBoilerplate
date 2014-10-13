/// <reference path="_all.ts" />


//http://onoffswitch.net/angular-typescript-architecture/
//https://github.com/dotnetcurry/angularjs-with-typescript-dncmag-12/blob/master/OneStopTechVids/App/techVidsApp.ts
module app {

    export class Config {
        static $inject = ['$stateProvider', '$urlRouterProvider'];
        constructor(
             $stateProvider: ng.ui.IStateProvider
            ,$urlRouterProvider: ng.ui.IUrlRouterProvider
            //,$httpProvider: ng.IHttpProvider
            //,$logProvider: ng.ILogProvider
            //,$compileProvider: ng.ICompileProvider
            ) {

            $urlRouterProvider.otherwise('/error');

            $stateProvider.
                state("test", {
                    url: "/test",
                    template: '<h1>{{title}}</h1>',
                    controller: function ($scope) {
                        $scope.title = 'My Contacts';
                    }
                }).
                state("login", {
                    url: "/login",
                    controller: "app.controllers.LogInController",
                    templateUrl: '/app/main/partials/login.html',

                });
        }
    }


    export class App { //implements IApp

        public app: ng.IModule = angular.module(global.APP_NAME,
            [
                global.UI_ROUTER//,
                //'ngResource'
                //NG_GLOBAL.APP_DIRECTIVES,
               // NG_GLOBAL.APP_SERVICES,
                //NG_GLOBAL.APP_MODELS,
                //NG_GLOBAL.APP_PROVIDERS,
                //NG_GLOBAL.APP_FILTERS,
               // NG_GLOBAL.APP_CONTROLLERS
            ]);

        public directives: ng.IModule = angular.module(global.APP_DIRECTIVES, []);

        public services: ng.IModule = angular.module(global.APP_SERVICES, []); //NG_GLOBAL.APP_MODELS

        public models: ng.IModule = angular.module(global.APP_MODELS, []);

        //public providers: ng.IModule = angular.module(NG_GLOBAL.APP_PROVIDERS, []);

        public filters: ng.IModule = angular.module(global.APP_FILTERS, []);
        
        public controllers: ng.IModule = angular.module(global.APP_CONTROLLERS, []); //global.APP_SERVICES

        constructor() {
            Config.$inject = [global.STATE_PROVIDER, global.ROUTE_PROVIDER];
            this.app.config(Config);
                 
        }
    }
}


/*
// to bootstrap angular application:

$(document).ready(function(){
     var main = new Main.App();
     angular.bootstrap(document, [NG_GLOBAL.APP_NAME]);
 });

*/


