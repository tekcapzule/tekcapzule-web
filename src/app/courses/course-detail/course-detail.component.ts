import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppSpinnerService, CourseApiService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { SkillStudioApiService } from '@app/core/services/skill-studio-api/skill-studio-api.service';
import { ICourseDetail } from '@app/shared/models/course-item.model';
import { ILearningMaterial } from '@app/shared/models/skill-studio-item.model';
import { Constants } from '@app/shared/utils';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  learningMt: ILearningMaterial;
  learningMtList: ILearningMaterial[] = [];
  relatedLearningMt: ILearningMaterial[] = [];
  titleUrl: string[];
  responsiveOptions: any[] = Constants.ResponsiveOptions;
  pageId: string;

  constructor(private spinner: AppSpinnerService,
    private skillApi: SkillStudioApiService,
    private route: ActivatedRoute,
    private helperService: HelperService,
    private router: Router) {
    }

  ngOnInit(): void {
    this.spinner.show();
    // this.titleUrl = [this.helperService.getTileDetails('courses').navUrl];
    this.route.params.subscribe(params => {
      this.pageId = params['pageId'];
      this.getAllLearning(params['code']);
    });
  }

  getAllLearning(learningMaterialId: string) {
    this.skillApi.getAllLearning().subscribe(data => {
      data.forEach(c => {
        c.topicName = this.helperService.getTopicName(c.topicCode)
      });
      this.learningMt = data.find(c => c.learningMaterialId === learningMaterialId);
      this.relatedLearningMt = data.filter(lm =>
        lm.learningMaterialType === 'Course' && lm.topicCode === this.learningMt.topicCode && lm.learningMaterialId !== learningMaterialId
      );
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  onExplore() {
    //window.open(this.product.productDemo.videoUrl, '_blank');
  }
}
