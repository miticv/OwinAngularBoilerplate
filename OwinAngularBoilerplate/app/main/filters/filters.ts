/// <reference path="../_all.ts" />
'use strict';

module app.filters {

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
app.application.filter("tolowercase", [app.filters.ToLowerCaseFilter.Factory]);