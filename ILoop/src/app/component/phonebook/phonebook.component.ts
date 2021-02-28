import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.css']
})

export class PhonebookComponent implements OnInit {
  data: User[];
  dtOptions: any = {};
  constructor( private userService: UserService) {
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
}





