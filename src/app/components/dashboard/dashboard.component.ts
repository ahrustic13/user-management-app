import { Component, OnInit  } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {SortEvent} from "primeng/api";
import {Table} from "primeng/table";
import {User, UserService} from "../../services/user.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { NotifierService } from 'angular-notifier';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {

  users: User[];
  cols: any[];
  first: number = 0;
  currentUser: User;
  editUserModal: boolean = false;
  editUser: User;
  form: FormGroup;
  submitted = false;
  private readonly notifier: NotifierService;

   constructor(
    private auth: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    notifierService: NotifierService,
    private router: Router
  ) {
    this.users = [];
    this.notifier = notifierService;
    this.userService.getUsersJSON().then((users) => {this.users = users});
    this.cols = [
      {field: 'name', header: 'Name'},
      {field: 'username', header: 'Username'},
      {field: 'email', header: 'Email'},
      {field: 'city', header: 'City'},
      {field: 'phone', header: 'Phone'},
      {field: 'birthDate', header: 'Birth date'},
      {field: 'address', header: 'Address'},
      {field: 'edit', header: 'Edit'},
      {field: 'delete', header: 'Delete'},
    ];
     this.editUser = this.currentUser = JSON.parse(this.auth.getLoginUser());
     this.form = this.formBuilder.group(
       {
         name: [
           '',
           [
             Validators.required,
             Validators.minLength(2)
           ]
         ],
         city: [
           '',
           [
             Validators.required,
             Validators.minLength(2),
           ]
         ],
         phone:[
           '',
           [
             Validators.required,
             Validators.minLength(2),
           ]
         ],
         address:[
           '',
           [
             Validators.required,
             Validators.minLength(2),
           ]
         ],
       },
       {}
     );
  }

  ngOnInit(): void {
  }

  reset() {
    this.first = 0;
  }

  clear(table: Table) {
    table.clear();
  }

  delete(user: User) {
     this.users = this.userService.delete(user);
  }

  customSort(event: SortEvent) {
    // @ts-ignore
    event.data.sort((data1, data2) => {
      // @ts-ignore
      let value1 = data1[event.field];
      // @ts-ignore
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      // @ts-ignore
      return (event.order * result);
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  openDialog(user: User) {
    this.form.patchValue({
      name: user.name,
      city: user.city,
      phone: user.phone,
      address: user.address
    });
    this.editUser = user;
    this.editUserModal = true;
  }

  close() {
    this.editUserModal = false;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  edit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.users = this.userService.edit(this.form.value, this.editUser.id);
    this.notifier.notify('success', 'User edited!');
    this.close()
  }
}
