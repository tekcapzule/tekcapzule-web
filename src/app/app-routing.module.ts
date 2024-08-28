import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./product-portfolio/product-portfolio.module').then(m => m.ProductPortfolioModule),
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'contactus',
    loadChildren: () => import('./contactus/contactus.module').then(m => m.ContactusModule),
  },
  {
    path: 'careers',
    loadChildren: () => import('./careers/careers.module').then(m => m.CareersModule),
  },
  {
    path: 'services',
    loadChildren: () => import('./service-portfolio/service-portfolio.module').then(m => m.ServicePortfolioModule),
  },
  {
    path: 'services/:code',
    loadChildren: () => import('./service/service.module').then(m => m.ServiceModule),
  },
  {
    path: 'products/:code',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
  },
  {
    path: 'aboutus',
    loadChildren: () => import('./aboutus/aboutus.module').then(m => m.AboutUsModule),
  },
  {
    path: 'legaldocs',
    loadChildren: () => import('./legal/legal.module').then(m => m.LegalModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
