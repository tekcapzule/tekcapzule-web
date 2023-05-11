import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { CapsuleCardComponent } from './components/capsule-card/capsule-card.component';
import { TopicCardComponent } from './components/topic-card/topic-card.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CardModule } from './components/card/card.module';


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
    ToastModule,
    CardModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DataTableComponent,
    CapsuleCardComponent,
    TopicCardComponent,
    CarouselComponent,
  ],
  providers: [
    MessageService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SharedModule {}
