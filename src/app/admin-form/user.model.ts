import {Project} from "./project.model";
/**
 * Created by Rami Khadder on 7/17/2017.
 */
export class User {
  firstName: string;
  lastName: string;
  personalEmail: string;
  productOpsEmail: string;
  hasHarvest: boolean;
  hasGithub: boolean;
  hasSlack: boolean;
  group: string;
  project: Project;
  startDate: string;

  constructor(firstName: string, lastName: string,
              primaryEmail: string, productOpsEmail: string,
              hasHarvest: boolean, hasGithub: boolean,
              hasSlack: boolean, group: string, project: Project,
              startDate: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.personalEmail = primaryEmail;
    this.productOpsEmail = productOpsEmail;
    this.hasHarvest = hasHarvest;
    this.hasGithub = hasGithub;
    this.hasSlack = hasSlack;
    this.group = group;
    this.project = project;
    this.startDate = startDate;
  }
}
