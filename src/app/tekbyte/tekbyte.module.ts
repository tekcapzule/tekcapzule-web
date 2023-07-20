import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { TekbyteRoutingModule } from './tekbyte-routing.module';
import { TekbytePageComponent } from './tekbyte-page.component';
import { ExploreTekbyteComponent } from './components/explore-tekbyte/explore-tekbyte.component';
import { TekbyteDetailsComponent } from './components/tekbyte-details/tekbyte-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [TekbytePageComponent, ExploreTekbyteComponent, TekbyteDetailsComponent],
  imports: [CommonModule, SharedModule, FormsModule, MultiSelectModule, TekbyteRoutingModule, MatTabsModule],
})
export class TekbyteModule {}
