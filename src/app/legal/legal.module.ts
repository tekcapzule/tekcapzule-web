import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LegalRoutingModule } from './legal-routing.module';
import { LegalDocsComponent } from './legal-docs.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import { CookiePolicyComponent } from './components/cookie-policy/cookie-policy.component';

@NgModule({
  declarations: [
    PrivacyPolicyComponent,
    LegalDocsComponent,
    TermsOfServiceComponent,
    CookiePolicyComponent,
  ],
  imports: [CommonModule, RouterModule, LegalRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LegalModule {}
