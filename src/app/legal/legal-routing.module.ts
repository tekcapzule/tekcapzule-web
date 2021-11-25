import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LegalDocsComponent } from './legal-docs.component';
import { CookiePolicyComponent } from './components/cookie-policy/cookie-policy.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';

const routes: Routes = [
  {
    path: '',
    component: LegalDocsComponent,
    children: [
      {
        path: 'privacypolicy',
        component: PrivacyPolicyComponent,
      },
      {
        path: 'termsofservice',
        component: TermsOfServiceComponent,
      },
      {
        path: 'cookiepolicy',
        component: CookiePolicyComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegalRoutingModule {}
