import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsightsPageComponent } from './insights-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: InsightsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsightsRoutingModule {}
