/// <reference path="../_all.ts" />
'use strict';
var app;
(function (app) {
    //#region Way 1
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

//angular.module('app.widgets').directive('myDirective1', function (): ng.IDirective { return new app.directives.MyDirective1() });
angular.module('app.widgets').directive('myDirective1', function () {
    return new app.widgets.MyDirective1();
});

//#endregion
//#region Way 2
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
