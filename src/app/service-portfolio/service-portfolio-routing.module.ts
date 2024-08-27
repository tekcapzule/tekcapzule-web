import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicePortfolioComponent } from './service-portfolio.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ServicePortfolioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicePortfolioRoutingModule {}
