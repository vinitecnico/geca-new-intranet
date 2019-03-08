import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../authentication/services/auth-guard.service';

// components
import { DashboardComponent } from '../website-settings/components/dashboard/dashboard.component';
import { ProductComponent } from './components/product/product.component';
import { NewsDatabaseListComponent } from './components/news-database-list/news-database-list.component';
import { NewsDatabaseComponent } from './components/news-database/news-database.component';


const routes: Routes = [
    {
        path: 'app',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'product', component: ProductComponent },
            { path: 'newsdatabaselist', component: NewsDatabaseListComponent},
            { path: 'newsdatabase', component: NewsDatabaseComponent}
        ]
    }
];

export const WebsiteRoutingModule = RouterModule.forChild(routes);
