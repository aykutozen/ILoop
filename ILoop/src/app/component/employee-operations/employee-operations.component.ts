import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { UserForCreateDTO, UserForUpdateDTO } from 'src/app/_models/User';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'employee-operations',
  templateUrl: './employee-operations.component.html',
  styleUrls: ['./employee-operations.component.css']
})
export class EmployeeOperationsComponent implements OnInit {
  userForCreateModel: UserForCreateDTO = new UserForCreateDTO;
  userForUpdateModel: UserForUpdateDTO = new UserForUpdateDTO;
  isUpdateOperation: boolean = false;
  userId:number;
  constructor(private userService: UserService, private route: ActivatedRoute, private alertify: AlertifyService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = JSON.parse(params["id"]);
      debugger;
      if (!_.isNil( this.userId)) {
        this.isUpdateOperation = true;
        this.userService.getUser( this.userId).subscribe(user => {
          this.userForUpdateModel.name = user.name;
          this.userForUpdateModel.surname = user.surname;
          this.userForUpdateModel.email = user.email;
          this.userForUpdateModel.userName = user.userName;
          this.userForUpdateModel.phone = user.phone;
          this.userForUpdateModel.birthDay = user.birthDay;
          this.userForUpdateModel.address = user.address;          
        }, error => {
          this.alertify.error(error);
        });
      }
    });
  }
  createEmployee() {
    this.userService.createUser(this.userForCreateModel).subscribe(() => {
      this.alertify.success("Employee Added");
      this.router.navigate(['/employees']);
    }, error => {
      this.alertify.error(error);
    });
  }
  updateEmployee() {
    this.userService.updateActivity(this.userForUpdateModel, this.userId).subscribe(() => {
      this.alertify.success("Employee Updated");
      this.router.navigate(['/employees']);
    }, error => {
      this.alertify.error(error);
    });
  }
}
