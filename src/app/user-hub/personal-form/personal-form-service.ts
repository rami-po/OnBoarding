/**
 * Created by Rami Khadder on 7/26/2017.
 */
import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {PersonalForm} from "./personal-form-model";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class PersonalFormService {
  personalForm: PersonalForm;

  constructor(private http: Http) { }

  addPersonalForm(personalForm: PersonalForm){
    this.personalForm = personalForm;
    const body = JSON.stringify(personalForm);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://onboarding.productops.com/server/user/personal', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }
}
