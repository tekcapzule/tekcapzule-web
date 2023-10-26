import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CourseApiService } from '@app/core';

import { ICourseDetail } from '@app/shared/models/course-item.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent {
  @Input() course: ICourseDetail

  constructor(private router: Router,
    private courseService: CourseApiService,
    private messageService: MessageService) {}

  onCourseClick(course: ICourseDetail) {
    this.router.navigateByUrl('/ai-hub/course-detail/'+ course.courseId)
  }

  
  onRecommendClick(event) {
    event.stopPropagation();
    this.courseService.updateRecommendCount(this.course.courseId).subscribe(data => {
      this.course.isRecommended = true;
      this.messageService.add({
        key: 'tc',
        severity: 'success',
        detail: 'Thank you for the recommendation!',
      });
    }, err => {
      this.messageService.add({
        key: 'tc',
        severity: 'error',
        detail: 'Please try again later!',
      });
    });
  }
}
