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
export class AppService {

  constructor(private http: Http,
              private router: Router) {
  }

  private apiBase = 'http://onboarding.productops.com:3000/resource';

  getProjects(params) {
    return this.http.get(this.apiBase + '/project' + params)
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getProjectAndClient(projectId) {
    return this.http.get(this.apiBase + '/project/' + projectId + '/client')
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getClientsAndProjects() {
    return this.http.get(this.apiBase + '/clients/projects')
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }


  getEmployees(params) {
    return this.http.get(this.apiBase + '/person' + params)
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }


  getClients(params) {
    return this.http.get(this.apiBase + '/client' + params)
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getAssignments(params) {
    return this.http.get(this.apiBase + '/assignment' + params)
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getInfo() {
    return this.http.get('http://onboarding.productops.com/server/user/info')
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  auth(token) {
    console.log('boi');
    const body = JSON.stringify({token: token});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://onboarding/server/user/auth', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }
}
