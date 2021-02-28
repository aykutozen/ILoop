import { Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivityService } from 'src/app/_services/activity.service';
import { Activity } from 'src/app/_models/Activity';
import { UserService } from 'src/app/_services/user.service';
import { ActivityFormComponent } from '../activity-form/activity-form.component';
import * as _ from 'lodash'
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-activity-add',
  templateUrl: './activity-add.component.html',
  styleUrls: ['./activity-add.component.css']
})
export class ActivityAddComponent implements OnInit {

  @ViewChild('viewContainerRef', { read: ViewContainerRef })
  VCR: ViewContainerRef;
  dateList: Date[];
  child_unique_key: number = 0;
  componentsReferences = Array<ComponentRef<ActivityFormComponent>>();
  userId: number;

  constructor(private CFR: ComponentFactoryResolver, private activityService: ActivityService, private userService: UserService,private router: Router, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.getActivityDates();

  }

  getActivityDates() {
    this.userId = this.userService.getLoggedUserId();
    this.activityService.getActivityDates(this.userId).subscribe(date => {

      for (let i = 0; i < date.length; i++) {
        let componentFactory = this.CFR.resolveComponentFactory(
          ActivityFormComponent
        );
        let childComponentRef = this.VCR.createComponent(componentFactory);
        let childComponent = childComponentRef.instance;
        childComponent.unique_key = ++this.child_unique_key;
        childComponent.parentRef = this;
        childComponent.date = date[i];
        this.componentsReferences.push(childComponentRef);
      }
    });
  }




  save() {
    let activities: Activity[] = [];
    this.userService.getUser(this.userId).subscribe(user => {
      for (const references of this.componentsReferences) {
        references.instance.getActivityDay().forEach(item => {

          if (!_.isNil(item.comment) && !_.isNil(item.date) && !_.isNil(item.duration) && !_.isNil(item.project) && !_.isNil(item.type)) {
            item.user = user;
            item.status=false
            activities.push(item);
          }         

        });
      }
      this.activityService.addActivity(activities).subscribe(res => {
        this.alertify.success("Activities Added Success");
        this.router.navigate(['/activitylist']);
      });
    });
  }
}