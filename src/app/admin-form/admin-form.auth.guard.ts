/**
 * Created by Rami Khadder on 7/28/2017.
 */
import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AdminLogInService} from "../admin-log-in/admin-log-in.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class AdminFormAuthGuard implements CanActivate {
  isAuth: boolean = false;
  private test$ = new BehaviorSubject<boolean>(false);
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (sessionStorage.getItem('adminUser')){
      return true;
    }
    this.router.navigate(['/admin']);
    return false;
  }
}
