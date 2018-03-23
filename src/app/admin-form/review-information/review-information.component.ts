import {Component, OnInit} from '@angular/core';
import {AdminFormService} from "../admin-form.service";
import {User} from "../user.model";
import {StatusMessageDialogComponent} from "../../status-message/status-message.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-review-information',
  templateUrl: './review-information.component.html',
  styleUrls: ['./review-information.component.scss']
})
export class ReviewInformationComponent implements OnInit {

  public user: User;
  public projects;

  constructor(private formService: AdminFormService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.formService.user.subscribe(
      user => {
        this.user = user;
      }
    );

    this.formService.projects.subscribe(
      projects => {
        this.projects = projects.filter(a => a.checked);
      }
    );
  }

  back() {
    if (this.user.isLetterValid) {
      this.formService.setPage(4);
    } else if (this.user.hasHarvest) {
      this.formService.setPage(3);
    } else {
      this.formService.setPage(2);
    }
  }

  createAccounts() {
    this.formService.setLoading(true);
    this.formService.addUser(this.user)
      .subscribe(
        function (response) {
          this.openDialog(true, response.title, response.message);
        }.bind(this),
        function (error) {
          this.openDialog(false, error.title, error.message);
        }.bind(this)
      );
  }

  openDialog(isSuccessful, title, message) {
    const dialog = this.dialog.open(StatusMessageDialogComponent);
    if (isSuccessful) {
      this.formService.setLoading(false);
      dialog.componentInstance.title = 'Success!';
      dialog.componentInstance.success = true;
    } else {
      this.formService.setLoading(false);
      dialog.componentInstance.title = 'Error!';
      dialog.componentInstance.error = true;
    }
    dialog.componentInstance.messages = [title, message];
  }

}
