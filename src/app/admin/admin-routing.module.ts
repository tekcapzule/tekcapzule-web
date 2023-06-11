import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPageComponent } from './admin-page.component';
import { AdminCapsulesComponent } from './components/admin-capsules/admin-capsules.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminFeedbackComponent } from './components/admin-feedback/admin-feedback.component';
import { AdminTopicsComponent } from './components/admin-topics/admin-topics.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
      },
      {
        path: 'capsules',
        component: AdminCapsulesComponent,
      },
      {
        path: 'topics',
        component: AdminTopicsComponent,
      },
      {
        path: 'feedback',
        component: AdminFeedbackComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
