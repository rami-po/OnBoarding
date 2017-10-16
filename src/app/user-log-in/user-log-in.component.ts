import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AppService} from "../app.service";

declare const gapi: any;


@Component({
  selector: 'app-user-log-in',
  templateUrl: './user-log-in.component.html',
  styleUrls: ['./user-log-in.component.scss']
})
export class UserLogInComponent implements OnInit, AfterViewInit {

  public auth2:any;

  constructor(
    private appService: AppService
  ) {
    gapi.load('auth2',function () {
      gapi.auth2.init();
    });
  }

  googleLogin() {
    const googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.then(() => {
      googleAuth.signIn({scope: 'profile email'}).then(googleUser => {
        console.log(googleUser.getBasicProfile());
        console.log(googleUser.getAuthResponse().id_token);
        this.appService.auth(googleUser.getAuthResponse().id_token).subscribe(
          (result) => {

          }
        );
      });
    });
  }

  ngOnInit() {
  }

  test() {
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      const profile = gapi.auth2.currentUser.get().getBasicProfile();
      console.log('ID: ' + profile.getId());
      console.log('Full Name: ' + profile.getName());
      console.log('Given Name: ' + profile.getGivenName());
      console.log('Family Name: ' + profile.getFamilyName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());
    }
  }

  public onSignIn(googleUser):void {
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
  }

  public signOut():void {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }


  ngAfterViewInit() {
    // this.gapi.load('auth2',  () => {
    //   this.auth2 = this.gapi.auth2.init({
    //     client_id: '735969407295-nvkp4iv7dplksrjt7q61ge19ps4o4r0s.apps.googleusercontent.com',
    //     cookiepolicy: 'single_host_origin',
    //     scope: 'profile email'
    //   });
    //   this.attachSignin(document.getElementById('glogin'));
    // });
  }

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (loggedInUser) => {
        console.log( loggedInUser);
      }, function (error) {
        // alert(JSON.stringify(error, undefined, 2));
      });

  }

}
