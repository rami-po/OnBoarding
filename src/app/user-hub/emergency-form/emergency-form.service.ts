import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {EmergencyForm} from "./emergency-form-model";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class EmergencyFormService {
  emergencyForm: EmergencyForm;

  constructor(private http: Http) { }

  addEmergencyForm(emergencyForm: EmergencyForm){
    this.emergencyForm = emergencyForm;
    const body = JSON.stringify(emergencyForm);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://onboarding.productops.com/server/user/emergency', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }
}
