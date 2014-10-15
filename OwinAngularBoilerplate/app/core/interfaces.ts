/// <reference path="../_all.ts" />

module app {


    export interface ILogger extends Toastr {
        log(string): void;
    }

    export interface IController {
    }

    export interface IDirective {
        restrict: string;
        link($scope: ng.IScope, element: JQuery, attrs: ng.IAttributes): any;
    }

    export interface IFilter {
        filter(input: any, ...args: any[]): any;
    }

    export interface IService {
    }


}