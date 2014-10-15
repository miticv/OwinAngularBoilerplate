/// <reference path="../_all.ts" />

module app.useraccount {


    export interface ILogInController {
        LogMeIn: () => void;

    }

    export interface ILogInScope extends ng.IScope {
        LogMeIn: Function;
    }
}