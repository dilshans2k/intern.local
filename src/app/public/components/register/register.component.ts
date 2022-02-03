import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: FormGroup = new FormGroup({
    uname: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z0-9]+'),
    ]),
    firstname: new FormControl(null, [
      Validators.required,
      Validators.pattern('[a-zA-Z]+'),
    ]),
    lastname: new FormControl(null, [
      Validators.required,
      Validators.pattern('[a-zA-Z]+'),
    ]),
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
    pno: new FormControl(null, [
      Validators.required,
      Validators.pattern(/\d{10}/),
    ]),
  });

  isHover: string = 'yes';
  ishover: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  signUp() {
    if (this.form.valid) {
      // this.userService.create(this.form.getRawValue());
      this.userService
        .create({
          uname: this.uname.value,
          firstname: this.firstname.value,
          lastname: this.lastname.value,
          email: this.email.value,
          password: this.password.value,
          pno: this.pno.value,
        })
        .pipe(tap(() => this.router.navigate(['../login'])))
        .subscribe();
    }
  }

  changeElevation($event: MouseEvent) {
    this.isHover = $event.type == 'mouseover' ? 'yes' : 'no';

    if (this.isHover == 'yes') {
      this.ishover = true;
    } else this.ishover = false;
  }

  getFormElements(form: FormGroup, attribute: string): FormControl {
    return form.get(attribute) as FormControl;
  }

  get email(): FormControl {
    return this.getFormElements(this.form, 'email');
  }
  get uname(): FormControl {
    return this.getFormElements(this.form, 'uname');
  }
  get firstname(): FormControl {
    return this.getFormElements(this.form, 'firstname');
  }
  get lastname(): FormControl {
    return this.getFormElements(this.form, 'lastname');
  }
  get password(): FormControl {
    return this.getFormElements(this.form, 'password');
  }
  get pno(): FormControl {
    return this.getFormElements(this.form, 'pno');
  }
}
