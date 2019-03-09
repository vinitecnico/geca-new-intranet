import { Injectable, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import * as Query from '../../query/global-query';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

// services
import { StartupConfigService } from 'src/app/shared/services/startup.config.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient,
        private apiConfig: StartupConfigService,
        private apollo: Apollo,
        @Inject('LocalStorage') localStorage) {
    }

    login(authData) {
        const url = `${this.apiConfig.getConfig()}api/login`;
        return this.http.post(url, authData, httpOptions);
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
