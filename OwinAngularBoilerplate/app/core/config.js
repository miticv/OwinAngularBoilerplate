/// <reference path="../_all.ts" />
var app;
(function (app) {
    angular.module('app.core').config(toastrConfig);
    toastrConfig.$inject = ['toastr'];
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appTitle: 'Angular Typescript Template',
        version: '1.0.0'
    };
    angular.module('app.core').value('config', config);

    angular.module('app.core').config(configureTranslation);
    configureTranslation.$inject = ['$i18nextProvider'];
    function configureTranslation($i18nextProvider) {
        $i18nextProvider.options = {
            lng: 'en-us',
            useCookie: false,
            //cookieName: 'lang',  /* default 'i18next' */
            useLocalStorage: false,
            //localStorageExpirationTime: 86400000, // in ms, default 1 week
            //preload: ['de-DE', 'fr'],
            fallbackLng: 'dev',
            lowerCaseLng: true,
            //dynamicLoad: false,
            getAsync: true,
            resGetPath: '/api/translate/__lng__/',
            defaultLoadingValue: ''
        };
    }
})(app || (app = {}));
//# sourceMappingURL=config.js.map
