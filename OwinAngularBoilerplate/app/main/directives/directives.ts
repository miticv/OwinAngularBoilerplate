/// <reference path="../_all.ts" />
     
'use strict';

//#region Way 1
module app.directives {

    export class MyDirective1 implements ng.IDirective {
         
        public restrict = 'E';
        public template = '<div></div>';
        public link($scope: ng.IScope, element: JQuery, attrs: ng.IAttributes) {
            element.text('this is the MyDirective1 directive')
        }        
    }
}
//app.application.directive('myDirective1', function (): ng.IDirective { return new app.directives.MyDirective1() });
app.application.directive('myDirective1', () => new app.directives.MyDirective1());
//#endregion


//#region Way 2
app.application.directive('myDirective2', function (): ng.IDirective {
    return {
        restrict: 'E',
        template: '<div></div>',
        link: function ($scope: ng.IScope, element: JQuery, attrs: ng.IAttributes) {
            element.text('this is the MyDirective2 directive')
        }
    };
});
//#endregion