import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, PageEvent, Sort } from '@angular/material';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import * as _ from 'lodash';
declare var swal: any;

// classes
// import { College } from '../../classes/college.class';

// services
import { NewsService } from '../../services/news.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
    selector: 'app-news-list',
    templateUrl: './news-list.component.html'
})

export class NewsListComponent implements OnInit {
    // Table elements
    displayedColumns = ['title', 'status', 'edit', 'delete'];
    dataSource = new MatTableDataSource<any>();
    pageIndex = 0;
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10, 15, 25];
    sort = { active: 'title', direction: 'asc' };
    titleMsg: String = 'Não foram encontrados resultados!';
    showMessage: boolean;
    hasSearch: boolean;
    filterValue: string;
    noItems: boolean;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('searchTextRef') searchTextRef: ElementRef;

    constructor(private router: Router, private newsService: NewsService, private utilsService: UtilsService) {
    }

    ngOnInit() {
        this.getAll(this.pageIndex, this.pageSize);
    }

    applyFilter(filterValue: string): void {
        this.filterValue = filterValue ? this.utilsService.removeSpecialCharacters(filterValue.trim().toLowerCase()) : null;
        this.pageIndex = 0;
        this.getAll(this.pageIndex, this.pageSize);
    }

    sortData(sort: Sort) {
        if (sort.active && !sort.direction) {
            sort.direction = 'asc';
        }
        this.sort = sort;
        this.pageIndex = 0;
        this.getAll(this.pageIndex, this.pageSize);
    }

    getNext(event: PageEvent) {
        this.getAll(event.pageIndex, event.pageSize);
    }

    getAll(page, pageSize): void {
        const request: any = {
            value: '',
            page:  (page + 1).toString(),
            per_page: pageSize.toString(),
            active: this.sort.active,
            direction: this.sort.direction,
            status: 'all'
        };
        if (this.filterValue) {
            request.value = this.filterValue;
        }

        this.newsService.getAll(request)
            .subscribe((response: any) => {
                this.length = response.data.filterNews.total;
                this.dataSource.data = response.data.filterNews.data;

                if (this.length === 0) {
                    this.showMessage = true;
                    this.hasSearch = false;
                    if (this.filterValue) {
                        this.noItems = true;
                    }
                } else {
                    this.hasSearch = true;
                    this.noItems = true;
                    this.showMessage = false;

                    setTimeout(() => {
                        Observable.fromEvent(this.searchTextRef.nativeElement, 'keyup')
                            .map((evt: any) => evt.target.value)
                            .debounceTime(800)
                            .distinctUntilChanged()
                            .subscribe((text: string) => this.applyFilter(text));
                    });
                }
            }, (erro) => {
                this.showMessage = true;
                this.hasSearch = false;
            });
    }

    delete(_id: string) {
        swal({
            text: 'Deseja realmente apagar a notícia?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Apagar',
            cancelButtonText: 'Cancelar',
            closeOnConfirm: false,
            closeOnCancel: false
        })
            .then((isConfirm) => {
                if (isConfirm) {
                    this.newsService.delete(_id)
                        .subscribe((data: any) => {
                            if (data) {
                                swal({
                                    text: `Notícia deletado com sucesso!`,
                                    type: 'success'
                                }).then(() => {
                                    this.getAll(this.pageIndex, this.pageSize);
                                });
                            }
                        }, () => {
                            this.getAll(this.pageIndex, this.pageSize);
                        });
                }
            });
    }
}
