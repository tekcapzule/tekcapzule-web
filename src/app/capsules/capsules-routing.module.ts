import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CapsulesPageComponent } from './capsules-page.component';
import { CapsuleFeedsComponent } from './components/capsule-feeds/capsule-feeds.component';
import { CreateCapsuleComponent } from './components/create-capsule/create-capsule.component';

const routes: Routes = [
  {
    path: '',
    component: CapsulesPageComponent,
    children: [
      {
        path: 'myfeeds',
        component: CapsuleFeedsComponent,
      },
      {
        path: 'create',
        component: CreateCapsuleComponent,
      },
      {
        path: '',
        redirectTo: 'myfeeds',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'myfeeds',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CapsulesRoutingModule {}
