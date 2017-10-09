import {Component, Input, OnInit} from '@angular/core';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-admin-employees-emergency-view',
  templateUrl: './admin-employees-emergency-view.component.html',
  styleUrls: ['./admin-employees-emergency-view.component.scss']
})
export class AdminEmployeesEmergencyViewComponent implements OnInit {

  @Input() public employee;
  public middleInitial;

  constructor() { }

  ngOnInit() {
    if (this.employee) {
      this.middleInitial = (!isNullOrUndefined(this.employee.middle_initial) ? this.employee.middle_initial + ' ' : '');
    }
  }

  isNorD(item) {
    return isNullOrUndefined(item) || item === 'null';
  }

}
