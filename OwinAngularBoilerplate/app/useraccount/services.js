﻿/// <reference path="../_all.ts" />
'use strict';
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var app;
(function (app) {
    (function (useraccount) {
        (function (services) {
            var BaseService = (function () {
                function BaseService($http, $q) {
                    app.log.debug("BaseService consturctor called");
                    this.apiPath = 'token';
                    this.httpService = $http;
                    this.qService = $q;
                }
                BaseService.prototype.$post = function (model) {
                    var self = this;
                    var config = {
                        url: self.apiPath,
                        dataType: 'json',
                        method: 'POST',
                        data: app.common.querifyObject(model),
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    };

                    var deferred = self.qService.defer();
                    self.httpService(config).then(function (result) {
                        self.data = result.data;
                        deferred.resolve(self.data);
                    }, function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                BaseService.$inject = ['$http', '$q'];
                return BaseService;
            })();
            services.BaseService = BaseService;

            var LoginService = (function (_super) {
                __extends(LoginService, _super);
                function LoginService($http, $q) {
                    _super.call(this, $http, $q);

                    //log.debug("LoginService consturctor called");
                    this.apiPath = 'token';
                }
                LoginService.prototype.$post = function (model) {
                    var self = this;
                    var deferred = self.qService.defer();
                    model.grant_type = 'password';
                    var config = {
                        url: self.apiPath,
                        dataType: 'json',
                        method: 'POST',
                        data: app.common.querifyObject(model),
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    };

                    self.httpService(config).then(function (result) {
                        self.data = result.data;
                        deferred.resolve(self.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                    return deferred.promise;
                };

                LoginService.$inject = ['$http', '$q'];
                return LoginService;
            })(BaseService);
            services.LoginService = LoginService;
        })(useraccount.services || (useraccount.services = {}));
        var services = useraccount.services;
    })(app.useraccount || (app.useraccount = {}));
    var useraccount = app.useraccount;
})(app || (app = {}));

angular.module('app.useraccount').service('loginService', app.useraccount.services.LoginService);
//# sourceMappingURL=services.js.map