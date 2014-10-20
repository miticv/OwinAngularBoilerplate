/// <reference path="../_all.ts" />
'use strict';
var app;
(function (app) {
    (function (test) {
        var TestController = (function () {
            function TestController(logger) {
                var self = this;
                self.logger = logger;

                logger.info("Test Info message", "Info");
                logger.success("Test Success message", "Success");
                logger.warning("Test Warning message", "Warning");
                logger.error("Test Error message", "Error");
                throw "this is code generated error message";
            }
            TestController.$inject = ['logger'];
            return TestController;
        })();
        test.TestController = TestController;
    })(app.test || (app.test = {}));
    var test = app.test;
})(app || (app = {}));
angular.module('app.test').controller('testController', app.test.TestController);
//# sourceMappingURL=controllers.js.map
