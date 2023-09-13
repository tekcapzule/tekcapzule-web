import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { CapsuleDetailsComponent } from '@app/capsules/components/capsule-details/capsule-details.component';
import { CourseCardComponent } from '@app/courses/course-card/course-card.component';
import { ProductCardComponent } from '@app/market-place/product-card/product-card.component';
import { CapsuleCardComponent } from './components/capsule-card/capsule-card.component';
import { CapsuleSkeletonComponent } from './components/capsule-skeleton/capsule-skeleton.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { FeedsCardComponent } from './components/feeds-card/feeds-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TopicCardComponent } from './components/topic-card/topic-card.component';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DataTableComponent,
    CapsuleCardComponent,
    TopicCardComponent,
    CarouselComponent,
    SpinnerComponent,
    CapsuleDetailsComponent,
    CourseCardComponent,
    ProductCardComponent,
    CapsuleSkeletonComponent,
    FeedsCardComponent,
    FilterComponent
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
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DataTableComponent,
    CapsuleCardComponent,
    TopicCardComponent,
    CarouselComponent,
    SpinnerComponent,
    CapsuleDetailsComponent,
    CourseCardComponent,
    ProductCardComponent,
    CapsuleSkeletonComponent,
    FeedsCardComponent,
    FilterComponent
  ],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class SharedModule {}
