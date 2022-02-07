import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UserData } from 'src/app/model/all-users-data-response';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-initials-sprites';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

var allUsersData: UserData[];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private iconRegistery: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {}

  dataSource: UserData[] = [];
  displayedColumns: string[] = [
    'Avatar',
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
  tokenName: string = 'token';
  customSeed: string = '';

  async ngOnInit() {
    console.log('reached in dashboard');
    allUsersData = (await lastValueFrom(
      this.http.get('http://127.0.0.1:3000/user/showall')
    )) as UserData[];
    this.dataSource = allUsersData;
    for (let index = 0; index < this.dataSource.length; index++) {
      if (this.currentEmail == this.dataSource[index].email) {
        this.currentUserObject = this.dataSource[index];
      }
    }
    this.customSeed =
      this.currentUserObject.firstname + ' ' + this.currentUserObject.lastname;
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

  logout() {
    localStorage.removeItem(this.tokenName);
    this.router.navigate(['../../public/login']);
  }

  getSvgName(name: string) {
    for (let index = 0; index < 26; index++) {
      this.iconRegistery.addSvgIconLiteral(
        'avatar' + name,
        this.sanitizer.bypassSecurityTrustHtml(
          createAvatar(style, { seed: name.slice(0, 1).toLowerCase() })
        )
      );
    }
    return 'avatar' + name;
  }
}
