import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminFormService} from "../admin-form.service";
import {User} from "../user.model";

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss']
})
export class UserInformationComponent implements OnInit {
  myForm: FormGroup;
  private user;

  constructor(
    private formService: AdminFormService
  ) { }

  ngOnInit() {
    this.formService.user.subscribe(
      user => {
          this.user = user;
      }
    );

    if (this.user == null) {
      this.user = {
        firstName: null,
        lastName: null,
        personalEmail: null,
        productOpsEmail: null
      };
    }

    this.myForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, Validators.required),
      lastName: new FormControl(this.user.lastName, Validators.required),
      personalEmail: new FormControl(this.user.personalEmail, Validators.required),
      productOpsEmail: new FormControl(this.user.productOpsEmail, Validators.required)
    });

  }

  onSubmit() {
    if (this.myForm.valid) {
      const form = this.myForm.value;
      if (this.user.firstName == null) {
        this.formService.setUser(new User(
          form.firstName,
          form.lastName,
          form.personalEmail,
          form.productOpsEmail + '@productOps.com',
          false,
          false,
          false,
          'Employee',
          null,
          null,
          true,
          null
        ));
      } else {
        this.user.setFirstName(form.firstName);
        this.user.setLastName(form.lastName);
        this.user.setPersonalEmail(form.personalEmail);
        this.user.setProductOpsEmail(form.productOpsEmail);
        this.formService.setUser(this.user);
      }
      this.formService.setPage(2);
    }
  }

}
