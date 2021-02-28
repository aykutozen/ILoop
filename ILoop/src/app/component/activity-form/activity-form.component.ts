import { Component, OnInit, Input, ComponentRef, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Activity } from 'src/app/_models/Activity';

import { ActivityComponent } from '../activity/activity.component';


@Component({
  selector: 'activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css']
})
export class ActivityFormComponent implements OnInit {  
  date: Date;
  public unique_key: number;
  public parentRef;
  model: Activity[] = [];
  ngOnInit(): void {

   
  }

  @ViewChild('viewContainerRef', { read: ViewContainerRef })
  VCR: ViewContainerRef;

  title = 'testClient';

  child_unique_key: number = 0;
  componentsReferences = Array<ComponentRef<ActivityComponent>>();

  constructor(private CFR: ComponentFactoryResolver) { }

  createComponent() {

   
      let componentFactory = this.CFR.resolveComponentFactory(
        ActivityComponent
      );

      let childComponentRef = this.VCR.createComponent(componentFactory);

      let childComponent = childComponentRef.instance;
      childComponent.unique_key = ++this.child_unique_key;
      childComponent.parentRef = this;  
      childComponent.model.date=this.date;
      this.componentsReferences.push(childComponentRef);
     
  
  }

  getActivityDay() {
    for (const references of this.componentsReferences) {
      this.model.push(references.instance.model)
    }   
    return this.model;
  }

}
