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

// Components
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { MessageComponent } from './components/message/message.component';
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
        CollapseModule.forRoot()
    ],
    declarations: [
        NavBarComponent,
        BreadcrumbComponent,
        MessageComponent,
        Highlight
    ],
    exports: [
        NavBarComponent,
        BreadcrumbComponent,
        MessageComponent,
        Highlight
    ],
    providers: [
        UtilsService
    ],
    entryComponents: [
    ]
})

export class SharedModule { }
