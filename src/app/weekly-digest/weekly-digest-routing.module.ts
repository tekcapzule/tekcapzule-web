import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WeeklyDigestComponent } from './weekly-digest.component';

const routes: Routes = [
  {
    path: '',
    component: WeeklyDigestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeeklyDigestRoutingModule {}
