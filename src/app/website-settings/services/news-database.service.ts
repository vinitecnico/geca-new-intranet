import { Injectable, Inject, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import * as Query from '../../query/news-database-query';
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

    getById(_id) {
        return this.apollo
            .mutate({
                mutation: Query.getByIdNewsDatabase,
                variables: {
                    id: _id
                }
            });
    }
}
