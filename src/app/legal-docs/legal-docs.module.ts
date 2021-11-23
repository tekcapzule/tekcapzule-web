import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { LegalDocsComponent } from './legal-docs.component';
import { RouterModule } from '@angular/router';
import { LegalDocsRoutingModule } from './legal-docs-routing.module';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import { CookiePolicyComponent } from './components/cookie-policy/cookie-policy.component';
// import { LegalDocsComponent } from './legal-docs.component';



@NgModule({
  declarations: [
    PrivacyPolicyComponent,
    LegalDocsComponent,
    TermsOfServiceComponent,
    CookiePolicyComponent,
  ],
  imports: [
    LegalDocsRoutingModule,
    CommonModule,
    RouterModule
  ]
})
export class LegalDocsModule { }
