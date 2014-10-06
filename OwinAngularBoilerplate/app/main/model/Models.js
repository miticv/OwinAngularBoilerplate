/// <reference path="../../_all.ts" />
var Main;
(function (Main) {
    (function (DemoApp) {
        (function (models) {
            var Login = (function () {
                function Login() {
                }
                return Login;
            })();
            models.Login = Login;

            var Token = (function () {
                function Token() {
                }
                return Token;
            })();
            models.Token = Token;

            var UserInfo = (function () {
                function UserInfo() {
                }
                return UserInfo;
            })();
            models.UserInfo = UserInfo;
        })(DemoApp.models || (DemoApp.models = {}));
        var models = DemoApp.models;
    })(Main.DemoApp || (Main.DemoApp = {}));
    var DemoApp = Main.DemoApp;
})(Main || (Main = {}));
//# sourceMappingURL=Models.js.map
