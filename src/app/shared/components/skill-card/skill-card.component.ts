import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppSpinnerService, CourseApiService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';

import { ILearningMaterial } from '@app/shared/models/skill-studio-item.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.scss'],
})
export class SkillCardComponent {
  @Input() learningMt: ILearningMaterial;
  @Input() hostPage: string = 'Skill_Studio';

  constructor(private router: Router,
    private courseService: CourseApiService,
    private messageService: MessageService,
    private helperService: HelperService,
    public spinner: AppSpinnerService) {}

  onLearningClick(learningMt: ILearningMaterial) {
    if(learningMt.learningMaterialType === 'Course') {
      this.router.navigateByUrl('/ai-hub/course-detail/'+ learningMt.learningMaterialId);
    } else if (learningMt.learningMaterialType === 'Tekbyte') {
      this.router.navigateByUrl('/ai-hub/tekbyte/'+ learningMt.learningMaterialId + '/details');
    } else if (learningMt.learningMaterialType === 'Video' || learningMt.learningMaterialType === 'Research Paper'
    || learningMt.learningMaterialType === 'Interview Prep' || learningMt.learningMaterialType === 'Recorded Event'
    || learningMt.learningMaterialType === 'Newsletter') {
      this.onDetailClick(learningMt);
    }
  }

  onDetailClick(learningMt: ILearningMaterial) {
    if (this.helperService.isLocalPublisher(learningMt.publisher)) {
      this.spinner.show();
      sessionStorage.setItem('com.tekcapzule.pageURL', this.router.url);
      sessionStorage.setItem('com.tekcapzule.resourceURL', learningMt.resourceUrl);
      sessionStorage.setItem('com.tekcapzule.title', learningMt.title);
      this.router.navigateByUrl('/ai-hub/' + learningMt.learningMaterialId + '/detail?pageId='+ this.hostPage);
    } else {
      window.open(learningMt.resourceUrl, '_blank');
    }
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
