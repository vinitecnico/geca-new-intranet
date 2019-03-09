import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../authentication/services/auth-guard.service';

// components
import { DashboardComponent } from '../website-settings/components/dashboard/dashboard.component';
import { ProductComponent } from './components/product/product.component';
import { NewsDatabaseListComponent } from './components/news-database-list/news-database-list.component';
import { NewsDatabaseComponent } from './components/news-database/news-database.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsComponent } from './components/news/news.component';


const routes: Routes = [
    {
        path: 'app',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'newsdatabaselist', component: NewsDatabaseListComponent},
            { path: 'newsdatabase', component: NewsDatabaseComponent},
            { path: 'newslist', component: NewsListComponent},
            { path: 'news', component: NewsComponent}
        ]
    }
];

export const WebsiteRoutingModule = RouterModule.forChild(routes);
