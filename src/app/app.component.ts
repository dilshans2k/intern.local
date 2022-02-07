import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'intern.local';
  route: string;
  constructor(private router: Router){
    this.route = router.url;
    console.log('route',this.router.url)
  }
  
}