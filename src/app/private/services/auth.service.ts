import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AutoLoginI } from 'src/app/model/autologin-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  token = localStorage.getItem('token');
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
    try {
      console.log('tok', this.token);
      const resp = (await lastValueFrom(
        this.http.get(`${environment.apiUrl}/profile`)
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
