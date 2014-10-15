/// <reference path="../_all.ts" />
     
'use strict';

//#region Way 1
module app.widgets {

    export class MyDirective1 implements ng.IDirective {
         
        public restrict = 'E';
        public template = '<div></div>';
        public link($scope: ng.IScope, element: JQuery, attrs: ng.IAttributes) {
            element.text('this is the MyDirective1 directive')
        }        
    }
}
//angular.module('app.widgets').directive('myDirective1', function (): ng.IDirective { return new app.directives.MyDirective1() });
angular.module('app.widgets').directive('myDirective1', () => new app.widgets.MyDirective1());
//#endregion


//#region Way 2
angular.module('app.widgets').directive('myDirective2', function (): ng.IDirective {
    return {
        restrict: 'E',
        template: '<div></div>',
        link: function ($scope: ng.IScope, element: JQuery, attrs: ng.IAttributes) {
            element.text('this is the MyDirective2 directive')
        }
    };
});
//#endregion