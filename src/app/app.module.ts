import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from '@angular/router';
import { MyInterceptor } from './interceptors/my.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AccountingModule } from './accounting/accounting.module';
import { RecordsTableModule } from './records-table/records-table.module';
import {
  FooterComponent,
  HeaderComponent,
  Page404Component,
  HomeComponent,
  LoginComponent,
  AboutComponent,
  MessagesComponent
 } from '.';
import { CoreStoreModule } from './+store/core-store.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    Page404Component,
    HomeComponent,
    LoginComponent,
    AboutComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    AccountingModule,
    RecordsTableModule,
    CoreStoreModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    console.log(`Routes: ${JSON.stringify(router.config, undefined, 2)}`);
  }
}
