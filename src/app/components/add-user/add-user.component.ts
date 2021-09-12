import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User, UserService} from "../../services/user.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { NotifierService } from 'angular-notifier';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  users: User[];
  currentUser: User;
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
    this.currentUser = JSON.parse(this.auth.getLoginUser());
    this.form = this.formBuilder.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(2)
          ]
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(2)
          ]
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],
        password: [
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
        birthDate: [
          '',
          [
            Validators.required,
            Validators.minLength(2)
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

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  addUser() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.userService.add(this.form.value);
    this.notifier.notify('success', 'User added!');
  }
}
