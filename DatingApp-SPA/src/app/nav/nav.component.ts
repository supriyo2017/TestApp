import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;
  constructor(
    public authService: AuthService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);    
  }

  login() {
    this.authService.login(this.model).subscribe(
      next => {
        this.alertifyService.success("logged in successfully");
      },
      error => {
        this.alertifyService.error(error);
      },
      () => {
        this.router.navigate(["/members"]);
      }
    );
  }

  loggedIn() {
    // // const token = localStorage.getItem('token');
    return this.authService.loggedIn();
    // // return !!token;
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.authService.deCodedToken = null;
    this.authService.currentUser = null;
    this.alertifyService.message("logged out");
    this.router.navigate(["/home"]);
  }
}
