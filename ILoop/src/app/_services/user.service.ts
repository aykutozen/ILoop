import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserForCreateDTO, UserForUpdateDTO } from '../_models/User';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    baseUrl: string = "http://localhost:5000/api/users/";
    constructor(private http: HttpClient, private autService: AuthService) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl);
    }

    getUser(id: number): Observable<User> {
        return this.http.get<User>(this.baseUrl + id);
    }
    getLoggedUserId(): number {
        return this.autService.decodedToken.nameid;
    }  
    createUser(user: UserForCreateDTO) {
        return this.http.post(this.baseUrl,user);
    }
    updateActivity(user: UserForUpdateDTO,userId:number) {
        return this.http.put(this.baseUrl +userId,user);
      }


}