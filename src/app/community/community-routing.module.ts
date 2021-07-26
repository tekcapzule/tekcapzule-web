import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityPageComponent } from './community-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CommunityPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityRoutingModule {}
