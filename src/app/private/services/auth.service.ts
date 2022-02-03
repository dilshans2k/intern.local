import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { tokenGetter } from 'src/app/app.module';
import { AutoLoginI } from 'src/app/model/autologin-response';
import { LoginResponseI } from 'src/app/model/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

  token = localStorage.getItem('token');
  error = false;
  dataa = {};
  currentUsername: string = '';
  currentEmail: string = '';

  addHeaders(token: string | null) {
    return {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
      credentials: 'include',
    };
  }

  requestOptions(token: string | null) {
    return {
      headers: new HttpHeaders(this.addHeaders(token)),
      withCredentials: true,
    };
  }

  async autoLogin(): Promise<boolean> {
    const token = localStorage.getItem('token');
    try {
      console.log('tok', this.token);
      const resp = (await lastValueFrom(
        this.http.get('http://127.0.0.1:3000/profile')
      )) as AutoLoginI;
      console.log('res', resp);
      this.currentUsername = resp.uname;
      this.currentEmail = resp.email;

      return true;
    } catch (err) {
      console.log('eorrr');
      localStorage.removeItem('token');
      return false;
    }
  }
}
