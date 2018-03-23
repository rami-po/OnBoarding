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

  private _page = new BehaviorSubject<any>(1);
  private _user = new BehaviorSubject<User>(null);
  private _projects = new BehaviorSubject<any>(null);
  private _loading = new BehaviorSubject<any>(false);

  public letter = new BehaviorSubject<any>(LETTER);
  letter$ = this.letter.asObservable();

  public isLetterValid = new BehaviorSubject<any>(true);
  isLetterValid$ = this.isLetterValid.asObservable();

  private apiCreateBase = document.location.protocol + '//' + window.location.hostname + '/server/create';

  constructor(private http: Http) {}
  getProjects(){
    console.log(this.apiCreateBase + '/home');
    return this.http.get(this.apiCreateBase + '/home')
      .map((response: Response) => {
        const projects = response.json().obj;
        let activeProjects: Project[] = [];
        for (const project of projects){
          if (project.project.active === true) {
            activeProjects.push(new Project(project.project.id, project.project.name));
          }
        }
        activeProjects.sort((a, b) => {
          if (a.name < b.name) return -1;
          else if (a.name > b.name) return 1;
          else return 0;
        });
        this.setProjects(activeProjects);
        return;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  get loading() {
    return this._loading.asObservable().share();
  }

  setLoading(isLoading) {
    this._loading.next(isLoading);
  }

  get projects() {
    return this._projects.asObservable().share();
  }

  setProjects(projects) {
    this._projects.next(projects);
  }

  get page() {
    return this._page.asObservable().share()
  }

  setPage(page) {
    this._page.next(page);
  }

  get user() {
    return this._user.asObservable().share();
  }

  setUser(user) {
    this._user.next(user);
  }

  addUser(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.apiCreateBase + '/home', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

}
