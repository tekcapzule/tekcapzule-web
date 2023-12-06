import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhatwedoComponent } from './whatwedo.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WhatwedoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhatwedoRoutingModule {}
