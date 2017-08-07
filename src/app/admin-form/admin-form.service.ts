import {User} from './user.model';
import {Project} from './project.model';
import {Http, Headers, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AdminFormService {
  user: User;
  constructor(private http: Http) {}
  getProjects(){
    return this.http.get('http://onboarding.productops.com/server/create/home')
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
  return this.http.post('http://onboarding.productops.com/server/create/home', body, {headers: headers})
    .map((response: Response) => response.json())
    .catch((error: Response) => Observable.throw(error.json()));
}
  getUser() {
    return this.user;
  }
}
