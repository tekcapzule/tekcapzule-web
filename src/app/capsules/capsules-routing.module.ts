import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CapsulesPageComponent } from './capsules-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CapsulesPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapsulesRoutingModule { }
