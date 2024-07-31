import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

import { CourseCardComponent } from '@app/courses/course-card/course-card.component';
import { FeedDetailsComponent } from '@app/feeds/components/feed-details/feed-details.component';
import { ProductCardComponent } from '@app/market-place/product-card/product-card.component';
import { AccordionModule } from 'primeng/accordion';
import { CarouselModule } from 'primeng/carousel';
import { CarouselComponent } from './components/carousel/carousel.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { FeedCardComponent } from './components/feed-card/feed-card.component';
import { FeedSkeletonComponent } from './components/feed-skeleton/feed-skeleton.component';
import { FeedsSkeletonComponent } from './components/feeds-skeleton/feeds-skeleton.component';
import { DataFilterComponent } from './components/data-filter/data-filter.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginRequiredComponent } from './components/login-required/login-required.component';
import { QAComponent } from './components/qa/qa.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TopicCardComponent } from './components/topic-card/topic-card.component';
import { CollaborateFormComponent } from './components/collaborate-form/collaborate-form.component';
import { SkillCardComponent } from './components/skill-card/skill-card.component';
import { SkillSkeletonComponent } from './components/skill-skeleton/skill-skeleton.component';
import { TopicFilterComponent } from './components/topic-filter/topic-filter.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FaqPageComponent } from '@app/faq/faq-page.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DataTableComponent,
    TopicCardComponent,
    CarouselComponent,
    SpinnerComponent,
    FeedDetailsComponent,
    CourseCardComponent,
    ProductCardComponent,
    FeedSkeletonComponent,
    FeedCardComponent,
    DataFilterComponent,
    TopicFilterComponent,
    LoginRequiredComponent,
    FeedsSkeletonComponent,
    QAComponent,
    CollaborateFormComponent,
    SkillCardComponent,
    SkillSkeletonComponent,
    FaqPageComponent
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
    DialogModule,
    CarouselModule,
    AccordionModule,
    ReactiveFormsModule,
    CheckboxModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DataTableComponent,
    FeedCardComponent,
    TopicCardComponent,
    CarouselComponent,
    SpinnerComponent,
    FeedDetailsComponent,
    CourseCardComponent,
    ProductCardComponent,
    FeedSkeletonComponent,
    FeedCardComponent,
    TopicFilterComponent,
    DataFilterComponent,
    LoginRequiredComponent,
    FeedsSkeletonComponent,
    QAComponent,
    CollaborateFormComponent,
    SkillCardComponent,
    SkillSkeletonComponent,
    FaqPageComponent
  ],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class SharedModule {}
