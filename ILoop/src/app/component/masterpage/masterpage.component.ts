import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'masterpage',
  templateUrl: './masterpage.component.html',
  styleUrls: ['./masterpage.component.css']
})
export class MasterpageComponent implements OnInit {
 
isAdmin:boolean;
  constructor(public authService: AuthService, private router: Router, private alertify: AlertifyService){}

  ngOnInit() {
  this.isAdmin=this.authService.isAdmin;
  }
 
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("isadmin");
    this.alertify.warning("logout");
    this.router.navigate(['/login']);
  }


}
