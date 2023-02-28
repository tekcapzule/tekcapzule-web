import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ChannelEvent, EventChannelService, TopicApiService } from '@app/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-admin-create-topic',
  templateUrl: './admin-create-topic.component.html',
  styleUrls: ['./admin-create-topic.component.scss'],
})
export class AdminCreateTopicComponent implements OnInit {
  topicDetails = {
    code: '',
    category: '',
    name: '',
    description: '',
    imageUrl: '',
    aliases: ['', ''],
    keyHighlights: ['', ''],
    capsules: ['', ''],
  };
  isEditMode = false;

  constructor(
    private eventChannel: EventChannelService,
    private topicApi: TopicApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('edittopic')) {
      this.isEditMode = true;
      this.topicApi.getAllTopics().subscribe(allTopics => {
        this.topicDetails = allTopics.find(
          topic => topic.code === this.route.snapshot.paramMap.get('topicCode')
        );
      });
    }
  }

  activateFirstNavTab(): void {
    this.eventChannel.publish({ event: ChannelEvent.SetActiveAdminTab });
  }

  onSubmit(): void {
    const clearEmptyElementsInArray = (array: string[]) => array.filter(e => e);
    this.topicDetails.aliases = clearEmptyElementsInArray(this.topicDetails.aliases);
    this.topicDetails.keyHighlights = clearEmptyElementsInArray(this.topicDetails.keyHighlights);
    this.topicDetails.capsules = clearEmptyElementsInArray(this.topicDetails.capsules);
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
    this.activateFirstNavTab();
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
    return (
      this.topicDetails.category &&
      this.topicDetails.code &&
      this.topicDetails.description &&
      this.topicDetails.name
    );
  }

  getDashboardLink() {
    return this.isEditMode ? ['../../capsules'] : ['../capsules'];
  }
}
