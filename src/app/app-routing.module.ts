import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, ExtraOptions } from '@angular/router';

import { HomeComponent,
  LoginComponent,
  Page404Component,
  AboutComponent,
  MessagesComponent
 } from '.';

 import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    canLoad: [AuthGuard],
    loadChildren: './admin/admin.module#AdminModule'
  },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule'
  },
  {
    path: 'messages',
    component: MessagesComponent,
    outlet: 'popup'
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: Page404Component
  }
];

const extraOptions: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  // enableTracing: true // Makes the router log all its internal events to the console.
};

@NgModule({
  imports: [RouterModule.forRoot(routes, extraOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
