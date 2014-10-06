/// <reference path="../../_all.ts" />

module Main.DemoApp.models {

        export class Login {
            username: string;
            password: string;
            grant_type: string;
        }

        export class Token {
            access_token: string;
            token_type: string;
            expires_in: number;
            userName: string;
            '.issued': string;
            '.expires': string;
        }

        export class UserInfo {
            Email: string;
            HasRegistered: boolean;
            LoginProvider: string;
        }

}
