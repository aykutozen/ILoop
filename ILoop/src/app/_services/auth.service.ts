import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = "http://localhost:5000/api/auth/";
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  public isAdmin: boolean = false;
  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        let result = response;
        if (result) {
          localStorage.setItem("token", result.token);
          localStorage.setItem("isadmin", result.isAdmin);
          this.isUserAdmin();
          this.decodedToken = this.jwtHelper.decodeToken(result.token);
        }
      })
    )
  }  

  loggedIn() {
    let token = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }
  isUserAdmin() {
    let stroageIsAdmin = localStorage.getItem("isadmin");    
    if (!_.isNil(stroageIsAdmin) && stroageIsAdmin == "true" || stroageIsAdmin == "1") {
      this.isAdmin = true;
    }
    else {
      this.isAdmin = false;
    }

  }
}
