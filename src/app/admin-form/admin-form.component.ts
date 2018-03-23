import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {User} from './user.model';
import {AdminFormService} from './admin-form.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StatusMessageDialogComponent} from "../status-message/status-message.component";
import {MatDialog} from "@angular/material";
import {NavigationExtras, Router} from "@angular/router";
import {Project} from "./project.model";
import {TimelineEventComponent} from "../+timeline/timeline-event";

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css'],
  providers: [StatusMessageDialogComponent]
})
/*
export class AdminFormComponent {
  constructor(private formService: AdminFormService) {}
  @Input() user: User;
  @Output() editClicked = new EventEmitter<string>();
  onEdit() {
    this.editClicked.emit('A new value');
  }
  onSave(firstName: string, lastName: string, personalEmail: string, productOpsEmail: string) {
    const user = new User(firstName, lastName, personalEmail, productOpsEmail);
    this.formService.addUser(user);
  }
}
*/
export class AdminFormComponent implements OnInit, OnDestroy {
  myForm: FormGroup;
  mode = 'indeterminate';
  hasHarvest = false;
  hasGithub = false;
  hasSlack = false;
  public page;

  myQueryParams = [
    {id: 'hasGithub', param: this.hasGithub},
    {id: 'hasSlack', param: this.hasSlack}
  ];

  constructor(private formService: AdminFormService,
              private dialog: MatDialog,
              private router: Router) {
  }

  back() {
    sessionStorage.setItem('form', JSON.stringify(this.myForm.value));
    this.router.navigate(['/admin', 'console']);
    //this.router.navigate(['/create', 'options'], navigationExtras);
  }

  updateHarvest() {
    this.hasHarvest = !this.hasHarvest;
  }

  updateGithub() {
    this.hasGithub = !this.hasGithub;
    console.log('github: ' + this.hasGithub);
  }

  updateSlack() {
    this.hasSlack = !this.hasSlack;
    console.log('slack: ' + this.hasSlack);
  }

  editWelcomeLetter() {
    const dialog = this.dialog.open(TimelineEventComponent);
    dialog.componentInstance.action = 'add';
  }

  onSubmit() {
    console.log(this.myForm.value.project);

    if (this.myForm.valid) {

      console.log("SUBMITTING??");
      this.mode = 'indeterminate';
      console.log(this.myForm);
      const isLetterValid = this.formService.isLetterValid.getValue();
      console.log(isLetterValid);
      const user = new User(
        this.myForm.value.firstName,
        this.myForm.value.lastName,
        this.myForm.value.personalEmail,
        this.myForm.value.productOpsEmail + '@productOps.com',
        this.hasHarvest,
        this.hasGithub,
        this.hasSlack,
        this.myForm.value.group,
        this.myForm.value.project,
        this.myForm.value.startDate.toDateString(),
        isLetterValid,
        isLetterValid ? this.formService.letter.getValue() : null);

      this.formService.addUser(user)
        .subscribe(
          function (response) {
            sessionStorage.removeItem('form');
            this.mode = 'determinate';
            this.openDialog(true, response.title, response.message);
          }.bind(this),
          function (error) {
            this.mode = 'determinate';
            this.openDialog(false, error.title, error.message);
          }.bind(this)
        );
    }
  }

  openDialog(isSuccessful, title, message) {
    const dialog = this.dialog.open(StatusMessageDialogComponent);
    if (isSuccessful) {
      dialog.componentInstance.title = 'Success!';
      dialog.componentInstance.success = true;
    } else {
      dialog.componentInstance.title = 'Error!';
      dialog.componentInstance.error = true;
    }
    dialog.componentInstance.messages = [title, message];
  }

  ngOnInit() {
    this.formService.loading.subscribe(
      loading => {
        if (loading) {
          this.mode = 'indeterminate';
        } else {
          this.mode = 'determinate';
        }
      }
    );

    this.formService.page.subscribe(
      page => {
        this.page = page;
      }
    );

    this.formService.getProjects()
      .subscribe(
        () => {
          this.mode = 'determinate';
        }
      );
  }

  ngOnDestroy() {
    this.formService.setUser(null);
    this.formService.setPage(1);
  }

  saveForm() {
    sessionStorage.setItem('form', JSON.stringify(this.myForm.value));
  }

}

