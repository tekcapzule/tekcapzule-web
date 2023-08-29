import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AwsUserInfo } from '@app/core';
import { BaseStateService } from './base-state.service';

interface AuthState {
  isLoggedIn: boolean;
  awsUserInfo: AwsUserInfo;
  accessToken: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  awsUserInfo: null,
  accessToken: null,
};

@Injectable({
  providedIn: 'root',
})
export class AuthStateService extends BaseStateService<AuthState> {
  isLoggedIn$: Observable<boolean> = this.select(state => state.isLoggedIn);
  awsUserInfo$: Observable<AwsUserInfo> = this.select(state => state.awsUserInfo);

  constructor() {
    super(initialState);
  }

  public isUserLoggedIn(): boolean {
    return this.state.isLoggedIn;
  }

  public getAwsUserInfo(): AwsUserInfo {
    return this.state.awsUserInfo;
  }

  public getAccessToken(): string {
    return this.state.accessToken;
  }

  public setUserLoggedIn(isLoggedIn: boolean): void {
    this.setState({ isLoggedIn });
  }

  public setAwsUserInfo(awsUserInfo: AwsUserInfo): void {
    this.setState({ awsUserInfo });
  }

  public setAccessToken(accessToken: string): void {
    this.setState({ accessToken });
  }
}
