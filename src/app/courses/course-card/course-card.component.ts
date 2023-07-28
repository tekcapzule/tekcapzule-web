import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ICourseDetail } from '@app/shared/models/course-item.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent {
  @Input() course: ICourseDetail

  constructor(private router: Router) {}

  onCourseClick(course: ICourseDetail) {
    this.router.navigateByUrl('/ai-hub/course-detail/'+ course.courseId)
  }
}
