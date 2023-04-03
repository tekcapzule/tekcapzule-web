import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth-guard/auth-guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'capsules',
    loadChildren: () => import('./capsules/capsules.module').then(m => m.CapsulesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'topics',
    loadChildren: () => import('./topics/topics.module').then(m => m.TopicsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'community',
    loadChildren: () => import('./community/community.module').then(m => m.CommunityModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'mission',
    loadChildren: () => import('./mission/mission.module').then(m => m.MissionModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'legaldocs',
    loadChildren: () => import('./legal/legal.module').then(m => m.LegalModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  }
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
