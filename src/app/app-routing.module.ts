import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { AddUserComponent } from "./components/add-user/add-user.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  { path: "", component: LoginComponent},
  { path: "login", component: LoginComponent},
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]},
  { path: "add-user", component: AddUserComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
