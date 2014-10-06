/// <reference path="_all.ts" />
'use strict';

module Main.app.controllers {

    export class MyController implements IController {
        constructor(private $scope, private myService) {
            $scope.message = myService.someMethod();

        }
    }

}

// Remember to pass all the services used by the constructor of the Controller.
Main.app.registerController('MyController', ['$scope', 'myService']);