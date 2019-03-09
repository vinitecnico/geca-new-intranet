import { Component, OnInit, Input, ChangeDetectionStrategy, Inject, EventEmitter, Output, OnDestroy, OnChanges } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { FormGroup, FormControlName } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';

// Services
import { UtilsService } from '../../services/utils.service';

declare var swal: any;

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html'
})

export class UploadComponent implements OnInit, OnDestroy {
    @BlockUI() blockUI: NgBlockUI;
    @Input() parentForm: FormGroup;
    @Input() controlNameUrl: string;
    @Input() controlName: string;
    @Input() placeholder: string;
    @Input() helpMessage: string;
    @Input() allFiles: boolean;
    @Input() canUpload: Subject<boolean>;

    // tslint:disable-next-line:no-output-on-prefix
    @Output() onUploaded: EventEmitter<any> = new EventEmitter();

    uploader: FileUploader;
    hasBaseDropZoneOver: boolean;
    imgToUpload: FileItem;
    imgToPreview: string;
    hasImageUpload: boolean;

    constructor(
        private utilsService: UtilsService,
        @Inject('LocalStorage') localStorage) {
    }

    ngOnInit() {
        const authData = JSON.parse(localStorage.getItem('authData'));
        if (!authData) {
            return;
        }
        const URL = `http://localhost:4000/api/dropbox/upload`;
        // const URL = `https://gecanewsapi.herokuapp.com/api/dropbox/upload`;

        let allowedFileType = [];
        if (this.allFiles) {
            allowedFileType = ['pdf', 'xls', 'xlsx', 'doc', 'docx', 'csv', 'zip', 'rar', 'image'];
        } else {
            allowedFileType = ['image'];
        }

        this.uploader = new FileUploader({
            url: URL,
            maxFileSize: 5242880, // 5 MB
            queueLimit: 1,
            allowedFileType: allowedFileType,
            autoUpload: false
        });

        this.parentForm.controls[this.controlNameUrl].valueChanges.subscribe((value) => {
            if (value) {
                this.imgToPreview = value;
                this.hasImageUpload = true;
            } else {
                this.hasImageUpload = false;
            }
        });

        this.uploader.onAfterAddingFile = (item) => {
            item.withCredentials = false;
            item.headers = [{
                name: 'authorization',
                value: `Bearer ${authData.token}`
            }, { 'Content-Type': 'application/json' }];

            const fileExtension = item.file.name.substring(item.file.name.lastIndexOf('.') + 1, item.file.name.length);
            item.file.name = this.utilsService.removeSpecialCharacters(item.file.name);
            item.file.name = item.file.name.replace('.' + fileExtension, '');
            item.file.name = item.file.name + '_' + moment().format('YYYY-MM-DD_hh_mm_ss') + '.' + fileExtension;

            this.parentForm.controls[this.controlName].setValue(item._file.name);
            this.imgToUpload = item;
            this.hasImageUpload = true;
        };

        this.uploader.onWhenAddingFileFailed = (item, filter, options) => {
            let message = null;
            switch (filter.name) {
                case 'queueLimit':
                    message = 'Permitido o envio de no máximo 1 arquivos';
                    break;
                case 'fileSize':
                    message = 'O arquivo ultrapassa o tamanho máximo permitido de 5MB';
                    break;
                case 'fileType':
                    message = 'Tipo de arquivo inválido!';
                    break;
                default:
                    message = 'Erro tentar incluir o arquivo!';
            }

            swal({
                text: message,
                type: 'error'
            });
        };

        this.uploader.onSuccessItem = (item, response) => {
            const data = JSON.parse(response);
            this.parentForm.controls[this.controlName].setValue(data.fileName);
            this.parentForm.controls[this.controlNameUrl].setValue(data.url);
            this.blockUI.stop();
            this.onUploaded.emit(true);
        };

        this.uploader.onErrorItem = (item, response) => {
            this.onUploaded.emit(false);
            this.blockUI.stop();
        };

        this.canUpload.subscribe((upload) => {
            if (upload && this.imgToUpload) {
                this.blockUI.start();
                this.uploader.uploadItem(this.imgToUpload);
            } else if (upload && !this.imgToUpload) {
                this.onUploaded.emit(true);
            }
        });
    }

    ngOnDestroy() {
        this.canUpload.unsubscribe();
    }

    fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    removeFile() {
        if (this.uploader && this.uploader.queue && this.uploader.queue.length > 0) {
            this.uploader.queue = [];
        }
        this.parentForm.controls[this.controlName].setValue('');
        this.parentForm.controls[this.controlNameUrl].setValue('');
        this.imgToPreview = null;
        this.imgToUpload = null;
        this.hasImageUpload = false;
    }
}
