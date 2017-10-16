import {AfterViewInit, Component, ElementRef, NgZone, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminLogInService} from "./admin-log-in.service";
import {StatusMessageDialogComponent} from "../status-message/status-message.component";
import {MdDialog} from "@angular/material";
import {NavigationExtras, Router} from "@angular/router";
import {AdminFormAuthGuard} from "../admin-form/admin-form.auth.guard";
import {AppService} from "../app.service";
import {isNullOrUndefined} from "util";
import {AuthService, AppGlobals} from 'angular2-google-login';

declare const gapi: any;

@Component({
  selector: 'app-admin-log-in',
  templateUrl: './admin-log-in.component.html',
  styleUrls: ['./admin-log-in.component.scss'],
  providers: [AdminLogInService, StatusMessageDialogComponent, AuthService]
})
export class AdminLogInComponent implements OnInit, AfterViewInit {
  myForm: FormGroup;

  googleAuth: any;
  public auth2: any;

  loggedIn: false;

  constructor(private logInService: AdminLogInService,
              private dialog: MdDialog,
              private router: Router,
              private appService: AppService) {
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      username: new FormControl(null, null),
      password: new FormControl(null, null)
    });
  }

  ngAfterViewInit() {

    gapi.load('auth2', () => {
      gapi.signin2.render('gdbtn', {
        scope: 'profile email',
        height: 36,
        width: 120,
        theme: 'light',
        longtitle: false
      });

      gapi.auth2.init({
        client_id: '735969407295-nvkp4iv7dplksrjt7q61ge19ps4o4r0s.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.googleAuth = gapi.auth2.getAuthInstance();

      console.log(this.googleAuth.isSignedIn.get());

      localStorage.setItem('adminToken', this.googleAuth.currentUser.get().getAuthResponse().id_token);

      this.verifyToken()
        .then(this.goToConsole.bind(this));


    });
  }

  isLoggedIn() {
    if (!isNullOrUndefined(this.googleAuth)) {
      return this.googleAuth.isSignedIn.get();
    }
    return false;
  }

  verifyToken() {
    console.log('verify token');
    return new Promise((resolve, reject) => {
      this.appService.auth(this.googleAuth.currentUser.get().getAuthResponse().id_token).subscribe(
        (success) => {
          resolve();
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  googleSignin() {
    return new Promise((resolve, reject) => {
      this.googleAuth.signIn({scope: 'profile email'}).then(googleUser => {
        resolve();
      });
    });
  }

  goToConsole() {
    return new Promise((resolve, reject) => {
      console.log('go to console');
      localStorage.setItem('adminToken', this.googleAuth.currentUser.get().getAuthResponse().id_token);
      this.router.navigate(['/admin', 'console']);
      resolve();
    });
  }

  googleLogin() {
    this.googleSignin()
      .then(this.verifyToken.bind(this))
      .then(this.goToConsole.bind(this));
  }


  public signOut(): void {
    this.googleAuth.signOut().then(function () {
      localStorage.removeItem('adminToken');
      console.log('User signed out.');
    });
  }

  onLogIn() {
    if (this.myForm.valid) {
      const user = ({
        username: this.myForm.value.username,
        password: this.myForm.value.password
      });

      this.logInService.logIn(JSON.stringify(user))
        .subscribe(
          (response) => {
            sessionStorage.setItem('adminToken', JSON.stringify({username: response.user, token: response.token}));
            this.router.navigate(['/admin', 'console']);
          },
          function (error) {
            this.openErrorDialog(error.title, error.message);
          }.bind(this)
        );
    }
  }

  openErrorDialog(title, message) {
    const dialog = this.dialog.open(StatusMessageDialogComponent);
    dialog.componentInstance.title = 'Error!';
    dialog.componentInstance.messages = [title, message];
    dialog.componentInstance.error = true;
  }


}
