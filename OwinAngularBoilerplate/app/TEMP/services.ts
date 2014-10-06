/// <reference path="_all.ts" />

'use strict';

module Main.app.services {

    export class MyService implements IService {
        private meaningOfLife = 42;
        constructor() {

        }
        someMethod() {
            return 'Meaning of life is ' + this.meaningOfLife;
        }
    }

}

Main.app.registerService('MyService', []);