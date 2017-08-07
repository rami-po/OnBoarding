import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dental-form',
  templateUrl: './dental-form.component.html',
  styleUrls: ['./dental-form.component.scss']
})
export class DentalFormComponent implements OnInit {

  constructor() { }

  open(){
    window.open("./forms/dental_form.pdf", "_blank");
  }

  ngOnInit() {
  }

}
