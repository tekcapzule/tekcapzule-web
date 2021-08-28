import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AmplifyService } from 'aws-amplify-angular';
import { Hub } from 'aws-amplify';

import { Constants } from '@app/shared/utils/constants';
const idx = (p, o) => p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;
  private userInfo: any = null;
  private loggedInStatusChange = new BehaviorSubject(this.isLoggedIn);

  constructor(private amplify: AmplifyService) {
    this.authenticateUser();

    Hub.listen('auth', data => {
      const { payload } = data;
      this.authEventChanged(payload.event);
    });
  }

  private authEventChanged(authEvent): void {
    if (authEvent === 'signIn') {
      this.authenticateUser();
    } else if (authEvent === 'signOut') {
      this.invalidateUser();
    }
  }

  private invalidateUser(): void {
    this.userInfo = null;
    this.isLoggedIn = false;
    this.loggedInStatusChange.next(this.isLoggedIn);
  }

  private authenticateUser(): void {
    this.amplify
      .auth()
      .currentAuthenticatedUser()
      .then(user => {
        this.userInfo = user;
        this.isLoggedIn = true;
        this.loggedInStatusChange.next(this.isLoggedIn);
      })
      .catch(e => {
        console.log(e);
        this.invalidateUser();
      });
  }

  private getUserGroups(): string[] {
    return idx(['signInUserSession', 'idToken', 'payload', 'cognito:groups'], this.userInfo) || [];
  }

  public onLoggedInStatusChange(): Observable<boolean> {
    return this.loggedInStatusChange.asObservable();
  }

  public getUserInfo(): any {
    return this.userInfo;
  }

  public isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  public signOutUser(): void {
    this.amplify.auth().signOut();
  }

  public isAdminUser(): boolean {
    return this.getUserGroups().includes(Constants.AdminUserGroup);
  }
}
