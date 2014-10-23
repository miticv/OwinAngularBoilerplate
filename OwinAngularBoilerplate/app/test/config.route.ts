/// <reference path="../_all.ts" />


module app.test {
    'use strict';

    angular.
        module('app.test').
        config(UserAccountConfig);

    UserAccountConfig.$inject = ['$stateProvider'];

    function UserAccountConfig( $stateProvider: ng.ui.IStateProvider) {

        $stateProvider.
        state("test", {
            url: "/test",
            templateUrl: '/app/test/test.html',
            controller: function ($scope) {
                $scope.title = 'Test';
            }
        });

    }

}