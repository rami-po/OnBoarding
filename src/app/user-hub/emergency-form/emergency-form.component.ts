import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmergencyFormService} from "./emergency-form.service";
import {EmergencyForm} from "./emergency-form-model";
import {NavigationExtras, Router} from "@angular/router";
import {StatusMessageDialogComponent} from "../../status-message/status-message.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-emergency-form',
  templateUrl: './emergency-form.component.html',
  styleUrls: ['./emergency-form.component.scss'],
  providers: [EmergencyFormService, StatusMessageDialogComponent]
})
export class EmergencyFormComponent implements OnInit {
  myForm: FormGroup;
  user: any;

  constructor(
    private emergencyFormService: EmergencyFormService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  onSubmit(){
    if (this.myForm.valid) {

      const emergencyForm = new EmergencyForm(
        this.user.id,
        this.myForm.value.firstName,
        this.myForm.value.lastName,
        this.myForm.value.middleInitial,
        this.myForm.value.streetAddress,
        this.myForm.value.apartmentUnit,
        this.myForm.value.city,
        this.myForm.value.state,
        this.myForm.value.zipCode,
        this.myForm.value.primaryPhone,
        this.myForm.value.altPhone,
        this.myForm.value.relationship);

      this.emergencyFormService.addEmergencyForm(emergencyForm)
        .subscribe(
          function(response){
            this.openDialog(true, "Your emergency contact form has been submitted.", "");
            this.router.navigate(['/user', 'home']);
          }.bind(this),
          function(error){
            this.openDialog(false, "An error has occurred when submitting.", "Please try again.");
          }.bind(this)
        );

    }
  }

  openDialog(isSuccessful, title, message){
    const dialog = this.dialog.open(StatusMessageDialogComponent);
    if (isSuccessful){
      dialog.componentInstance.title = 'Success!';
      dialog.componentInstance.success = true;
    } else {
      dialog.componentInstance.title = 'Error!';
      dialog.componentInstance.error = true;
    }
    dialog.componentInstance.messages = [title, message];
  }


  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem("user"));

    this.myForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      middleInitial: new FormControl(null, null),
      streetAddress: new FormControl(null, Validators.required),
      apartmentUnit: new FormControl(null, null),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      zipCode: new FormControl(null, Validators.required),
      primaryPhone: new FormControl(null, Validators.required),
      altPhone: new FormControl(null, null),
      relationship: new FormControl(null, null)
    });
  }
}
