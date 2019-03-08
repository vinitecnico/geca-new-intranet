import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../authentication/services/auth-guard.service';

// components
import { DashboardComponent } from '../website-settings/components/dashboard/dashboard.component';
import { ProductComponent } from './components/product/product.component';
import { NewsDatabaseListComponent } from './components/news-database-list/news-database-list.component';


const routes: Routes = [
    {
        path: 'app',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'product', component: ProductComponent },
            { path: 'newsdatabaselist', component: NewsDatabaseListComponent}
        ]
    }
];

export const WebsiteRoutingModule = RouterModule.forChild(routes);
