/// <reference path="../_all.ts" />

'use strict';
module app {

    angular
        .module('app.core')
        .constant('toastr', toastr)
        .constant('moment', moment);

}