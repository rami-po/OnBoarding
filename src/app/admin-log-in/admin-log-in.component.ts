import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminLogInService} from "./admin-log-in.service";
import {StatusMessageDialogComponent} from "../status-message/status-message.component";
import {MdDialog} from "@angular/material";
import {NavigationExtras, Router} from "@angular/router";
import {AdminFormAuthGuard} from "../admin-form/admin-form.auth.guard";

@Component({
  selector: 'app-admin-log-in',
  templateUrl: './admin-log-in.component.html',
  styleUrls: ['./admin-log-in.component.scss'],
  providers: [AdminLogInService, StatusMessageDialogComponent]
})
export class AdminLogInComponent implements OnInit {
  myForm: FormGroup;


  constructor(
    private logInService: AdminLogInService,
    private dialog: MdDialog,
    private router: Router
  ) { }

  onLogIn(){
    if (this.myForm.valid) {
      const user = ({
        username: this.myForm.value.username,
        password: this.myForm.value.password
      });

      this.logInService.logIn(JSON.stringify(user))
        .subscribe(
          function(response){
            sessionStorage.setItem('adminUser', JSON.stringify({username: response.user, token: response.token}));
            this.router.navigate(['/admin', 'create']);
          }.bind(this),
          function(error){
            this.openErrorDialog(error.title, error.message);
          }.bind(this)
        );
    }
  }

  openErrorDialog(title, message){
    const dialog = this.dialog.open(StatusMessageDialogComponent);
    dialog.componentInstance.title = 'Error!';
    dialog.componentInstance.messages = [title, message];
    dialog.componentInstance.error = true;
  }

  ngOnInit() {

    this.myForm = new FormGroup({
      username: new FormControl(null, null),
      password: new FormControl(null, null)
    });
  }

}
