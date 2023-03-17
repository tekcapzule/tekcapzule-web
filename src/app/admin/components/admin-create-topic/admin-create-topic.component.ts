import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ChannelEvent, EventChannelService, TopicApiService } from '@app/core';

@Component({
  selector: 'app-admin-create-topic',
  templateUrl: './admin-create-topic.component.html',
  styleUrls: ['./admin-create-topic.component.scss'],
})
export class AdminCreateTopicComponent implements OnInit, AfterViewInit {
  topicDetails = {
    code: '',
    title: '',
    imageUrl: '',
    summary: '',
    description: '',
    categories: [],
  };
  isEditMode = false;

  constructor(
    private eventChannel: EventChannelService,
    private topicApi: TopicApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('edittopic')) {
      this.isEditMode = true;
      this.topicApi.getAllTopics().subscribe(allTopics => {
        this.topicDetails = allTopics.find(
          topic => topic.code === this.activatedRoute.snapshot.paramMap.get('topicCode')
        );
      });
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.eventChannel.publish({ event: ChannelEvent.HideAdminNavTabs });
    });
  }

  showAdminNavTabs(): void {
    this.eventChannel.publish({ event: ChannelEvent.ShowAdminNavTabs });
  }

  onSubmit(): void {
    const clearEmptyElementsInArray = (array: string[]) => array.filter(e => e);
    // this.topicDetails.aliases = clearEmptyElementsInArray(this.topicDetails.aliases);
    // this.topicDetails.keyHighlights = clearEmptyElementsInArray(this.topicDetails.keyHighlights);
    // this.topicDetails.capsules = clearEmptyElementsInArray(this.topicDetails.capsules);
    if (this.isEditMode) {
      this.router.navigate(['/admin/capsules']);
      this.topicApi.updateTopic(this.topicDetails).subscribe(res => {
        // console.log(this.topicDetails, res)
      });
    } else {
      this.topicApi.createTopic(this.topicDetails).subscribe(res => {
        // console.log(this.topicDetails, res)
      });
    }

    this.showAdminNavTabs();
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  addRow(rowType): void {
    this.topicDetails[rowType].unshift('');
  }

  deleteRow(rowType, index): void {
    this.topicDetails[rowType].splice(index, 1);
  }

  isFormValid() {
    return this.topicDetails.code && this.topicDetails.description && this.topicDetails.title;
  }

  getDashboardLink() {
    return this.isEditMode ? ['../../capsules'] : ['../capsules'];
  }
}
