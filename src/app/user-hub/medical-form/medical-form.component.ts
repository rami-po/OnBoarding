import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medical-form',
  templateUrl: './medical-form.component.html',
  styleUrls: ['./medical-form.component.scss']
})
export class MedicalFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  open(form: string){
    switch(form){
      case 'Enrollment':
        window.open("./forms/medical_form.pdf", "_blank");
        break;
      case 'Gold':
        window.open("./forms/Summary_of_Benefits_PPO_Gold.pdf", "_blank");
        break;
      case 'Silver':
        window.open("./forms/Summary_of_Benefits_PPO_Silver.pdf", "_blank");
        break;
      case 'HSA':
        window.open("./forms/Summary_of_Benefits_PPO_HSA_2017.pdf", "_blank");
        break;
    }
  }

}
