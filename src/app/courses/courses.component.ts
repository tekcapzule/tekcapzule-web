import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  selectedTopic: string[] = [];
  selectedPayments: any[] = [];
  selectedDeliveryMode: any[] = [];
  paymentCategories: any[] = [
    { name: 'Free', key: 'FREE' },
    { name: 'Freemium', key: 'FREEMIUM' },
    { name: 'Premium', key: 'PREMIUM' },
    { name: 'Paid', key: 'PAID' }
  ];
  deliveryMode: any[] = [
    { name: 'Online', key: 'ONLINE' },
    { name: 'Hybrid', key: 'HYBRID' },
    { name: 'In Classroom', key: 'IN_CLASSROOM' }
  ];

  constructor(private spinner: AppSpinnerService,
    private courseApi: CourseApiService,
    private topicApi: TopicApiService,
    private route: ActivatedRoute,
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
    const topic = this.topics.find(topic => topic.code === topicCode);  
    return topic? topic.title : '';
  }

  onCourseClick(course: ICourseDetail) {
    this.router.navigateByUrl('/course-detail/'+ course.courseId)
  }

  onFilterChange(event, key: string, field: string) {
    if(event.checked.length ) {
      this[field].push(key);
    } else if(event.checked.length === 0) {
      this[field] = this[field].filter(sp => sp !== key);
    }
    this.productFilter();
  }

  
  productFilter() {
    let tempList =  [...this.courseList];
    if(this.selectedTopic.length > 0 || this.selectedPayments.length > 0 || this.selectedDeliveryMode.length > 0) {
      if(this.selectedTopic.length) {
        tempList = tempList.filter(course => this.selectedTopic.includes(course.topicCode))
      }
      if(this.selectedPayments.length) {
        tempList = tempList.filter(course => this.selectedPayments.includes(course.prizingModel));
      }
      if(this.selectedDeliveryMode.length > 0) {
        tempList = tempList.filter(course => this.selectedDeliveryMode.includes(course.deliveryMode));
      }
    }
    this.filteredCourseList = tempList;
  }

}
