import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
      Validators.pattern(/^\w+([.-]?\w+)*@docquity.com/),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$ %^&*()_+\-=\[\]{};':\\|,.<>\/?]).{8,16}/
      ),
    ]),
  });

  isHover: string = 'yes';
  ishover: boolean = false;

  changeElevation($event: MouseEvent) {
    this.isHover = $event.type == 'mouseover' ? 'yes' : 'no';

    if (this.isHover == 'yes') {
      this.ishover = true;
    } else this.ishover = false;
  }

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.form.valid) {
      console.log('inside');
      this.authService
        .login({
          email: this.email.value,
          password: this.password.value,
        })
        .pipe(
          tap(() =>
            this.router.navigate(['../../../private/components/dashboard'])
          )
        )
        .subscribe();
    }
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }
  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }
  getEmailErrorMessage(formFieldName: string) {
    return this.form.controls[formFieldName].hasError('required')
      ? 'Email is required'
      : this.form.controls[formFieldName].hasError('pattern')
      ? 'Docquity email is required'
      : '';
  }

  getPasswordErrorMessage(formFieldName: string) {
    return this.form.controls[formFieldName].hasError('required')
      ? 'Password is required'
      : this.form.controls[formFieldName].hasError('pattern')
      ? 'Password much match pattern'
      : '';
  }

  ngOnInit() {}
}
