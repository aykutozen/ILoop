import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Injectable } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router,private alertify: AlertifyService) { }

    canActivate(route: ActivatedRouteSnapshot) {
        let isAdmin = this.authService.isAdmin;
        if (this.authService.loggedIn()) {           

            if (route.data.roles && route.data.roles == "Admin") {               
                if (isAdmin==true) {
                    return true;
                }
                else
                { 
                this.alertify.warning("You are not authorized to this page");
                    this.router.navigate(['/home']);
                    return false;
                }            
            }  else if (route.data.roles && route.data.roles == "Employee") {               
                if (isAdmin==true) {
                    this.alertify.warning("Only employees can access this page");
                    this.router.navigate(['/home']);
                    
                    return false;
                }
                else
                { 
                    return true;
                }            
            }
            else {
                return true;
            }
        }
        console.log("auth guard");
        this.router.navigate(['/login']);
        return false;
    }
}