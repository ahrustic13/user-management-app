import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface User {
  id: string,
  name: string,
  username: string,
  email: string,
  password: string,
  city: string,
  phone: string,
  birthDate: string,
  address: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[];

  constructor(private http: HttpClient) {
    this.users = []
    this.getUsersJSON().then((users) => {this.users = users});
  }

  getUsersJSON() {
    return this.http.get<any>('assets/data.json')
      .toPromise()
      .then(res => {
        <User[]>res.data
        return res;
      });
  }

  getUsers() {
    return this.users;
  }

  delete(user: User) {
    const index = this.users.findIndex((u: any, index: number) => {return u.id === user.id});
    this.users.splice(index, 1);
    return this.users;
  }

  edit(user: User, userId: string) {
    const index = this.users.findIndex((u: any, index: number) => {return u.id === userId});
    this.users[index].name = user.name;
    this.users[index].city = user.city;
    this.users[index].address = user.address;
    this.users[index].phone = user.phone;
    return this.users;
  }

  add(user: User) {
    user.id ='_' + Math.random().toString(36).substr(2, 9);
    this.users.splice(0, 0, user);
    console.log(this.users)
  }
}
