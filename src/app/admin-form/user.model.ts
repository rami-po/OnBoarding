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
  projects: Project[];
  startDate: string;
  isLetterValid: boolean;
  letter: string;

  constructor(firstName: string, lastName: string,
              primaryEmail: string, productOpsEmail: string,
              hasHarvest: boolean, hasGithub: boolean,
              hasSlack: boolean, group: string, projects: Project[],
              startDate: string, isLetterValid: boolean, letter: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.personalEmail = primaryEmail;
    this.productOpsEmail = productOpsEmail;
    this.hasHarvest = hasHarvest;
    this.hasGithub = hasGithub;
    this.hasSlack = hasSlack;
    this.group = group;
    this.projects = projects;
    this.startDate = startDate;
    this.isLetterValid = isLetterValid;
    this.letter = letter;
  }

  setFirstName(firstName) {
    this.firstName = firstName;
  }

  setLastName(lastName) {
    this.lastName = lastName;
  }

  setPersonalEmail(personalEmail) {
    this.personalEmail = personalEmail;
  }

  setProductOpsEmail(productOpsEmail) {
    this.productOpsEmail = productOpsEmail;
  }

  setHarvest(hasHarvest) {
    this.hasHarvest = hasHarvest;
  }

  setGithub(hasGithub) {
    this.hasGithub = hasGithub;
  }

  setSlack(hasSlack) {
    this.hasSlack = hasSlack;
  }

  setGroup(group) {
    this.group = group;
  }

  setProjects(projects) {
    this.projects = projects;
  }

  setStartDate(startDate) {
    this.startDate = startDate;
  }

  setLetterValidity(isLetterValid) {
    this.isLetterValid = isLetterValid;
  }

  setLetter(letter) {
    this.letter = letter;
  }
}
