import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CourseApiService } from '@app/core';

import { ILearningMaterial } from '@app/shared/models/skill-studio-item.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.scss'],
})
export class SkillCardComponent {
  @Input() learningMt: ILearningMaterial;

  constructor(private router: Router,
    private courseService: CourseApiService,
    private messageService: MessageService) {}

  onCourseClick(learningMt: ILearningMaterial) {
    this.router.navigateByUrl('/ai-hub/course-detail/'+ learningMt.learningMaterialId)
  }

  
  onRecommendClick(event) {
    event.stopPropagation();
    this.courseService.updateRecommendCount(this.learningMt.learningMaterialId).subscribe(data => {
      this.learningMt.isRecommended = true;
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
