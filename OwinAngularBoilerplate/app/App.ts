/// <reference path="_all.ts" />


//http://onoffswitch.net/angular-typescript-architecture/
//https://github.com/dotnetcurry/angularjs-with-typescript-dncmag-12/blob/master/OneStopTechVids/App/techVidsApp.ts
module Main {

    export class NG_GLOBAL {

        /* Local Variables */
        public static APP_NAME = "DemoApp";
        public static APP_DIRECTIVES = "DemoApp.directives";
        public static APP_SERVICES = "DemoApp.services";
        public static APP_MODELS = "DemoApp.models";
        //public static APP_PROVIDERS = "DemoApp.providers";
        public static APP_FILTERS = "DemoApp.filters";
        public static APP_CONTROLLERS = "DemoApp.controllers";

        /* External Variables */
        public static UI_ROUTER = "ui.router";
        public static STATE_PROVIDER = "$stateProvider";
        public static ROUTE_PROVIDER = "$urlRouterProvider";

        public static $SCOPE = "$scope";


    }

    export class Config {
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
                    template: '<h1>{{title}}</h1>',
                    controller: function($scope){
                        $scope.title = 'My Contacts';
                      }
                });
        }
    }


    export class App { //implements IApp

        public app: ng.IModule = angular.module(NG_GLOBAL.APP_NAME,
            [
                NG_GLOBAL.UI_ROUTER//,
                //'ngResource'
                //NG_GLOBAL.APP_DIRECTIVES,
               // NG_GLOBAL.APP_SERVICES,
                //NG_GLOBAL.APP_MODELS,
                //NG_GLOBAL.APP_PROVIDERS,
                //NG_GLOBAL.APP_FILTERS,
               // NG_GLOBAL.APP_CONTROLLERS
            ]);

        //public directives: ng.IModule = angular.module(NG_GLOBAL.APP_DIRECTIVES, []);

        public services: ng.IModule = angular.module(NG_GLOBAL.APP_SERVICES, [NG_GLOBAL.APP_MODELS]);

        public models: ng.IModule = angular.module(NG_GLOBAL.APP_MODELS, []);

        //public providers: ng.IModule = angular.module(NG_GLOBAL.APP_PROVIDERS, []);

        //public filters: ng.IModule = angular.module(NG_GLOBAL.APP_FILTERS, []);
        
        public controllers: ng.IModule = angular.module(NG_GLOBAL.APP_CONTROLLERS, [NG_GLOBAL.APP_SERVICES]);

        constructor() {
            Config.$inject = [NG_GLOBAL.STATE_PROVIDER, NG_GLOBAL.ROUTE_PROVIDER];
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


