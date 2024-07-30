import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Auth } from 'aws-amplify';
import { Observable } from 'rxjs';
import { AuthStateService } from '../app-state/auth-state.service';
import { AuthService } from '../auth/auth.service';


/**
 * Prevent access to routes if access-token is not present.
 * 
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable()
export class AuthGuard {
  constructor(private _router: Router, private authState: AuthStateService,
    private auth: AuthService ) { }

  canActivate(
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

     if(this.authState.isUserLoggedIn()) {
      return true;
     } else {
      this.auth.signInUser();
      return false;
     }
  }
}