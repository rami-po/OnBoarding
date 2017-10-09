import {Component, Input, OnInit} from '@angular/core';
import {AdminEmployeesService} from "../admin-employees.service";

@Component({
  selector: 'app-admin-employees-side-list',
  templateUrl: './admin-employees-side-list.component.html',
  styleUrls: ['./admin-employees-side-list.component.scss']
})
export class AdminEmployeesSideListComponent implements OnInit {

  @Input() public employees;
  private lastEmployee;

  constructor(private adminService: AdminEmployeesService) { }

  ngOnInit() {
  }

  select(employee) {
    if (this.lastEmployee) {
      this.lastEmployee['selected'] = false;
    }
    employee['selected'] = true;
    this.adminService.selectedEmployee.next(employee);
    this.lastEmployee = employee;
  }

}
