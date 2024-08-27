import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth-guard/auth-guard';
import { FaqPageComponent } from './faq/faq-page.component';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
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
    loadChildren: () => import('./services/services.module').then(m => m.ServicesModule),
  },
  {
    path: 'services/services-categories/:code',
    loadChildren: () => import('./service-categories/service-categories.module').then(m => m.ServiceCategoriesModule),
  },
  {
    path: 'products/product-details/:code',
    loadChildren: () => import('./product-details/product-details.module').then(m => m.ProductDetailsModule),
  },
  {
    path: 'aboutus',
    loadChildren: () => import('./aboutus/aboutus.module').then(m => m.AboutUsModule),
  },
  {
    path: 'legaldocs',
    loadChildren: () => import('./legal/legal.module').then(m => m.LegalModule),
  },
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
