import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { JwtModule } from "@auth0/angular-jwt";
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth-guard';
import { ActivityListComponent } from './component/activity-list/activity-list.component';
import { ActivityComponent } from './component/activity/activity.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { LoginComponent } from './component/login/login.component';
import { ErrorInterceptor } from './_services/error.intercaptor';
import { ActivityUpdateComponent } from './component/activity-update/activity-update.component';
import { ActivityFormComponent } from './component/activity-form/activity-form.component';
import { DataTablesModule } from 'angular-datatables';
import { PhonebookComponent } from './component/phonebook/phonebook.component';
import { EmployeeListComponent } from './component/employee-list/employee-list.component';
import { EmployeeOperationsComponent } from './component/employee-operations/employee-operations.component';
import { MasterpageComponent } from './component/masterpage/masterpage.component';


export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    ActivityListComponent,
    HomeComponent,   
    NotfoundComponent,    
    LoginComponent,
    ActivityComponent,
    ActivityListComponent,
    ActivityUpdateComponent,
    ActivityFormComponent,
    PhonebookComponent,
    EmployeeListComponent,
    EmployeeOperationsComponent,
    MasterpageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,    
    DataTablesModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5000"],
        blacklistedRoutes: ["localhost:5000/api/auth"]
      },
    }),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
