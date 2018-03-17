import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
export class AdminFormComponent implements OnInit {
  myForm: FormGroup;
  mode = 'indeterminate';
  hasHarvest = false;
  hasGithub = false;
  hasSlack = false;
  projects: Project[];

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
    let form = JSON.parse(sessionStorage.getItem('form'));

    if (form == null) {
      form = {
        firstName: null,
        lastName: null,
        personalEmail: null,
        productOpsEmail: null,
        group: 'Employee',
        project: null,
        startDate: null
      };
    }

    this.myForm = new FormGroup({
      firstName: new FormControl(form.firstName, Validators.required),
      lastName: new FormControl(form.lastName, Validators.required),
      personalEmail: new FormControl(form.personalEmail, Validators.required),
      productOpsEmail: new FormControl(form.productOpsEmail, Validators.required),
      group: new FormControl(form.group, null),
      project: new FormControl(form.project, null),
      startDate: new FormControl(form.startDate != null ? new Date(form.startDate) : null, Validators.required)
    });


    this.formService.getProjects()
      .subscribe(
        (projects: Project[]) => {
          this.mode = 'determinate';
          this.projects = projects.filter(project => project.name !== 'Internal');
          this.projects.sort((a, b) => {
            if (a.name < b.name) return -1;
            else if (a.name > b.name) return 1;
            else return 0;
          });
        }
      );
  }

  saveForm() {
    sessionStorage.setItem('form', JSON.stringify(this.myForm.value));
  }

}

