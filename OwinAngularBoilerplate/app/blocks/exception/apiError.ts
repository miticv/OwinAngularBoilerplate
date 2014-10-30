/// <reference path="../../_all.ts" />

module app {

    export class ApiErrorMessage {
        modelName: string;
        modelError: string;
    }

    export class ApiErrorHelper {

       /* returns array of "model name", "error message" */
       getModelError = function (data: ApiErrorModel) {

           var returnArray: app.ApiErrorMessage[] = [];
            for (var property in data.ModelState) {
                if (data.ModelState.hasOwnProperty(property)) {
                    // do stuff
                    for (var i = 0; data.ModelState[property].length > i; i++) {
                        var el = new app.ApiErrorMessage();
                        el.modelName = property;
                        el.modelError = data.ModelState[property][i];
                        returnArray.push(el);
                    }
                }
            }
           return returnArray;
        }
    }

    export class ApiError {
        data: ApiErrorModel;
        status: string;
        statusText: string;
    }

    export class ApiErrorModel {
        ModelState: ApiErrorModelState;
        Message: string;        
    }

    export class ApiErrorModelState {
        //model: string[];
        //model.error: Array[]
    }
}