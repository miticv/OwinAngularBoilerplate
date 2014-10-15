/// <reference path="../_all.ts" />
var app;
(function (app) {
    angular.module('app.core').config(toastrConfig);

    toastrConfig.$inject = ['toastr'];
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    angular.module('app.core').value('config', config);

    var config = {
        appTitle: 'Angular Typescript Template',
        version: '1.0.0'
    };
})(app || (app = {}));
//# sourceMappingURL=config.js.map
