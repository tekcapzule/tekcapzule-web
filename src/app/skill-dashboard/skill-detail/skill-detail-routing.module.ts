import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillDetailComponent } from './skill-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SkillDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkillDetailRoutingModule {}
