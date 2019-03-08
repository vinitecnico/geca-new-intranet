import { Injectable, Inject, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import * as Query from '../../query/global-query';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class NewsDatabaseService {
    constructor(private apollo: Apollo) {
    }

    getAll(request) {
        return this.apollo
            .mutate({
                mutation: Query.filterNewsDatabase,
                variables: {
                    value: request.value,
                    page: request.page, 
                    perPage: request.per_page, 
                    active: request.active, 
                    direction: request.direction, 
                    status: request.status
                }
            });
    }
}
