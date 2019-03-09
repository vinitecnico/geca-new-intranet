import { Injectable, Inject, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import * as Query from '../../query/news-query';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class NewsService {
    constructor(private apollo: Apollo) {
    }

    getAll(request) {
        return this.apollo
            .mutate({
                mutation: Query.filterNews,
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
                mutation: Query.getByIdNews,
                variables: {
                    id: _id
                }
            });
    }

    createOrUpdate(news): Observable<any> {
        if (news.id) {
            return this.apollo
                .mutate({
                    mutation: Query.updateNews,
                    variables: {
                        id: news.id,
                        title: news.title,
                        description: news.description,
                        imageUrl: news.imageUrl,
                        fileName: news.fileName,
                        status: news.status,
                        showTimeMilliseconds: news.showTimeMilliseconds
                    }
                });
        } else {
            return this.apollo
                .mutate({
                    mutation: Query.addNews,
                    variables: {
                        title: news.title,
                        description: news.description,
                        imageUrl: news.imageUrl,
                        fileName: news.fileName,
                        status: news.status,
                        showTimeMilliseconds: news.showTimeMilliseconds
                    }
                });
        }
    }

    delete(_id: string): Observable<any> {
        return this.apollo
            .mutate({
                mutation: Query.removeNews,
                variables: {
                    id: _id
                }
            });
    }
}
