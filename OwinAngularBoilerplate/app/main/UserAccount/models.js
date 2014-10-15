/// <reference path="../_all.ts" />
var app;
(function (app) {
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
    })(app.models || (app.models = {}));
    var models = app.models;
})(app || (app = {}));
//# sourceMappingURL=models.js.map
