import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';

import { AuthGuard } from './_guards/auth-guard';

import { ActivityListComponent } from './component/activity-list/activity-list.component';
import { ActivityAddComponent } from './component/activity-add/activity-add.component';
import { LoginComponent } from './component/login/login.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { ActivityUpdateComponent } from './component/activity-update/activity-update.component';
import { PhonebookComponent } from './component/phonebook/phonebook.component';
import { EmployeeListComponent } from './component/employee-list/employee-list.component';
import { EmployeeOperationsComponent } from './component/employee-operations/employee-operations.component';



export const appRoutes: Routes = [
  
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent,canActivate: [AuthGuard]},
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]}, 
    { path: 'phonebook', component: PhonebookComponent, canActivate: [AuthGuard]}, 
    { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard],data: { roles: ["Admin"] }}, 
    { path: 'employee-operations', component: EmployeeOperationsComponent, canActivate: [AuthGuard],data: { roles: ["Admin"] }}, 
    // { path: 'activitylist', component: ActivityListComponent, canActivate: [AuthGuard] ,data: { roles: ["Admin"] }},
    { path: 'activitylist', component: ActivityListComponent, canActivate: [AuthGuard] },
    { path: 'activity-update', component: ActivityUpdateComponent, canActivate: [AuthGuard] },
    { path: 'activity', component: ActivityAddComponent, canActivate: [AuthGuard] ,data: { roles: ["Employee"] }},
    { path: '**', component: NotfoundComponent }
];