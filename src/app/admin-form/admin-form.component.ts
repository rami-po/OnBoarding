import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from './user.model';
import {AdminFormService} from './admin-form.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StatusMessageDialogComponent} from "../status-message/status-message.component";
import {MdDialog} from "@angular/material";
import {NavigationExtras, Router} from "@angular/router";
import {Project} from "./project.model";

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css'],
  providers: [AdminFormService, StatusMessageDialogComponent]
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
    { id: 'hasGithub', param: this.hasGithub},
    { id: 'hasSlack', param: this.hasSlack}
  ];

  constructor(
    private formService: AdminFormService,
    private dialog: MdDialog,
    private router: Router
  ) {}

  back(){
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

  onSubmit() {
    console.log(this.myForm.value.project);

    if (this.myForm.valid) {

      console.log("SUBMITTING??");
      this.mode = 'indeterminate';
      console.log(this.myForm);
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
        this.myForm.value.startDate.toDateString());

      this.formService.addUser(user)
        .subscribe(
          function (response) {
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
    this.myForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      personalEmail: new FormControl(null, Validators.required),
      productOpsEmail: new FormControl(null, Validators.required),
      group: new FormControl('Employee', null),
      project: new FormControl(null, null),
      startDate: new FormControl(null, Validators.required)
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

}

