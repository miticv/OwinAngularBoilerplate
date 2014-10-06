/// <reference path="_all.ts" />
     
'use strict';

module Main.app.directives {

    export class MyDirective implements IDirective {
        template = '<div></div>';
        restrict = 'E';
        link($scope, element: JQuery, attrs: ng.IAttributes) {
            element.text('this is the MyDirective directive');
        }

    }

}

Main.app.registerDirective('MyDirective', []);