import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {AdminLogInService} from "../admin-log-in/admin-log-in.service";
import {UserHubService} from "./user-hub.service";
import {Location} from '@angular/common';

@Component({
  selector: 'app-user-hub',
  templateUrl: './user-hub.component.html',
  styleUrls: ['./user-hub.component.scss'],
  providers: [UserHubService]
})
export class UserHubComponent implements OnInit {
  user: any;
  hasGithub: false;
  mode: string = "indeterminate";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userHubService: UserHubService,
    private location: Location
  ) { }

  navigateTo(route: string){

    this.activatedRoute.queryParams.subscribe(params => {
      const navigationExtras: NavigationExtras = {
        queryParams: { 'token': params['token'] }
      };

      this.router.navigate(['/user', route]);
    });


  }

  openForm(form: string){
    switch(form){
      case 'W4':
        window.open("https://www.irs.gov/pub/irs-pdf/fw4.pdf", "_blank");
        break;
      case 'I9':
        window.open("./forms/I9_form.pdf", "_blank");
        break;
      case 'W9':
        window.open("https://www.irs.gov/pub/irs-pdf/fw9.pdf", "_blank");
        break;
      case 'medical':
        this.router.navigate(['/user', 'medical']);
        break;
      case 'dental':
        this.router.navigate(['/user', 'dental']);
        //window.open("./forms/dental_form.pdf", "_blank");
        break;
      case 'parking':
        window.open("./forms/parking_form.pdf", "_blank");
        break;
      case 'handbook':
        window.open("./forms/handbook.pdf", "_blank");
        //this didnt open for whatever reason
        window.open("./forms/handbook_acknowledgement.pdf", "_blank");
        break;
      case 'at-will':
        window.open("./forms/at-will_form.pdf", "_blank");
        break;
      case '401k':
        window.open("./forms/ProductOps_Education_Enrollment_Kit.pdf", "_blank");
        break;
    }
  }

  validateToken(token){
    this.userHubService.getUser(token)
      .subscribe(
        function(response){
          this.user = response.token.harvestUserData.user;
          if (!localStorage.getItem('github')){
            this.hasGithub = response.token.userData.hasGithub;
          }
          localStorage.setItem("user", JSON.stringify(response.token.harvestUserData.user));
          localStorage.setItem("userData", JSON.stringify(response.token.userData));
          localStorage.setItem("token", JSON.stringify(response.code));
          this.mode = 'determinate';
          this.location.replaceState("/user/home");
        }.bind(this),
        function(error){
          localStorage.clear();
          this.router.navigate(['/404']);
        }.bind(this)
      );
  }

  test() {
    this.router.navigate(['/user', 'pdf']);
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const query = params['token'];
      if (query !== undefined){
        localStorage.clear();
        this.validateToken(query);
      }
      else {
        if (localStorage.getItem('token')) {
          this.validateToken(JSON.parse(localStorage.getItem('token')).token);
        } else {
          localStorage.clear();
          this.router.navigate(['/404']);
        }
      }
    });

    /*
    if (!localStorage.getItem('user')){
      this.activatedRoute.queryParams.subscribe(params => {
        this.validateToken(params['token']);
      });
    }
    else {
      this.validateToken(JSON.parse(localStorage.getItem('token')).token);
    }*/
  }
}
