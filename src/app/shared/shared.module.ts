import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
//import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
//import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatSortModule } from '@angular/material/sort';
//import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { CapsuleCardComponent } from './components/capsule-card/capsule-card.component';
import { TopicCardComponent } from './components/topic-card/topic-card.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DataTableComponent,
    CapsuleCardComponent,
    TopicCardComponent,
    CarouselComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DataTableComponent,
    CapsuleCardComponent,
    TopicCardComponent,
    CarouselComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SharedModule {}
