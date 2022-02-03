import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginResponseI } from 'src/app/model/login-response';
import { UserI } from 'src/app/model/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}
  currentUsername: string = '';
  currentEmail: string = '';
  login(user: UserI): Observable<LoginResponseI> {
    return this.http
      .post<LoginResponseI>(`${environment.apiUrl}/authh/login`, user, {
        withCredentials: true,
      })
      .pipe(
        tap((res: LoginResponseI) => {
          console.log(res);
          // alert(res);
          localStorage.setItem('token', res.accessToken);
          this.currentUsername = res.userName;
          this.currentEmail = res.email;
        }),
        tap(() =>
          this.snackbar.open('Login successfull', 'Close', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          })
        )
      );
  }
}
