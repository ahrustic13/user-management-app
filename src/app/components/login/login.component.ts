import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { NotifierService } from 'angular-notifier';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  form: FormGroup;
  submitted = false;
  // @ts-ignore
  private readonly notifier: NotifierService;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              notifierService: NotifierService,
              private router: Router) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(2)
          ]
        ],
        password: [
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

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.auth.login(this.form.value.username, this.form.value.password).then((user) => {
      if(user != undefined) {
        this.notifier.notify('success', 'Successful login!');
        this.router.navigate(['/dashboard']);
      }
      else this.notifier.notify('error', 'Wrong username or password!');
    });
  }
}
