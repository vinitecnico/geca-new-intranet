import { Injectable, Inject, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import * as Query from '../../query/global-query';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
    constructor(private router: Router,
                 private apollo: Apollo,
        @Inject('LocalStorage') localStorage) {
    }

    login(email: string, password: string) {
        return this.apollo
            .mutate({
                mutation: Query.loginUser,
                variables: {
                    email: email,
                    password: password
                }
            });
    }

    checkLocalData() {
        const auth = localStorage.getItem('authData');
        const client = localStorage.getItem('clientData');

        if (auth) {
            localStorage.removeItem('authData');
        }

        if (client) {
            localStorage.removeItem('clientData');
        }
    }
}
