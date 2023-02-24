import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TekBytePageComponent } from './tekbyte-page.component';
import { TekByteTopicDetailsPageComponent } from './components/tekbyte-topic-details/tekbyte-topic-details.component';

const routes: Routes = [
  {
    path: '',
    component: TekBytePageComponent,
    // children: [
    //   {
    //     path: 'tekbytetopicdetails',
    //     component: TekByteTopicDetailsPageComponent,
    //   },
    //   {
    //     path: '',
    //     redirectTo: 'tekbytetopicdetails',
    //     pathMatch: 'full',
    //   },
    //   {
    //     path: '**',
    //     redirectTo: 'tekbytetopicdetails',
    //   },
    // ],
  },
  {
    path: 'tekbytetopicdetails',
    component: TekByteTopicDetailsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TekbyteRoutingModule {}
