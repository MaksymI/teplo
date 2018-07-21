import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { AccountingModule } from './accounting/accounting.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import {
  FooterComponent,
  HeaderComponent,
  Page404Component,
  HomeComponent,
  LoginComponent,
  AboutComponent,
  MessagesComponent
 } from '.';

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
    MaterialModule,
    AccountingModule,
    UsersModule,
    AdminModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    console.log(`Routes: ${JSON.stringify(router.config, undefined, 2)}`);
  }
}
