import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {
    activeUrl: string;
    isCollapsed = false;
    public currentLang: string;

    constructor(private router: Router) { }

    logout() {
        localStorage.setItem('authData', null);
        this.router.navigateByUrl('/login');
    }
}
