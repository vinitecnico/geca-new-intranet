import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
// import { College } from '../../classes/college.class';
import * as _ from 'lodash';
declare var swal: any;

// services
import { NewsService } from '../../services/news.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html'
})

export class NewsComponent implements OnInit {
    typeStatus = [{value: 'Ativo', key: true}, {value: 'Inativo', key: false}];
    form: any;
    _id: string;
    uploadLogo: Subject<boolean> = new Subject();
    uploadCounter = 0;
    constructor(private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private newsService: NewsService) {
        this.route.queryParams.subscribe(params => {
            this._id = params['_id'];
        });
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            id: [null],
            title: [null, Validators.required],
            description: [null, Validators.required],
            imageUrl: [null],
            fileName: [null],
            status: [null, Validators.required],
            showTimeMilliseconds: [null]
        });

        if (this._id) {
            this.newsService.getById(this._id)
                .subscribe((response) => {
                    if (response && response.data && response.data.getByIdNews) {
                        this.setValueData(response.data.getByIdNews);
                    } else {
                        this.router.navigateByUrl('/app/newslist');
                    }
                });
        }
    }

    setValueData(request): void {
        const data = {
            id: request.id,
            title: request.title,
            description: request.description,
            imageUrl: request.imageUrl,
            fileName: request.fileName,
            status: request.status,
            showTimeMilliseconds: request.showTimeMilliseconds
        };

        this.form.setValue(data);
    }

    save() {
        if (!this.form.valid) {
            return;
        }

        const request = this.form.value;
        this.newsService.createOrUpdate(request)
            .subscribe((response) => {
                swal({
                    text: `Notícia ${!request.id ? 'criado' : 'alterado'} com sucesso!`,
                    type: 'success'
                }).then(() => {
                    this.router.navigateByUrl('/app/newslist');
                });
            }, (error) => {
                swal({
                    text: 'Erro para criar Notícia!',
                    type: 'error'
                });
            });
    }

    onUploaded(hasUploaded): void {
        if (hasUploaded) {
            this.uploadCounter++;
            if (this.uploadCounter === 1) {
                this.save();
            }
            return;
        }
    }
}
