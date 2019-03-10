import { Component, OnInit } from '@angular/core';

// services
import { DashboardService } from '../../services/dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
    item: {
        database: 5,
        news: 3
    };
    constructor(private dashboardService: DashboardService) {
    }

    ngOnInit() {
        this.dashboardService.getAll()
        .subscribe((response: any) => {
            this.item = response.data.dashboard;
        });
    }
}
