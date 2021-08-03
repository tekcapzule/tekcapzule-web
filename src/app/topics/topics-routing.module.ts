import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreTopicsComponent } from './components/explore-topics/explore-topics.component';
import { TopicDetailsComponent } from './components/topic-details/topic-details.component';

import { TopicsPageComponent } from './topics-page.component';

const routes: Routes = [
  {
    path: '',
    component: TopicsPageComponent,
    children: [
      {
        path: 'explore',
        component: ExploreTopicsComponent,
      },
      {
        path: 'topicdetails',
        component: TopicDetailsComponent,
      },
      {
        path: '',
        redirectTo: 'explore',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'explore',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicsRoutingModule {}
