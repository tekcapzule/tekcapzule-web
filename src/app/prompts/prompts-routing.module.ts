import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PromptsComponent } from './prompts.component';

const routes: Routes = [
  {
    path: '',
    component: PromptsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromptsRoutingModule {}
