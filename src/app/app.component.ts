import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, ChannelEvent, EventChannelService } from './core';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';
import { Router } from '@angular/router';
import { Carousel } from 'primeng/carousel';
import { AuthenticatorService } from '@aws-amplify/ui-angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  footerHidden: boolean;
  isLoggedIn: boolean;
  subscription: Subscription[] = [];

  constructor(private eventChannel: EventChannelService,
    public authService: AuthService,
    private router: Router) {
    window.scroll(0, 0);
    //Amplify.configure(awsExports);

    Amplify.configure({
      Auth: {
        // REQUIRED - Amazon Cognito Region
        region: 'us-east-1',
    
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-east-1_JOHxTrcti',
    
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '5mtgs5ki5ispceh9eio0eqbb53',
    
        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: false,
    
        // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
        // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
        signUpVerificationMethod: 'code', // 'code' | 'link'
    
        // OPTIONAL - Configuration for cookie storage
        // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        /*cookieStorage: {
          // REQUIRED - Cookie domain (only required if cookieStorage is provided)
          domain: '.tekcapsule.auth.us-east-1.amazoncognito.com',
          // OPTIONAL - Cookie path
          path: '/',
          // OPTIONAL - Cookie expiration in days
          expires: 365,
          // OPTIONAL - Cookie secure flag
          // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
          secure: true,
        },*/
    
        
        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        //authenticationFlowType: 'USER_PASSWORD_AUTH',
    
        // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
        //clientMetadata: {myCustomKey: 'myCustomValue'},
    
        // OPTIONAL - Hosted UI configuration
        oauth: {
        "domain": "https://tekcapsule.auth.us-east-1.amazoncognito.com",
        scope: [
            'phone',
            'email',
            'profile',
            'openid',
            'aws.cognito.signin.user.admin',
          ],
          redirectSignIn: 'http://localhost:4200/',
          redirectSignOut: 'http://localhost:4200/auth/signin',
          responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
        },
      },
    });
    
    
    Carousel.prototype.onTouchMove = (): void => {};
  }
  
  ngOnInit(): void {
    this.footerStatus();
    this.loggedInStatus();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  footerStatus() {
    const sub = this.eventChannel.getChannel().pipe(
    filter(out => out.event === ChannelEvent.HideAdminNavTabs), takeUntil(this.destroy$))
    .subscribe(() => {
      this.footerHidden = true;
    });
    this.subscription.push(sub);
  }
  
  loggedInStatus() {
    const sub = this.authService.onLoggedInStatusChange().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    this.subscription.push(sub);
  }
}
