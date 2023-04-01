import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthPageComponent } from './auth-page.component';
import { SigninComponent } from './components/signin/signin.component';

@NgModule({
  declarations: [AuthPageComponent, SigninComponent],
  imports: [CommonModule, AmplifyAuthenticatorModule, AuthRoutingModule],
  providers: [AuthenticatorService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AuthModule {}
