import { Injectable, Inject, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import * as Query from '../../query/news-database-query';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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

    createOrUpdate(news): Observable<any> {
        if (news.id) {
            return this.apollo
                .mutate({
                    mutation: Query.updateNewsDatabase,
                    variables: {
                        id: news.id,
                        name: news.name,
                        url: news.url,
                        status: news.status,
                        type: news.type
                    }
                });
        } else {
            return this.apollo
                .mutate({
                    mutation: Query.addNewsDatabase,
                    variables: {
                        name: news.name,
                        url: news.url,
                        status: news.status,
                        type: news.type
                    }
                });
        }
    }

    delete(_id: string): Observable<any> {
        return this.apollo
                .mutate({
                    mutation: Query.removeNewsDatabase,
                    variables: {
                        id: _id
                    }
                });
    }
}
