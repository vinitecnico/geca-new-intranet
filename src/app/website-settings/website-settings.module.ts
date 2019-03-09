import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatStepperModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTooltipModule
} from '@angular/material';

import { NgxEditorModule } from 'ngx-editor';

// Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductComponent } from './components/product/product.component';
import { ProductModalComponent } from './components/product/product-modal/product-modal.component';
import { DeleteConfirmModalComponent } from './components/delete-confirm-modal/delete-confirm-modal.component';
import { NewsDatabaseListComponent } from './components/news-database-list/news-database-list.component';
import { NewsDatabaseComponent } from './components/news-database/news-database.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsComponent } from './components/news/news.component';

// Services
import { ProductService } from './services/product.service';
import { MenuService } from './services/menu.service';
import { NewsDatabaseService } from './services/news-database.service';
import { NewsService } from './services/news.service';

// Router
import { WebsiteRoutingModule } from './website-routing.module';

// sub-menu
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        WebsiteRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatRadioModule,
        MatStepperModule,
        MatSelectModule,
        MatCheckboxModule,
        MatTooltipModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgxEditorModule
    ],
    declarations: [
        DashboardComponent,
        ProductComponent,
        ProductModalComponent,
        DeleteConfirmModalComponent,
        NewsDatabaseListComponent,
        NewsDatabaseComponent,
        NewsListComponent,
        NewsComponent
    ],
    entryComponents: [
        ProductModalComponent, DeleteConfirmModalComponent
    ],
    providers: [ProductService, MenuService, NewsDatabaseService, NewsService]
})
export class WebsiteSettingsModule { }
