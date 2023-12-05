import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SkillDashboardComponent } from './skill-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: SkillDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkillDashboardRoutingModule {}
