/**
 * Created by Rami Khadder on 8/9/2017.
 */
import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import {isNullOrUndefined, isUndefined} from 'util';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import * as io from 'socket.io-client';
import {Router} from "@angular/router";

@Injectable()
export class AdminEmployeesService {

  public selectedEmployee =  new BehaviorSubject<any>(null);
  public selectedEmployee$ = this.selectedEmployee.asObservable();

  constructor() {
  }

}
