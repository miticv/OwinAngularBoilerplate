/// <reference path="../_all.ts" />

'use strict';
module app {


    // export var commonSvc: app.services.Common;

    export class common implements IService {

        //public static spinStart(key= "spinner") {
        //    app.commonSvc.broadcast("cc-spinner:spin", key);
        //}

        //public static spinStop(key= "spinner") {
        //    app.commonSvc.broadcast("cc-spinner:stop", key);
        //}



        //#region strings

        public static querifyObject(obj) {
            var str = [];
            for (var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        }

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

    //#region dictionary
    export class Item {
        constructor(public name: string, public object: any) {
        }
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
    //#endregion

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

    export class InstanceLoader {
        static getInstance<T>(context: Object, name: string, ...args: any[]): T {
            var instance = Object.create(context[name].prototype);
            instance.constructor.apply(instance, args);
            return <T> instance;
        }

        static create<T>() {
            return <any>{};
        }
    }

    export class Describer {
        static getName(ent) {
            if (typeof ent == "string") return ent;

            if (ent.constructor && ent.constructor.name != "Function") {
                return ent.constructor.name || (ent.toString().match(/function (.+?)\(/) || [, ''])[1];
            } else {
                return ent.name;
            }
            //var funcNameRegex = /function (.{1,})\(/; 
            //var results = (funcNameRegex).exec((<any> inputClass).constructor.toString()); 
            //return (results && results.length > 1) ? results[1] : ""; 
        }
    }
}