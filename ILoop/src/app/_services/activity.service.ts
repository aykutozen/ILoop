import { Injectable } from '@angular/core';
import {  Activity, ActivitySetStatusDTO } from '../_models/Activity';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  baseUrl: string = "http://localhost:5000/";
  model = new Activity();

  constructor(private http: HttpClient) { }

  getActivitys(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.baseUrl + 'api/Activity');
  }
  getActivity(id:number):Observable<Activity>{   
    return this.http.get<Activity>(this.baseUrl + 'api/Activity/GetActivity/'+id);
  }
  getActivitiesByUserId(id:number):Observable<Activity[]>{   
    return this.http.get<Activity[]>(this.baseUrl + 'api/Activity/GetActivitiesByUserId/'+id);
  }
  getActivityDates(id:number):Observable<Date[]>{  
    return this.http.get<Date[]>(this.baseUrl + 'api/Activity/GetActivityDates/'+id);
  }
  setStatusActivity(item:ActivitySetStatusDTO) {
    return this.http.put(this.baseUrl + 'api/Activity/SetStatusActivity',item);
  }
  addActivity(activities: Activity[]): Observable<Activity>
  {
    return this.http.post<Activity>(this.baseUrl + 'api/Activity', activities);
  }

  updateActivity(activity: Activity) {
    return this.http.put<Activity>(this.baseUrl + 'api/Activity/'+activity.id, activity);
  }

  deleteActivity(activity: Activity): Observable<Activity> {
    return this.http.delete<Activity>(this.baseUrl + 'api/Activity/' + activity.id);
  }

  
  
 

 
}
