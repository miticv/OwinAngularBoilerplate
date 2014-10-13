/// <reference path="../_all.ts" />

module app {

    export interface IController {
        

    }

    export interface ILogInController {
        LogMeIn: () => void;

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

    export interface ILogInScope extends ng.IScope {
        LogMeIn: Function;
    }
}