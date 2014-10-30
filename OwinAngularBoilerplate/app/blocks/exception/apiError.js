/// <reference path="../../_all.ts" />
var app;
(function (app) {
    var ApiErrorMessage = (function () {
        function ApiErrorMessage() {
        }
        return ApiErrorMessage;
    })();
    app.ApiErrorMessage = ApiErrorMessage;

    var ApiErrorHelper = (function () {
        function ApiErrorHelper() {
            /* returns array of "model name", "error message" */
            this.getModelError = function (data) {
                var returnArray = [];
                for (var property in data.ModelState) {
                    if (data.ModelState.hasOwnProperty(property)) {
                        for (var i = 0; data.ModelState[property].length > i; i++) {
                            var el = new app.ApiErrorMessage();
                            el.modelName = property;
                            el.modelError = data.ModelState[property][i];
                            returnArray.push(el);
                        }
                    }
                }
                return returnArray;
            };
        }
        return ApiErrorHelper;
    })();
    app.ApiErrorHelper = ApiErrorHelper;

    var ApiError = (function () {
        function ApiError() {
        }
        return ApiError;
    })();
    app.ApiError = ApiError;

    var ApiErrorModel = (function () {
        function ApiErrorModel() {
        }
        return ApiErrorModel;
    })();
    app.ApiErrorModel = ApiErrorModel;

    var ApiErrorModelState = (function () {
        function ApiErrorModelState() {
        }
        return ApiErrorModelState;
    })();
    app.ApiErrorModelState = ApiErrorModelState;
})(app || (app = {}));
//# sourceMappingURL=apiError.js.map
