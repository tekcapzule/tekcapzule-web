import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillStudioComponent } from './skill-studio.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SkillStudioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkillStudioRoutingModule {}
