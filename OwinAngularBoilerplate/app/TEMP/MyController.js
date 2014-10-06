/// <reference path="_all.ts" />
'use strict';
var Main;
(function (Main) {
    (function (app) {
        (function (controllers) {
            var MyController = (function () {
                function MyController($scope, myService) {
                    this.$scope = $scope;
                    this.myService = myService;
                    $scope.message = myService.someMethod();
                }
                return MyController;
            })();
            controllers.MyController = MyController;
        })(app.controllers || (app.controllers = {}));
        var controllers = app.controllers;
    })(Main.app || (Main.app = {}));
    var app = Main.app;
})(Main || (Main = {}));

// Remember to pass all the services used by the constructor of the Controller.
Main.app.registerController('MyController', ['$scope', 'myService']);
//# sourceMappingURL=mycontroller.js.map
