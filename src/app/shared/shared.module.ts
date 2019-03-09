import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import {
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatSortModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatAutocompleteModule
} from '@angular/material';

import { FileUploadModule } from 'ng2-file-upload';

// Components
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { MessageComponent } from './components/message/message.component';
import { ImagePreviewDirective } from './directives/image-preview.directive';
import { UploadComponent } from './components/upload/upload.component';
import { Highlight } from './pipes/highlight.pipe';

// services
import { UtilsService } from './services/utils.service';

@NgModule({
    imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatIconModule,
        NgbCollapseModule,
        CollapseModule.forRoot(),
        FileUploadModule
    ],
    declarations: [
        NavBarComponent,
        BreadcrumbComponent,
        MessageComponent,
        ImagePreviewDirective,
        UploadComponent,
        Highlight
    ],
    exports: [
        NavBarComponent,
        BreadcrumbComponent,
        MessageComponent,
        UploadComponent,
        FileUploadModule,
        Highlight
    ],
    providers: [
        UtilsService
    ],
    entryComponents: [
    ]
})

export class SharedModule { }
