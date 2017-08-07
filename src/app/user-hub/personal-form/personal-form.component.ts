import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PersonalForm} from "./personal-form-model";
import {PersonalFormService} from "./personal-form-service";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {UserHubService} from "../user-hub.service";
import {MdDialog} from "@angular/material";
import {StatusMessageDialogComponent} from "../../status-message/status-message.component";

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.scss'],
  providers: [PersonalFormService, StatusMessageDialogComponent]
})
export class PersonalFormComponent implements OnInit {
  myForm: FormGroup;
  user: any;
  computers = ['Windows', 'Mac'];

  constructor(
    private personalFormService: PersonalFormService,
    private router: Router,
    private dialog: MdDialog
  ) { }

  onSubmit(){
    if (this.myForm.valid) {
      const personalForm = new PersonalForm(
        this.user.id,
        this.myForm.value.firstName,
        this.myForm.value.lastName,
        this.myForm.value.middleInitial,
        this.myForm.value.streetAddress,
        this.myForm.value.apartmentUnit,
        this.myForm.value.city,
        this.myForm.value.state,
        this.myForm.value.zipCode,
        this.myForm.value.homePhone,
        this.myForm.value.altPhone,
        this.myForm.value.birthday,
        this.myForm.value.spouseName,
        this.myForm.value.spouseEmployer,
        this.myForm.value.spouseWorkPhone,
        this.myForm.value.computer);

      this.personalFormService.addPersonalForm(personalForm)
        .subscribe(
          function(response){
            this.openDialog(true, "Your personal information form has been submitted.", "");
            this.router.navigate(['/user', 'home']);
          }.bind(this),
          function(error){
            console.log(error);
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
      firstName: new FormControl({value: this.user.first_name, disabled: true}, Validators.required),
      lastName: new FormControl({value: this.user.last_name, disabled: true}, Validators.required),
      middleInitial: new FormControl(null, null),
      streetAddress: new FormControl(null, Validators.required),
      apartmentUnit: new FormControl(null, null),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      zipCode: new FormControl(null, Validators.required),
      homePhone: new FormControl(null, Validators.required),
      altPhone: new FormControl(null, null),
      birthday: new FormControl(null, Validators.required),
      spouseName: new FormControl(null, null),
      spouseEmployer: new FormControl(null, null),
      spouseWorkPhone: new FormControl(null, null),
      computer: new FormControl(null, Validators.required)
    });


  }

}
