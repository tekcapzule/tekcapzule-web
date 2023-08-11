import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionPageComponent } from './subscription-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SubscriptionPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionRoutingModule {}
