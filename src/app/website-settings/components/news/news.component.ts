import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
// import { College } from '../../classes/college.class';
import * as _ from 'lodash';
declare var swal: any;

// services
import { NewsDatabaseService } from '../../services/news-database.service';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html'
})

export class NewsComponent implements OnInit {
    typeStatus = [{value: 'Ativo', key: true}, {value: 'Inativo', key: false}];
    typesDatabase = ['JSON','RSS'];
    form: any;
    _id: string;
    constructor(private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private newsDatabaseService: NewsDatabaseService) {
        this.route.queryParams.subscribe(params => {
            this._id = params['_id'];
        });
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            id: [null],
            name: [null, Validators.required],
            type: [null, Validators.required],
            url: [null, Validators.required],
            status: [null, Validators.required]
        });

        if (this._id) {
            this.newsDatabaseService.getById(this._id)
                .subscribe((response) => {
                    if (response && response.data && response.data.getByIdNewsDatabase) {
                        this.setValueData(response.data.getByIdNewsDatabase);
                    } else {
                        this.router.navigateByUrl('/app/newsdatabaselist');
                    }
                });
        }
    }

    setValueData(request): void {
        const data = {
            id: request.id,
            name: request.name,
            type: request.type,
            url: request.url,
            status: request.status
        };

        this.form.setValue(data);
    }

    save() {
        if (!this.form.valid) {
            return;
        }

        const request = this.form.value;
        this.newsDatabaseService.createOrUpdate(request)
            .subscribe((response) => {
                swal({
                    text: `Database ${!request.id ? 'criado' : 'alterado'} com sucesso!`,
                    type: 'success'
                }).then(() => {
                    this.router.navigateByUrl('/app/newsdatabaselist');
                });
            }, (error) => {
                swal({
                    text: 'Erro para criar Database!',
                    type: 'error'
                });
            });
    }
}
