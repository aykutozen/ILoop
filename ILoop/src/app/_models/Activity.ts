import { User } from "./User";

  export class Activity {
    id:number;
    type:string;
    duration:number;
    date:Date;
    comment:string;
    project:string;
    status:boolean;
    user:User;
  
  }
  
  export class ActivitySetStatusDTO
  {
    id:number;
    status:boolean;
  }

