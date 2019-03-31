import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from 'src/_models/user';
import { Router } from '@angular/router';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  // @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  //model: any = {};
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private authService: AuthService, private router: Router,
    private alertifyService: AlertifyService,
    private fb: FormBuilder) {}

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    }
    this.createRegistrationForm();
  }

  createRegistrationForm(){
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required],
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
      return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch' : true }
  }

  register() {
    // this.authService.register(this.model).subscribe(() => {
    //   this.alertifyService.success('Registration successfull');
    // }, error => {
    //   this.alertifyService.error(error);
    // });

    if (this.registerForm.valid){
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe( () => {
        this.alertifyService.success('Registration successful');
      }, error => {
        this.alertifyService.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }

   //console.log(this.registerForm.value);
    //console.log(this.model);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
