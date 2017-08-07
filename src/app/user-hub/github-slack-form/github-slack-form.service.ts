/**
 * Created by Rami Khadder on 7/20/2017.
 */
import {User} from '../../admin-form/user.model';
import {Http, Headers, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GithubSlackFormService {
  constructor(private http: Http) {}
  sendGithubInvite(username: string) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const user = {"username": username};
    console.log(JSON.stringify(user));
    return this.http.post('http://onboarding.productops.com/server/create/options', JSON.stringify(user), {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }
}
