/// <reference path="../_all.ts" />
'use strict';
var app;
(function (app) {
    (function (widgets) {
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
angular.module("app.widgets", []).directive('ngMatch', app.widgets.ngMatch);

var app;
(function (app) {
    //#region Test Directive 1
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
//#region Test Directive 2
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
