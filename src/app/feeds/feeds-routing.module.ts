import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeedsPageComponent } from './feeds-page.component';
import { FeedDetailsComponent } from './components/feed-details/feed-details.component';
import { FeedsComponent } from './components/feeds/feeds.component';
import { ContributeFeedComponent } from './components/contribute-feed/contribute-feed.component';
import { CreateSuccessComponent } from './components/create-success/create-success.component';

const routes: Routes = [
  {
    path: '',
    component: FeedsPageComponent,
    children: [
      {
        path: 'myfeeds',
        component: FeedsComponent,
      },
      {
        path: 'contribute',
        component: ContributeFeedComponent,
      },
      {
        path: 'congratz',
        component: CreateSuccessComponent,
      },
      {
        path: ':id/details',
        component: FeedDetailsComponent,
      },
      {
        path: '',
        redirectTo: 'myfeeds',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'myfeeds',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CapsulesRoutingModule {}
