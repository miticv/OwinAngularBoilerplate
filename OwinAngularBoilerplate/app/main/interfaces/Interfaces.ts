 /// <reference path="../../_all.ts" />

module Main.DemoApp.interfaces {
    
     export interface ILogInScope extends ng.IScope {
        Login: Main.DemoApp.models.Login;
        ErrorMessage: string;
        LogMeIn(): void;    
     }

 }