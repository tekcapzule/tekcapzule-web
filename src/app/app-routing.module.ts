import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth-guard/auth-guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'capsules',
    loadChildren: () => import('./capsules/capsules.module').then(m => m.CapsulesModule)
  },
  {
    path: 'tekbyte',
    loadChildren: () => import('./tekbyte/tekbyte.module').then(m => m.TekbyteModule)
  },
  {
    path: 'community',
    loadChildren: () => import('./community/community.module').then(m => m.CommunityModule)
  },
  {
    path: 'mission',
    loadChildren: () => import('./mission/mission.module').then(m => m.MissionModule)
  },
  {
    path: 'legaldocs',
    loadChildren: () => import('./legal/legal.module').then(m => m.LegalModule)
  },
  {
    path: 'skillstudio',
    loadChildren: () => import('./skill-studio/skill-studio.module').then(m => m.SkillStudioModule)
  },
  {
    path: 'weekly-digest',
    loadChildren: () => import('./weekly-digest/weekly-digest.module').then(m => m.WeeklyDigestModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./events/events.module').then(m => m.EventsModule)
  },
  {
    path: 'market-place',
    loadChildren: () => import('./market-place/market-place.module').then(m => m.MarketPlaceModule)
  },
  {
    path: 'interview-prepartion',
    loadChildren: () => import('./interview-prep/interview-prep.module').then(m => m.InterviewPrepModule)
  },
  {
    path: 'mentoring',
    loadChildren: () => import('./mentoring/mentoring.module').then(m => m.MentoringModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule)
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
