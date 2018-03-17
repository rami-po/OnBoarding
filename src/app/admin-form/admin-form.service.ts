import {User} from './user.model';
import {Project} from './project.model';
import {Http, Headers, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import { LETTER } from '../consts'
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class AdminFormService {

  public letter = new BehaviorSubject<any>(LETTER);
  letter$ = this.letter.asObservable();

  public isLetterValid = new BehaviorSubject<any>(true);
  isLetterValid$ = this.isLetterValid.asObservable();

  private apiCreateBase = document.location.protocol + '//' + window.location.hostname + '/server/create';

  user: User;
  constructor(private http: Http) {}
  getProjects(){
    console.log(this.apiCreateBase + '/home');
    return this.http.get(this.apiCreateBase + '/home')
      .map((response: Response) => {
        const projects = response.json().obj;
        let activeProjects: Project[] = [];
        for (let project of projects){
          if (project.project.active === true) {
            activeProjects.push(new Project(project.project.id, project.project.name));
          }
        }
        return activeProjects;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  addUser(user: User) {
    this.user = user;
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.apiCreateBase + '/home', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }
  getUser() {
    return this.user;
  }
}
