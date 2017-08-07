/**
 * Created by Rami Khadder on 7/28/2017.
 */
import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class UserHubService{
  constructor(private http: Http) { }

  getUser(token: string){
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://onboarding.productops.com/server/user/home', {"token": token}, headers)
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }
}
