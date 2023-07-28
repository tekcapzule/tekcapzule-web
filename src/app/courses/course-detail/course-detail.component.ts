import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppSpinnerService, CourseApiService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { ICourseDetail } from '@app/shared/models/course-item.model';
import { Constants } from '@app/shared/utils';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  courseDetail: ICourseDetail;
  courseList: ICourseDetail[] = [];
  relatedCourseList: ICourseDetail[] = [];
  titleUrl: string[];
  responsiveOptions: any[] = Constants.ResponsiveOptions;
  
  constructor(private spinner: AppSpinnerService,
    private courseApi: CourseApiService,
    private route: ActivatedRoute,
    private helperService: HelperService,
    private router: Router) {
    }

  ngOnInit(): void {
    this.spinner.show();
    this.titleUrl = [this.helperService.getTileDetails('courses').navUrl];
    this.route.params.subscribe(params => {
      this.getAllCourses(params['code']);
    });
  }

  getAllCourses(code: string) {
    this.courseApi.getAllCourse().subscribe(data => {
      data.forEach(c => {
        c.topicName = this.helperService.getTopicName(c.topicCode)
      });
      this.courseDetail = data.find(c => c.courseId === code);
      this.relatedCourseList = data.filter(c => c.topicCode === this.courseDetail.topicCode && c.courseId !== this.courseDetail.courseId);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  onExplore() {
    //window.open(this.product.productDemo.videoUrl, '_blank');
  }
}
