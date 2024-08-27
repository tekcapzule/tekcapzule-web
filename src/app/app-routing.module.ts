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
    path: 'feeds',
    loadChildren: () => import('./feeds/feeds.module').then(m => m.FeedsModule),
    canActivate: [AuthGuard]
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
  {
    path: 'faq',
    component: FaqPageComponent
  },
  {
    path: 'subscribe',
    loadChildren: () =>
      import('./subscription/subscription.module').then(m => m.SubscriptionModule),
  },
  {
    path: 'ai-hub/events',
    loadChildren: () => import('./events/events.module').then(m => m.EventsModule),
  },
  {
    path: 'ai-hub/courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
  },
  {
    path: 'skill-dashboard',
    loadChildren: () => import('./skill-dashboard/skill-dashboard.module').then(m => m.SkillDashboardModule),
  },
  {
    path: 'ai-hub/course-detail/:code',
    loadChildren: () =>
      import('./courses/course-detail/course-detail.module').then(m => m.CourseDetailModule),
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
