/// <reference path="_all.ts" />
'use strict';
var Main;
(function (Main) {
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
    })(Main.app || (Main.app = {}));
    var app = Main.app;
})(Main || (Main = {}));

Main.app.registerDirective('MyDirective', []);
//# sourceMappingURL=directives.js.map
