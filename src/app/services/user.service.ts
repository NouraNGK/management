import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userURL: string = "http://localhost:3003/api/users";
  constructor(private http: HttpClient) { }

  signup(userObj: any) {
    return this.http.post<{msg: string}>(this.userURL + "/signup", userObj);
  }

  login(user: any) {
    return this.http.post<{msg: string, user: any}>(this.userURL + "/login", user);
  }
}