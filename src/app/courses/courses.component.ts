import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppSpinnerService, CourseApiService, TopicApiService } from '@app/core';
import { TopicItem } from '@app/shared/models';
import { ICourseDetail } from '@app/shared/models/course-item.model';
import { shuffleArray } from '@app/shared/utils';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courseList: ICourseDetail[] = [];
  filteredCourseList: ICourseDetail[] = [];
  topics: TopicItem[] = [];
  selectedPayments: any[] = [];
  selectedOS: any[] = [];
  paymentCategories: any[] = [
    { name: 'Free', key: 'FREE' },
    { name: 'Freemium', key: 'FREEMIUM' },
    { name: 'Premium', key: 'PREMIUM' },
    { name: 'Paid', key: 'PAID' }
  ];
  osCategories: any[] = [
    { name: 'Windows', key: 'Windows' },
    { name: 'Mac', key: 'Mac' },
    { name: 'Linux', key: 'linux' }
  ];


  constructor(private spinner: AppSpinnerService,
    private courseApi: CourseApiService,
    private topicApi: TopicApiService,
    private router: Router) {}

  ngOnInit(): void {
    this.spinner.show();
    this.topicApi.getAllTopics().subscribe(topics => {
      this.topics = shuffleArray(topics, 5);      
    });
    this.courseApi.getAllCourse().subscribe(data => {
      this.spinner.hide();
      this.courseList = data;
      this.filteredCourseList = data;
    });
  }

  getTopicName(topicCode: string) {
    return this.topics.find(topic => topic.code === topicCode);
  }

  onPaymentTypeChange(event, key: string) {
    if(event.checked.length && !this.selectedPayments.includes(key)) {
      this.selectedPayments.push(key);
    } else if(event.checked.length === 0) {
      this.selectedPayments = this.selectedPayments.filter(sp => sp !== key);
    }
    this.productFilter();
  }

  productFilter() {
    if(this.selectedPayments.length > 0) {
      this.filteredCourseList = this.courseList.filter(p => this.selectedPayments.includes(p.prizingModel));
    } else {
      this.filteredCourseList = this.courseList;
    }
  }

  onOSChange(value, type) {
    console.log('sdfdsf', value, type);
  }

  onUsedChange(value, type) {
    console.log('sdfdsf', value, type);
  }

  onCourseClick(course: ICourseDetail) {
    this.router.navigateByUrl('/course-detail/'+ course.courseId)
  }

}
