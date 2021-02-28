import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Activity } from 'src/app/_models/Activity';
import { ActivityService } from 'src/app/_services/activity.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'activity-update',
  templateUrl: './activity-update.component.html',
  styleUrls: ['./activity-update.component.css']
})
export class ActivityUpdateComponent implements OnInit {
  model: Activity;

  constructor(private activityService: ActivityService, private route: ActivatedRoute, private alertify: AlertifyService, private router: Router) { }

  ngOnInit(): void {
    this.getActivity();
  }

  getActivity() {
    debugger;
    this.route.queryParams.subscribe(params => {
      let activityId = JSON.parse(params["id"]);
      this.activityService.getActivity(activityId).subscribe(activity => {
        this.model = activity;
      });
    });
  }
  updateActivity() {
    if (!_.isNil(this.model.comment) && !_.isNil(this.model) && !_.isNil(this.model.duration) && !_.isNil(this.model.project) && !_.isNil(this.model.type)) {
      this.activityService.updateActivity(this.model).subscribe(a => {
        this.alertify.success("Activities Updated Success");
        this.router.navigate(['/activitylist']);
      }
      );
    }
  }


}
