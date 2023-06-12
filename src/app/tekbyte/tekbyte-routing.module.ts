import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreTopicsComponent } from './components/explore-topics/explore-topics.component';
import { TekbyteDetailsComponent } from './components/tekbyte-details/tekbyte-details.component';

import { TekbytePageComponent } from './tekbyte-page.component';

const routes: Routes = [
  {
    path: '',
    component: TekbytePageComponent,
    children: [
      {
        path: 'explore',
        component: ExploreTopicsComponent,
      },
      {
        path: ':code/details',
        component: TekbyteDetailsComponent,
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
export class TekbyteRoutingModule {}
