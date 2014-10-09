/// <reference path="_all.ts" />

'use strict';
module app {

    export class common {

        //#region strings
        public static capitaliseFirstLetter(str: string) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        public static lowercaseFirstLetter(str: string) {
            return str.charAt(0).toLowerCase() + str.slice(1);
        }

        public static textContains(text: string, searchText: string) {
            return text && -1 !== text.toLowerCase().indexOf(searchText.toLowerCase());
        }

        public static isNumber(val) {
            // negative or positive 
            return /^[-]?\d+$/.test(val);
        }
        //#endregion

        //#region dates
        public addDays(date, days) {
            var result = new Date(date);
            result.setDate(date.getDate() + days);
            return result;
        }
        //#endregion
   
    }

    export class Dictionary<T> {
        private items = [];

        add(key: string, value: T) {
            if (value && typeof value != "undefined") {
                this.items.push(value);
                this.items[key] = value;
            } else {
                app.log.error("Failed to add item to app cache (null) - " + key);
            }
        }

        getByIndex(index: number) {
            return this.items[index];
        }

        getByKey(key: string) {
            return this.items[key];
        }
    }

    export class log {

        public static debug(message?: any, ...optionalParams: any[]) {
            console.debug(message, optionalParams);
        }

        public static info(message?: any, ...optionalParams: any[]) {
            console.info(message, optionalParams);
        }

        public static warn(message?: any, ...optionalParams: any[]) {
            console.warn(message, optionalParams);
        }

        public static error(message?: any, ...optionalParams: any[]) {
            console.error(message, optionalParams);
        }

        public static clear() {
            console.log(new Array(24 + 1).join("\n"));
        }
    }
}