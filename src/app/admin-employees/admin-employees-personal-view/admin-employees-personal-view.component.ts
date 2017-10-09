import {Component, Input, OnInit} from '@angular/core';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-admin-employees-personal-view',
  templateUrl: './admin-employees-personal-view.component.html',
  styleUrls: ['./admin-employees-personal-view.component.scss']
})
export class AdminEmployeesPersonalViewComponent implements OnInit {

  @Input() public employee;

  constructor() { }

  ngOnInit() {

  }

  isNorD(item) {
    return isNullOrUndefined(item) || item === 'null';
  }

}
