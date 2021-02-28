import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  constructor() { }
  public unique_key: number;
  public parentRef;
  @Input() model: any={};
  
 
  ngOnInit(): void {
   console.log("ActivityComponent");

   console.log(this.model);
  }

 

}
