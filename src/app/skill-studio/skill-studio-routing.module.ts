import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillStudioComponent } from './skill-studio.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: SkillStudioComponent,
    children: [
      {
        path: ':id/detail',
        component: DetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkillStudioRoutingModule {}
