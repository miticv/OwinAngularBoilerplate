/// <reference path="_all.ts" />
'use strict';
var app;
(function (app) {
    (function (directives) {
        var MyDirective = (function () {
            function MyDirective() {
                this.template = '<div></div>';
                this.restrict = 'E';
            }
            MyDirective.prototype.link = function ($scope, element, attrs) {
                element.text('this is the MyDirective directive');
            };
            return MyDirective;
        })();
        directives.MyDirective = MyDirective;
    })(app.directives || (app.directives = {}));
    var directives = app.directives;
})(app || (app = {}));

app.registerDirective('MyDirective', []);
//# sourceMappingURL=directives.js.map
