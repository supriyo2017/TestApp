import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(public authService: AuthService, private alertifyService: AlertifyService) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertifyService.success('logged in successfully');
    }, error => {
     this.alertifyService.error(error);
    });
  }

  loggedIn(){
    // // const token = localStorage.getItem('token');
    return this.authService.loggedIn();
    // // return !!token;
  }

  logOut(){
    localStorage.removeItem('token');
    this.alertifyService.message('logged out');
  }
}
