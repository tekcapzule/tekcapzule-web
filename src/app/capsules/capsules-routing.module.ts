import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CapsulesPageComponent } from './capsules-page.component';
import { CapsuleFeedsComponent } from './components/capsule-feeds/capsule-feeds.component';
import { CapsuleTrendingComponent } from './components/capsule-trending/capsule-trending.component';
import { CreateCapsuleComponent } from './components/create-capsule/create-capsule.component';
import { CreateSuccessComponent } from './components/create-success/create-success.component';
import { EditorsPickComponent } from './components/editors-pick/editors-pick.component';

const routes: Routes = [
  {
    path: '',
    component: CapsulesPageComponent,
    children: [
      {
        path: 'myfeeds',
        component: CapsuleFeedsComponent,
      },
      {
        path: 'trending',
        component: CapsuleTrendingComponent,
      },
      {
        path: 'editorspick',
        component: EditorsPickComponent,
      },
      {
        path: 'create',
        component: CreateCapsuleComponent,
      },
      {
        path: 'congratz',
        component: CreateSuccessComponent,
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
