/*
 * Typescript files that do not encapsulate any class or interface 
 * do not need to be included in here
 */
                                           
//#######  libraries  #######
/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../scripts/typings/angular-ui/angular-ui-router.d.ts" />
/// <reference path="../scripts/typings/toastr/toastr.d.ts" />
/// <reference path="../scripts/typings/moment/moment.d.ts" />

//#######  core #######
/// <reference path="core/constants.ts" />
/// <reference path="core/config.ts" />
/// <reference path="core/interfaces.ts" />

//#######  blocks #######
/// <reference path="blocks/logger/logger.ts" />
/// <reference path="blocks/exception/exception.provider.ts" />
/// <reference path="blocks/exception/exception.ts" />

//#######  widgets #######
/// <reference path="widgets/directives.ts" />
/// <reference path="widgets/filters.ts" />

//#######  UserAccount #######
/// <reference path="UserAccount/interfaces.ts" />
/// <reference path="UserAccount/models.ts" />
/// <reference path="UserAccount/services.ts" />
/// <reference path="UserAccount/controllers.ts" />

//#######    test     #######
/// <reference path="test/controllers.ts" />
