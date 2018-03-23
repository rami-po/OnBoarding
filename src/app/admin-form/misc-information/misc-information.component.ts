import { Component, OnInit } from '@angular/core';
import {AdminFormService} from "../admin-form.service";
import {User} from "../user.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-misc-information',
  templateUrl: './misc-information.component.html',
  styleUrls: ['./misc-information.component.scss']
})
export class MiscInformationComponent implements OnInit {

  public user: User;
  public doNotSendLetter = false;
  public hasHarvest = false;
  public hasGithub = false;
  public hasSlack = false;
  public startDate;
  public group;
  public startDateError = false;

  constructor(
    private formService: AdminFormService
  ) { }

  ngOnInit() {
    this.formService.user.subscribe(
      user => {
        if (user == null) {
          return;
        }
        this.user = user;
        this.hasHarvest = user.hasHarvest;
        this.hasGithub = user.hasGithub;
        this.hasSlack = user.hasSlack;
        this.doNotSendLetter = !user.isLetterValid;
        this.startDate = user.startDate;
        this.group = user.group;
      }
    );
  }

  next() {
    if (this.startDate != null) {
      this.updateUser();
      if (this.hasHarvest) { // if we're creating a harvest account, go to the harvest page
        this.formService.setPage(3);
      } else if (!this.doNotSendLetter) { // if we're sending a welcome letter, go to the letter page
        this.formService.setPage(4);
      } else { // else go to review
        this.formService.setPage(5);
      }
    } else {
      this.startDateError = true;
    }
  }

  back() {
    this.updateUser();
    this.formService.setPage(1);
  }

  updateStartDateError() {
    this.startDateError = false;
  }

  updateUser() {
    this.user.setGroup(this.group);
    this.user.setStartDate(this.startDate);
    this.user.setHarvest(this.hasHarvest);
    this.user.setGithub(this.hasGithub);
    this.user.setSlack(this.hasSlack);
    this.user.setLetterValidity(!this.doNotSendLetter);
    this.formService.setUser(this.user);
  }

}
