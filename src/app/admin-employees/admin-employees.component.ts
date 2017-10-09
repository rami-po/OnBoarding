import { Component, OnInit } from '@angular/core';
import {AppService} from "../app.service";
import {AdminEmployeesService} from "./admin-employees.service";

@Component({
  selector: 'app-admin-employees',
  templateUrl: './admin-employees.component.html',
  styleUrls: ['./admin-employees.component.scss'],
  providers: [AdminEmployeesService]
})
export class AdminEmployeesComponent implements OnInit {

  public employees;
  public selectedEmployee;

  constructor(
    private appService: AppService,
    private adminService: AdminEmployeesService
  ) { }

  ngOnInit() {


    this.adminService.selectedEmployee$.subscribe(
      selectedEmployee => {
        this.selectedEmployee = selectedEmployee;
      }
    );

    this.appService.getInfo().subscribe(
      employees => {
        this.employees = employees.result;
        console.log(employees);
      }
    );
  }

}
