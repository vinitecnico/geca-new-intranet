import { Injectable, Inject, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import * as Query from '../../query/global-query';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class DashboardService {
    constructor(private apollo: Apollo) {
    }

    getAll() {
        // return this.apollo
        //     .mutate({
        //         mutation: Query.dashboard,
        //         variables: {
        //         }
        //     });
    }
}
