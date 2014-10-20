/// <reference path="../_all.ts" />
'use strict';

module app.test {

    export class TestController implements IController {

        private logger: ILogger;

        

        static $inject = ['logger'];
        constructor(logger: ILogger) {
            var self = this;
            self.logger = logger;
            
            logger.info("Test Info message", "Info");
            logger.success("Test Success message", "Success");
            logger.warning("Test Warning message", "Warning");
            logger.error("Test Error message", "Error");
            throw "this is code generated error message";
        }
    }

}
angular.module('app.test').controller('testController', app.test.TestController);