/// <reference path="_all.ts" />
'use strict';

module app.controllers {


    
    export class MyController implements IController {

        public message: string;
        public test: string;

        constructor(private $scope, private myService) {
           this.message = myService.someMethod();
           this.test = "1234";
            
        }
    }

}

// Remember to pass all the services used by the constructor of the Controller.
app.registerController('MyController', ['$scope', 'myService']);