/// <reference path="../_all.ts" />

module app {


    export interface ILogger extends Toastr {
        log(value: string): void;
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


    export interface INotifyingCache {
        cache: any;
        put(key: string, value: any): void;
        remove(key:string): void;
        get(key:string): string;
    }

}