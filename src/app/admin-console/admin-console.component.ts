import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.scss']
})
export class AdminConsoleComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goto(route) {
    this.router.navigate(['/admin', route]);
  }

}
