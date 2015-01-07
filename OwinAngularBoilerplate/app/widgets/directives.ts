/// <reference path="../_all.ts" />

'use strict';

//#region ng-match
module app.widgets {

    /** ng-match used for validating confirm password field **/
    ngMatch.$inject = ['$parse'];
    export function ngMatch($parse): ng.IDirective {
        var directive: ng.IDirective = <ng.IDirective>{};

        directive.restrict = 'A';
        directive.require = '?ngModel';
        //directive.scope = {};
        directive.link = function link(scope: ng.IScope, elem: JQuery, attrs: ng.IAttributes, ctrl) {
            // if ngModel is not defined, we don't need to do anything
            if (!ctrl) return;
            if (!attrs['ngMatch']) return;

            var valueToMatch = $parse(attrs['ngMatch']);

            var validator = function (value) {
                var temp = valueToMatch(scope),
                    v = value === temp;
                ctrl.$setValidity('match', v);
                return value;
            }

            ctrl.$parsers.unshift(validator);
            ctrl.$formatters.push(validator);
            attrs.$observe('ngMatch', function () {
                validator(ctrl.$viewValue);
            });

        };
        return directive;
    }
}
angular.module("app.widgets", []).directive('ngMatch', app.widgets.ngMatch);
//#endregion

//#region animation
module app.widgets {

    /** ng-match used for validating confirm password field **/
    ngMatch.$inject = [];
    export function ngUiViewAnimate(): ng.IDirective {
        var directive: ng.IDirective = <ng.IDirective>{};

        directive.restrict = 'A';
        directive.link = function link(scope: ng.IScope, elem: JQuery, attrs: ng.IAttributes) {
            if (!attrs.$attr['ngUiViewAnimate']) return;    
            $(elem.children()).addClass('animated');    
            $(elem.children()).addClass(attrs['ngUiViewAnimate']);
        };
        return directive;
    }
}
angular.module("app.widgets", []).directive('ngUiViewAnimate', app.widgets.ngUiViewAnimate);
//#endregion  

//#region Test Directive 1
module app.widgets {
    export class MyDirective1 implements ng.IDirective {

        public restrict = 'E';
        public template = '<div></div>';
        public link($scope: ng.IScope, element: JQuery, attrs: ng.IAttributes) {
            element.text('this is the MyDirective1 directive')
        }
    }
}
angular.module('app.widgets').directive('myDirective1', () => new app.widgets.MyDirective1());
//#endregion


//#region Test Directive 2
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

