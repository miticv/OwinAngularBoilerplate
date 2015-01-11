/// <reference path="../_all.ts" />
'use strict';
var app;
(function (app) {
    //#region ng-match
    (function (widgets) {
        /** ng-match used for validating confirm password field **/
        ngMatch.$inject = ['$parse'];
        function ngMatch($parse) {
            var directive = {};

            directive.restrict = 'A';
            directive.require = '?ngModel';

            //directive.scope = {};
            directive.link = function link(scope, elem, attrs, ctrl) {
                // if ngModel is not defined, we don't need to do anything
                if (!ctrl)
                    return;
                if (!attrs['ngMatch'])
                    return;

                var valueToMatch = $parse(attrs['ngMatch']);

                var validator = function (value) {
                    var temp = valueToMatch(scope), v = value === temp;
                    ctrl.$setValidity('match', v);
                    return value;
                };

                ctrl.$parsers.unshift(validator);
                ctrl.$formatters.push(validator);
                attrs.$observe('ngMatch', function () {
                    validator(ctrl.$viewValue);
                });
            };
            return directive;
        }
        widgets.ngMatch = ngMatch;
    })(app.widgets || (app.widgets = {}));
    var widgets = app.widgets;
})(app || (app = {}));
angular.module("app.widgets").directive('ngMatch', app.widgets.ngMatch);

var app;
(function (app) {
    //#endregion
    //#region ng-ui-view-animate
    (function (widgets) {
        ngUiViewAnimate.$inject = [];
        function ngUiViewAnimate() {
            var directive = {};

            directive.restrict = 'A';
            directive.link = function link(scope, elem, attrs) {
                if (!attrs['ngUiViewAnimate'])
                    return;
                $(elem.children()).addClass('animated');
                $(elem.children()).addClass(attrs['ngUiViewAnimate']);
            };
            return directive;
        }
        widgets.ngUiViewAnimate = ngUiViewAnimate;
    })(app.widgets || (app.widgets = {}));
    var widgets = app.widgets;
})(app || (app = {}));
angular.module("app.widgets").directive('ngUiViewAnimate', app.widgets.ngUiViewAnimate);

var app;
(function (app) {
    //#endregion
    //#region ngLangTranslate
    (function (widgets) {
        ngLangTranslate.$inject = [];
        function ngLangTranslate() {
            var directive = {};

            directive.restrict = 'A';
            directive.link = function ($scope, elem, attrs) {
                if (!attrs['ngLangTranslate'])
                    return;
                if (app.LANG[attrs['ngLangTranslate']]) {
                    elem.text(app.LANG[attrs['ngLangTranslate']]);
                }
            };
            return directive;
        }
        widgets.ngLangTranslate = ngLangTranslate;
    })(app.widgets || (app.widgets = {}));
    var widgets = app.widgets;
})(app || (app = {}));
angular.module('app.widgets').directive('ngLangTranslate', app.widgets.ngLangTranslate);

var app;
(function (app) {
    //#endregion
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
    (function (widgets) {
        var MyDirective1 = (function () {
            function MyDirective1() {
                this.restrict = 'E';
                this.template = '<div></div>';
            }
            MyDirective1.prototype.link = function ($scope, element, attrs) {
                element.text('this is the MyDirective1 directive');
            };
            return MyDirective1;
        })();
        widgets.MyDirective1 = MyDirective1;
    })(app.widgets || (app.widgets = {}));
    var widgets = app.widgets;
})(app || (app = {}));
angular.module('app.widgets').directive('myDirective1', function () {
    return new app.widgets.MyDirective1();
});

//#endregion
//#region Test Directive 2 (example of another way to directives)
angular.module('app.widgets').directive('myDirective2', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        link: function ($scope, element, attrs) {
            element.text('this is the MyDirective2 directive');
        }
    };
});
//#endregion
//# sourceMappingURL=directives.js.map
