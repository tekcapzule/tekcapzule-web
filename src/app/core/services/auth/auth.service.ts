import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '@env/environment';
import { AuthStateService } from '../app-state/auth-state.service';
import { Router } from '@angular/router';
import { HelperService } from '@app/core/services/common/helper.service';
import { TekUserInfo, TekUserInfoImpl } from '@app/shared/models';
import { UserApiService } from '@app/core/services/user-api/user-api.service';

const AWS_COGNITO_OAUTH_ID_TOKEN_KEY = 'com.tekcapulse.aws.cognito.oauth.id.token';
const AWS_COGNITO_OAUTH_ACCESS_TOKEN_KEY = 'com.tekcapulse.aws.cognito.oauth.access.token';
const AWS_COGNITO_OAUTH_REFRESH_TOKEN_KEY = 'com.tekcapulse.aws.cognito.oauth.refresh.token';
const AWS_COGNITO_OAUTH_TOKEN_EXPIRY_KEY = 'com.tekcapulse.aws.cognito.oauth.token.expiry';
const AWS_COGNITO_OAUTH_SIGNEDIN_USER_INFO_KEY =
  'com.tekcapulse.aws.cognito.oauth.signedin.user.info';
const AWS_COGNITO_OAUTH_LAST_SIGNEDIN_USER_SUB_KEY =
  'com.tekcapulse.aws.cognito.oauth.last.signedin.user.sub';

export interface OAuthTokenInfo {
  id_token: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface AwsUserInfo {
  sub: string;
  username: string;
  given_name: string;
  family_name: string;
  email: string;
  email_verified: string;
  phone_number: string;
  phone_number_verified: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usedCodeGrandFlowUrls: { [key: string]: boolean } = {};

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private authState: AuthStateService,
    private helperService: HelperService,
    private userApi: UserApiService
  ) {
    this.handleAwsCognitoCodeGrandFlow();
  }

  private getAwsCognitoLoginApi(): string {
    const loginApi = new URL(`${environment.awsCognitoConfigs.domain}/login`);
    loginApi.searchParams.append('response_type', 'code');
    loginApi.searchParams.append('client_id', environment.awsCognitoConfigs.clientId);
    loginApi.searchParams.append('redirect_uri', environment.awsCognitoConfigs.redirectUri);
    return loginApi.toString();
  }

  private getAwsCognitoLogoutApi(): string {
    const logoutApi = new URL(`${environment.awsCognitoConfigs.domain}/logout`);
    logoutApi.searchParams.append('client_id', environment.awsCognitoConfigs.clientId);
    logoutApi.searchParams.append('logout_uri', environment.awsCognitoConfigs.redirectUri);
    return logoutApi.toString();
  }

  public signInUser(): void {
    window.location.assign(this.getAwsCognitoLoginApi());
  }

  public signOutUser(): void {
    window.location.assign(this.getAwsCognitoLogoutApi());
    this.clearAwsCognitoOAuthDataFromLocalStorage();
    this.authState.setUserLoggedIn(false);
    this.authState.setAwsUserInfo(null);
    this.userApi.deleteTekUserInfoCache();
  }

  public getAwsUserInfo(): AwsUserInfo {
    return this.authState.getAwsUserInfo();
  }

  public isUserLoggedIn(): boolean {
    return this.authState.isUserLoggedIn();
  }

  private getStoredUserInfo(): string | null {
    return window.localStorage.getItem(AWS_COGNITO_OAUTH_SIGNEDIN_USER_INFO_KEY);
  }

  private getStoredAccessToken(): string | null {
    return window.localStorage.getItem(AWS_COGNITO_OAUTH_ACCESS_TOKEN_KEY);
  }

  private handleAwsCognitoCodeGrandFlow(): void {
    if (window.location) {
      const url = new URL(window.location.href);
      const code = url.searchParams.get('code');

      if (this.usedCodeGrandFlowUrls[url.toString()]) {
        return;
      }

      if (code) {
        this.usedCodeGrandFlowUrls[url.toString()] = true;
        this.fetchAwsCognitoOAuthToken(code);
      } else {
        const userInfo = this.getStoredUserInfo();
        const accessToken = this.getStoredAccessToken();

        if (userInfo && accessToken) {
          this.authState.setUserLoggedIn(true);
          this.authState.setAccessToken(accessToken);
          this.authState.setAwsUserInfo(JSON.parse(userInfo));
        }
      }
    }
  }

  private fetchAwsCognitoOAuthToken(code: string): void {
    const tokenApi = new URL(`${environment.awsCognitoConfigs.domain}/oauth2/token`);
    const authHeaderEncoded = btoa(
      `${environment.awsCognitoConfigs.clientId}:${environment.awsCognitoConfigs.clientSecret}`
    );
    const httHeaders = new HttpHeaders()
      .set('Authorization', `Basic ${authHeaderEncoded}`)
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const httpParams = new HttpParams()
      .set('code', code)
      .set('grant_type', 'authorization_code')
      .set('client_id', environment.awsCognitoConfigs.clientId)
      .set('redirect_uri', environment.awsCognitoConfigs.redirectUri);

    this.httpClient
      .post<OAuthTokenInfo>(tokenApi.toString(), httpParams.toString(), {
        headers: httHeaders,
      })
      .subscribe(data => {
        this.fetchAwsCognitoOAuthUserInfo(data);
        this.saveAwsCognitoOAuthTokensToLocalStorage(data);
      });

    if (window.history) {
      window.history.replaceState({}, null, environment.awsCognitoConfigs.redirectUri);
    }
  }

  private fetchAwsCognitoOAuthUserInfo(resp: OAuthTokenInfo): void {
    const awsOAuthUserInfoUrl = new URL(`${environment.awsCognitoConfigs.domain}/oauth2/userInfo`);

    this.httpClient
      .get<AwsUserInfo>(awsOAuthUserInfoUrl.toString(), {
        headers: new HttpHeaders().set('Authorization', `Bearer ${resp.access_token}`),
      })
      .subscribe(user => {
        this.authState.setUserLoggedIn(true);
        this.authState.setAwsUserInfo(user);
        this.authState.setAccessToken(resp.access_token);
        this.saveAwsCognitoOAuthUserInfoToLocalStorage(user);
        this.router.navigate([this.helperService.findPage('My_Feeds').navUrl]);
      });
  }

  private saveTekUserInfo(awsUserInfo: AwsUserInfo): void {
    const tekUserInfo: TekUserInfo = new TekUserInfoImpl(awsUserInfo);
    this.userApi.createTekUserInfo(tekUserInfo);
  }

  private saveAwsCognitoOAuthTokensToLocalStorage(data: OAuthTokenInfo): void {
    window.localStorage.setItem(AWS_COGNITO_OAUTH_ID_TOKEN_KEY, data.id_token);
    window.localStorage.setItem(AWS_COGNITO_OAUTH_ACCESS_TOKEN_KEY, data.access_token);
    window.localStorage.setItem(AWS_COGNITO_OAUTH_REFRESH_TOKEN_KEY, data.refresh_token);
    window.localStorage.setItem(AWS_COGNITO_OAUTH_TOKEN_EXPIRY_KEY, data.expires_in.toString());
  }

  private saveAwsCognitoOAuthUserInfoToLocalStorage(user: AwsUserInfo): void {
    window.localStorage.setItem(AWS_COGNITO_OAUTH_SIGNEDIN_USER_INFO_KEY, JSON.stringify(user));
    window.localStorage.setItem(AWS_COGNITO_OAUTH_LAST_SIGNEDIN_USER_SUB_KEY, user.sub);
  }

  private clearAwsCognitoOAuthDataFromLocalStorage(): void {
    window.localStorage.removeItem(AWS_COGNITO_OAUTH_ID_TOKEN_KEY);
    window.localStorage.removeItem(AWS_COGNITO_OAUTH_ACCESS_TOKEN_KEY);
    window.localStorage.removeItem(AWS_COGNITO_OAUTH_REFRESH_TOKEN_KEY);
    window.localStorage.removeItem(AWS_COGNITO_OAUTH_TOKEN_EXPIRY_KEY);
    window.localStorage.removeItem(AWS_COGNITO_OAUTH_SIGNEDIN_USER_INFO_KEY);
    window.localStorage.removeItem(AWS_COGNITO_OAUTH_LAST_SIGNEDIN_USER_SUB_KEY);
  }
}
