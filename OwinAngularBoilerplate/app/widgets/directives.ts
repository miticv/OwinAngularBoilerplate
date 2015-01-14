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
angular.module("app.widgets").directive('ngMatch', app.widgets.ngMatch);
//#endregion

//#region ng-ui-view-animate
module app.widgets {

    ngUiViewAnimate.$inject = [];
    export function ngUiViewAnimate(): ng.IDirective {
        var directive: ng.IDirective = <ng.IDirective>{};

        directive.restrict = 'A';
        directive.link = function link(scope: ng.IScope, elem: JQuery, attrs: ng.IAttributes) {
            if (!attrs['ngUiViewAnimate']) return;    
            $(elem.children()).addClass('animated');    
            $(elem.children()).addClass(attrs['ngUiViewAnimate']);

        };
        return directive;
    }
}
angular.module("app.widgets").directive('ngUiViewAnimate', app.widgets.ngUiViewAnimate);
//#endregion  

////#region ngLangTranslate
//module app.widgets {

//    ngLangTranslate.$inject = [];
//    export function ngLangTranslate(): ng.IDirective {
//        var directive: ng.IDirective = <ng.IDirective>{};

//        directive.restrict = 'A';
//        directive.link = function($scope: ng.IScope, elem: JQuery, attrs: ng.IAttributes) {
//            if (!attrs['ngLangTranslate']) return;
//            if (app.LANG[attrs['ngLangTranslate']]) {
//                elem.text(app.LANG[attrs['ngLangTranslate']]);
//            }
//        }
//        return directive;
//    }
//}
//angular.module('app.widgets').directive('ngLangTranslate', app.widgets.ngLangTranslate);
////#endregion

//#region ngCountDown
//module app.widgets {

//    ngCountDown.$inject = [];
//    export function ngCountDown(): ng.IDirective {
//        var directive: ng.IDirective = <ng.IDirective>{};

//        directive.restrict = 'A';
//        directive.link = function link(scope: ng.IScope, elem: JQuery, attrs: ng.IAttributes) {
//            if (!attrs['ngCountDown']) return;


//            $(elem.children()).addClass('animated');
//            $(elem.children()).addClass(attrs['ngUiViewAnimate']);

//        };
//        return directive;
//    }
//}
//angular.module("app.widgets").directive('ngCountDown', app.widgets.ngCountDown);
//#endregion  

//#region Test Directive 1 (example of another way to directives)
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
  
//#region Test Directive 2 (example of another way to directives)
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

