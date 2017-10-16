/**
 * Created by Rami Khadder on 7/28/2017.
 */
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AdminLogInService} from "../admin-log-in/admin-log-in.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AppService} from "../app.service";
import 'rxjs/add/observable/of';


@Injectable()
export class AdminFormAuthGuard implements CanActivate {
  isAuth: boolean = false;
  private test$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router,
              private appService: AppService) {
  }

  canActivate2(): boolean {
    if (sessionStorage.getItem('adminUser')) {
      return true;
    }
    this.router.navigate(['/admin']);
    return false;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('adminToken')) {
      return this.appService.auth(localStorage.getItem('adminToken')).map(e => {
        console.log(e);
        if (e) {
          return true;
        }
      }).catch(() => {
        this.router.navigate(['/admin', 'login']);
        return Observable.of(false);
      });
    } else {
      this.router.navigate(['/admin', 'login']);
      return false;
    }
  }


}
