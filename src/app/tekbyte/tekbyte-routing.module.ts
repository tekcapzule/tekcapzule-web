import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TekBytePageComponent } from './tekbyte-page.component';
import { TopicDetailsPageComponent } from './components/topic-details/topic-details.component';


const routes: Routes = [
  {
    path: '',
    component: TekBytePageComponent,
    children: [
      {
        path: 'topicdetails',
        component: TopicDetailsPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TekbyteRoutingModule {}
