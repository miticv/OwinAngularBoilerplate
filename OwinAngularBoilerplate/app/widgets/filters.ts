/// <reference path="../_all.ts" />
'use strict';

module app.widgets {

    export class ToLowerCaseFilter {

        static $inject = ['$filter'];
        public static Factory()  {
            return function (input:string): string {                

                var result = "";
                if(input) result = input.toLowerCase();
                return result;
            }
        }
    }

}
angular.module('app.widgets').filter("tolowercase", [app.widgets.ToLowerCaseFilter.Factory]);