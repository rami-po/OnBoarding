/**
 * Created by Rami Khadder on 8/1/2017.
 */
import {Injectable} from '@angular/core';
import {ActivatedRoute, CanActivate, Router} from '@angular/router';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Location} from '@angular/common';
import {UserHubService} from "./user-hub.service";

@Injectable()
export class UserHubAuthGuard implements CanActivate {
  isAuth: boolean = false;
  private test$ = new BehaviorSubject<boolean>(false);
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private userHubService: UserHubService) {}


  canActivate(): boolean {
    if (localStorage.getItem('user')){
      return true;
    }
    this.router.navigate(['/404']);
    return false;
  }
}
