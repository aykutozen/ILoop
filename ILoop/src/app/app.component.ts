import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { AlertifyService } from './_services/alertify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ILoop';
  jwtHelper = new JwtHelperService();
  isAdmin;
  constructor(public authService: AuthService, private router: Router, private alertify: AlertifyService) { }

  ngOnInit() {
    const token = localStorage.getItem("token");
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    this.isAdmin = this.authService.isAdmin;
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("isadmin");
    this.alertify.warning("logout");
    this.router.navigate(['/login']);
  }
}
