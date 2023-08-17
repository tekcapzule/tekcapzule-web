import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth-guard/auth-guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'capsules',
    loadChildren: () => import('./capsules/capsules.module').then(m => m.CapsulesModule),
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
    path: 'legaldocs',
    loadChildren: () => import('./legal/legal.module').then(m => m.LegalModule),
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule),
  },
  {
    path: 'subscribe',
    loadChildren: () =>
      import('./subscription/subscription.module').then(m => m.SubscriptionModule),
  },
  {
    path: 'insights',
    loadChildren: () => import('./insights/insights.module').then(m => m.InsightsModule),
  },
  {
    path: 'llm-hub',
    loadChildren: () => import('./llm-hub/llm-hub.module').then(m => m.LlmHubModule),
  },
  {
    path: 'ai-hub',
    loadChildren: () => import('./skill-studio/skill-studio.module').then(m => m.SkillStudioModule),
  },
  {
    path: 'ai-hub/tekbyte',
    loadChildren: () => import('./tekbyte/tekbyte.module').then(m => m.TekbyteModule),
  },
  {
    path: 'ai-hub/weekly-digest',
    loadChildren: () =>
      import('./weekly-digest/weekly-digest.module').then(m => m.WeeklyDigestModule),
  },
  {
    path: 'ai-hub/events',
    loadChildren: () => import('./events/events.module').then(m => m.EventsModule),
  },
  {
    path: 'market-place',
    loadChildren: () => import('./market-place/market-place.module').then(m => m.MarketPlaceModule),
  },
  {
    path: 'ai-hub/interview-prepartion',
    loadChildren: () =>
      import('./interview-prep/interview-prep.module').then(m => m.InterviewPrepModule),
  },
  // {
  //   path: 'ai-hub/mentoring',
  //   loadChildren: () => import('./mentoring/mentoring.module').then(m => m.MentoringModule),
  // },
  {
    path: 'ai-hub/courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
  },
  {
    path: 'ai-hub/product-detail/:code',
    loadChildren: () =>
      import('./market-place/product-detail/product-detail.module').then(
        m => m.ProductDetailModule
      ),
  },
  {
    path: 'ai-hub/course-detail/:code',
    loadChildren: () =>
      import('./courses/course-detail/course-detail.module').then(m => m.CourseDetailModule),
  },
  {
    path: 'ai-hub/prompts',
    loadChildren: () => import('./prompts/prompts.module').then(m => m.PromptsModule),
  },
  {
    path: 'ai-hub/video-library',
    loadChildren: () =>
      import('./video-library/video-library.module').then(m => m.VideoLibraryModule),
  },
  {
    path: 'ai-hub/research-papers',
    loadChildren: () =>
      import('./research-papers/research-papers.module').then(m => m.ResearchPapersModule),
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
