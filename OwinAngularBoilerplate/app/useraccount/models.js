/// <reference path="../_all.ts" />
var app;
(function (app) {
    (function (useraccount) {
        (function (models) {
            var Login = (function () {
                function Login() {
                }
                return Login;
            })();
            models.Login = Login;

            var Refresh = (function () {
                function Refresh() {
                }
                return Refresh;
            })();
            models.Refresh = Refresh;

            var Register = (function () {
                function Register() {
                }
                return Register;
            })();
            models.Register = Register;

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
        })(useraccount.models || (useraccount.models = {}));
        var models = useraccount.models;
    })(app.useraccount || (app.useraccount = {}));
    var useraccount = app.useraccount;
})(app || (app = {}));
//# sourceMappingURL=models.js.map
