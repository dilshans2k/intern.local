import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';

export interface UserData {
  id: number;
  uname: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  pno: string;
  createdAt: string;
  updatedAt: string;
}

var allUsersData: UserData[];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  dataSource: UserData[] = [];
  displayedColumns: string[] = [
    'position',
    'Username',
    'Firstname',
    'Email',
    'Phone Number',
  ];
  currentUsername = this.authService.currentUsername;
  currentEmail = this.authService.currentEmail;
  isHover: string = 'yes';
  ishover: boolean = false;
  currentUserObject: any;
  display = false;

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }

  async ngOnInit() {
    console.log('reached in dashboard');
    allUsersData = (await lastValueFrom(
      this.http.get('http://127.0.0.1:3000/user/showall')
    )) as UserData[];
    console.log(this.cookieService.getAll());
    // console.log(allUsersData[0]);
    this.dataSource = allUsersData;
    for (let index = 0; index < this.dataSource.length; index++) {
      if (this.currentEmail == this.dataSource[index].email) {
        this.currentUserObject = this.dataSource[index];
      }
    }
    console.log(this.currentUserObject);
  }

  changeElevation($event: MouseEvent) {
    this.isHover = $event.type == 'mouseover' ? 'yes' : 'no';

    if (this.isHover == 'yes') {
      this.ishover = true;
    } else this.ishover = false;
  }

  getColor(uname: any) {
    const match = uname == this.currentUsername;
    if (match) {
      return '#d8ccef';
    } else return 'white';
  }

  showUserCard() {
    this.display = !this.display;
  }

  log(val: string) {
    console.log(val);
  }

  fetchCookie() {
    console.log('ckie', this.cookieService.getAll());
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['../../public/login']);
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {}
