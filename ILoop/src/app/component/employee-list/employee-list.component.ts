import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../_models/User';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  data: User[];
  dtOptions: any = {};
  constructor( private userService: UserService,private router: Router) {
  }

  ngOnInit(): void {
   
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      lengthMenu: [10, 25, 50, 100],
      processing: true
    };
    this.getActivities();
  }

  getActivities() {   
      this.userService.getUsers().subscribe(res => {
        this.data = res
      });
  }
  updateEmployee(user: User) {
    this.router.navigate(['/employee-operations'], { queryParams: { id: JSON.stringify(user.id) } });
  }
}





