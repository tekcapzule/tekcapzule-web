import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TekBytePageComponent } from './tek-byte-page.component';


const routes: Routes = [
  {
    path: '',
    component: TekBytePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
