import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPortfolioComponent } from './product-portfolio.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProductPortfolioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductPortfolioRoutingModule {}
