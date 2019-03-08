import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';

import { environment } from '../environments/environment';

// Apollo
import { GraphQLModule } from './graphql.module';

import { AuthenticationInterceptor } from './authentication/interceptors/authentication.interceptor';

export function getLocalStorage() {
  return (typeof window !== 'undefined') ? window.localStorage : null;
}

// router
import { AppRoutingModule } from './app-routing.module';

// sub-module
import { SharedModule } from './shared/shared.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { WebsiteSettingsModule } from './website-settings/website-settings.module';
import { LayoutModule } from '@angular/cdk/layout';

// Layout
import { LayoutComponent } from './layout/layout.component';

// Page


@NgModule({
  declarations: [
    AppComponent,
    // Layout
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    LayoutModule,
    AuthenticationModule,
    WebsiteSettingsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    GraphQLModule,
    BlockUIModule.forRoot(),
    BlockUIHttpModule.forRoot({
      requestFilters: []
    })
  ],
  providers: [
    { provide: 'LocalStorage', useFactory: getLocalStorage },
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
