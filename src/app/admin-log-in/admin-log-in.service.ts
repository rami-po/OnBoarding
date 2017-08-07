import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class AdminLogInService{
  ID: string;
  isAuth: boolean = false;
  private test$ = new BehaviorSubject<boolean>(false);

  constructor(private http: Http) { }

  logIn(ID: string){
    this.ID = ID;
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://onboarding.productops.com/server/login', ID, {headers: headers})
      .map((response: Response) => {
        this.test$.next(true);
        return response.json();
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getTest(){
    return this.test$;
  }
}
