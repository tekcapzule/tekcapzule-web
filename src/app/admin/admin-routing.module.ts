import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPageComponent } from './admin-page.component';
import { AdminCapsulesComponent } from './components/admin-capsules/admin-capsules.component';
import { AdminCreateCapsuleComponent } from './components/admin-create-capsule/admin-create-capsule.component';
import { AdminCreateQuestionsComponent } from './components/admin-create-questions/admin-create-questions.component';
import { AdminCreateTopicComponent } from './components/admin-create-topic/admin-create-topic.component';
import { AdminFeedbackComponent } from './components/admin-feedback/admin-feedback.component';
import { AdminTopicsComponent } from './components/admin-topics/admin-topics.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      {
        path: 'capsules',
        component: AdminCapsulesComponent,
      },
      {
        path: 'topics',
        component: AdminTopicsComponent,
      },
      {
        path: 'feedback',
        component: AdminFeedbackComponent,
      },
      {
        path: 'createcapsule',
        component: AdminCreateCapsuleComponent,
      },
      {
        path: 'createquestions',
        component: AdminCreateQuestionsComponent,
      },
      {
        path: 'createtopic',
        component: AdminCreateTopicComponent,
      },
      {
        path: 'edittopic/:topicCode',
        component: AdminCreateTopicComponent,
      },
      {
        path: '',
        redirectTo: 'capsules',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'capsules',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
