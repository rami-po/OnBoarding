import {Component, Input, OnInit} from '@angular/core';
import {AdminFormService} from "../admin-form.service";
import {User} from "../user.model";

@Component({
  selector: 'app-harvest-information',
  templateUrl: './harvest-information.component.html',
  styleUrls: ['./harvest-information.component.scss']
})
export class HarvestInformationComponent implements OnInit {

  public projects;
  public user: User;

  constructor(
    private formService: AdminFormService
  ) { }

  ngOnInit() {
    this.formService.user.subscribe(
      user => {
        this.user = user;
      }
    );

    this.formService.projects.subscribe(
      projects => {
        this.projects = projects;
      }
    )
  }

  next() {
    this.formService.setProjects(this.projects);
    this.user.setProjects(this.projects.filter(a => a.checked));
    if (this.user.isLetterValid) {
      this.formService.setPage(4);
    } else {
      this.formService.setPage(5);
    }
  }

  updateProject(project, event) {
    project.setChecked(event.checked);
  }

  back() {
    this.formService.setProjects(this.projects);
    this.user.setProjects(this.projects.filter(a => a.checked));
    this.formService.setPage(2);
  }

}
