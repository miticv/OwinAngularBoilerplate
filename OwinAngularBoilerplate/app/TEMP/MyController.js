/// <reference path="_all.ts" />
'use strict';
var app;
(function (app) {
    (function (controllers) {
        var MyController = (function () {
            function MyController($scope, myService) {
                this.$scope = $scope;
                this.myService = myService;
                this.message = myService.someMethod();
                this.test = "1234";
            }
            return MyController;
        })();
        controllers.MyController = MyController;
    })(app.controllers || (app.controllers = {}));
    var controllers = app.controllers;
})(app || (app = {}));

// Remember to pass all the services used by the constructor of the Controller.
app.registerController('MyController', ['$scope', 'myService']);
//# sourceMappingURL=MyController.js.map
