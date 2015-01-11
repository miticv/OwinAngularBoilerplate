/// <reference path="../_all.ts" />

module app.useraccount.models {

    export class Login {
        username: string;
        password: string;
        grant_type: string;
        client_id: string;
    }

    export class Refresh {
        username: string;
        refresh_token: string;
        grant_type: string;
        client_id: string;
    }

    export class Register {
        email: string;
        password: string;
        confirmPassword: string;
    }

    export class Token {
        access_token: string;
        token_type: string;
        expires_in: number;
        refresh_token: string;
        userName: string;
        '.issued': string;
        '.expires': string;
        'as:client_id': string;
        clientIssuedTime: string;
    }

    export class UserInfo {
        Email: string;
        HasRegistered: boolean;
        LoginProvider: string;
    }

}