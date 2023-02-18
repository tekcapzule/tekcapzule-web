import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'legaldocs',
    loadChildren: () => import('./legal/legal.module').then(m => m.LegalModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'capsules',
    loadChildren: () => import('./capsules/capsules.module').then(m => m.CapsulesModule),
  },
  {
    path: 'topics',
    loadChildren: () => import('./topics/topics.module').then(m => m.TopicsModule),
  },
  {
    path: 'community',
    loadChildren: () => import('./community/community.module').then(m => m.CommunityModule),
  },
  {
    path: 'mission',
    loadChildren: () => import('./mission/mission.module').then(m => m.MissionModule),
  },
  {
    path: 'tekbyte',
    loadChildren: () => import('./tekbyte/tekbyte.module').then(m => m.TekByteModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
