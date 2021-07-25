import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TopicsPageComponent } from './topics-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TopicsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicsRoutingModule { }
