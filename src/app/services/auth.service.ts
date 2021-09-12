import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { HttpClient } from "@angular/common/http";
import { User } from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getLoginUser() {
    return(this.cookieService.get("User"));
  }

  logout() {
    this.cookieService.delete("User");
  }

  login(username: string, password: string) {
    return this.http.get<any>('assets/data.json')
      .toPromise()
      .then(res => {
        <User[]>res.data
        const data = res.find((user: any) => {return user.username == username && user.password == password });
        this.cookieService.set("User", JSON.stringify(data));
        return(JSON.stringify(data));
      });
  }

  delete(userId: string) {
    return this.http.get<any>('assets/data.json')
      .toPromise()
      .then(res => {
        <User[]>res.data
        const data = res.find((user: any) => {return user.id == userId });
        this.cookieService.set("User", JSON.stringify(data));
        return(JSON.stringify(data));
      });
  }
}
