import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MentoringComponent } from './mentoring.component';

const routes: Routes = [
  {
    path: '',
    component: MentoringComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MentoringRoutingModule {}
