import { Component, OnInit } from '@angular/core';
import { Activity, ActivitySetStatusDTO } from '../../_models/Activity';
import { ActivityService } from '../../_services/activity.service';
import { User } from '../../_models/User';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
@Component({
  selector: 'activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {


  data: Activity[];
  isAdmin: boolean;
  dtOptions: any = {};
  constructor(private authService: AuthService, private activityService: ActivityService, private userService: UserService, private router: Router, private alertify: AlertifyService) {
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      lengthMenu: [10, 25, 50, 100],
      processing: true
    };
    this.getActivities();
  }

  getActivities() {
    if (this.isAdmin) {
      this.activityService.getActivitys().subscribe(Activitys => {
        this.data = Activitys
      });
    }
    else {
      let userId: number = this.userService.getLoggedUserId();
      this.activityService.getActivitiesByUserId(userId).subscribe(Activitys => {
        this.data = Activitys
      });
    }
  }

  updateActivity(activity: Activity) {
    this.router.navigate(['/activity-update'], { queryParams: { id: JSON.stringify(activity.id) } });
  }

  deleteActivity(activity: Activity) {
    this.activityService.deleteActivity(activity).subscribe(p => {
      this.data.splice(this.data.findIndex(p => p.id == activity.id), 1)
      this.alertify.success("Activity Delete Success");
    });
  }
  aproveActivity(activity: Activity) {
    let request: ActivitySetStatusDTO = {
      id: activity.id,
      status: true
    }
    this.activityService.setStatusActivity(request).subscribe(p => {
      this.getActivities();
      this.alertify.success("Activity Aprove Success");
    });


  }
  unAproveActivity(activity: Activity) {
    let request: ActivitySetStatusDTO = {
      id: activity.id,
      status: false
    }
    this.activityService.setStatusActivity(request).subscribe(p => {
      this.getActivities();
      this.alertify.success("Activity Un Aprove Success");
    });
  }
}





