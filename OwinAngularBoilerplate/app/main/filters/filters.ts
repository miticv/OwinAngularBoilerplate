/// <reference path="../_all.ts" />

'use strict';

module app.filters {

    export class RangeTo implements IFilter {
        filter(start: number, end: number) {
            var out = [];
            for (var i = start; i < end; ++i) out.push(i);
            return out;
        }
    }

    export class Splice implements IFilter {
        filter(input: Array<string>, start: number, howMany: number) {
            return input.splice(start, howMany)
        }
    }

}
//app.application.filter('RangeTo', app.filters.RangeTo);
//app.application.filter('Splice',app.filters.Splice);
