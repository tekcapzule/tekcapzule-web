import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { CommunityRoutingModule } from './community-routing.module';
import { CommunityPageComponent } from './community-page.component';

@NgModule({
  declarations: [CommunityPageComponent],
  imports: [CommonModule, SharedModule, CommunityRoutingModule],
})
export class CommunityModule {}
