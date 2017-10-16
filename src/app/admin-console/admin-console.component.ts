import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

declare const gapi: any;

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.scss']
})
export class AdminConsoleComponent implements OnInit, AfterViewInit {

  googleAuth: any;

  constructor(private router: Router) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '735969407295-nvkp4iv7dplksrjt7q61ge19ps4o4r0s.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.googleAuth = gapi.auth2.getAuthInstance();
    });
  }

  signOut() {
    if (this.googleAuth.currentUser.get().getAuthResponse().id_token) {
      this.googleSignOut()
        .then(this.goToLogin.bind(this));
      // this.googleAuth.signOut().then(() => {
      //   localStorage.removeItem('adminToken');
      //   console.log('User signed out.');
      //   this.router.navigate(['/admin', 'login']);
      // });
    }
  }

  googleSignOut() {
    return new Promise((resolve, reject) => {
      this.googleAuth.signOut().then(() => {
        resolve();
      });
    });
  }

  goToLogin() {
    localStorage.removeItem('adminToken');
    console.log('User signed out.');
    this.router.navigate(['/admin', 'login']);
  }

  goto(route) {
    this.router.navigate(['/admin', route]);
  }

}
