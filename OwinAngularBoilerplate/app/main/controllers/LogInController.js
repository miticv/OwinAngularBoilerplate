/// <reference path="../../_all.ts" />
var Main;
(function (Main) {
    (function (DemoApp) {
        (function (controllers) {
            var LogInController = (function () {
                //private init(): void {
                //    var self = this;
                //}
                function LogInController($scope, dataSvc) {
                    var self = this;

                    self.$scope = $scope;
                    self.dataSvc = dataSvc;

                    self.$scope.LogMeIn = function () {
                        var self = this;
                        self.dataSvc.$get(self.$scope.Login).then(function (data) {
                            self.tokenData = data;
                        });
                    };
                }
                return LogInController;
            })();
            controllers.LogInController = LogInController;
        })(DemoApp.controllers || (DemoApp.controllers = {}));
        var controllers = DemoApp.controllers;
    })(Main.DemoApp || (Main.DemoApp = {}));
    var DemoApp = Main.DemoApp;
})(Main || (Main = {}));
//# sourceMappingURL=LogInController.js.map
