import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ForgotComponent } from './forgot/forgot.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes =[
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full',
  // }, {
  //   path: '',
  //   component: AdminLayoutComponent,
  //   children: [
  //       {
  //     path: '',
  //     loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  // }]},
  // {
  //   path: '**',
  //   redirectTo: 'dashboard'
  // }
  {path:'',component: LoginComponent },
   {path:'register',component:UserComponent,canActivate:[AuthGuard]},
   {path:'forgot',component:ForgotComponent},
   {path:'user',  loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule',canActivate:[AuthGuard]},
  {path:'**',component:LoginComponent}
];
// canActivate: [AuthGuard]
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{ useHash: true })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
