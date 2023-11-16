import { Component, OnInit } from '@angular/core';

import { ChannelEvent, EventChannelService, TopicApiService } from '@app/core';
import { TopicItem } from '@app/shared/models';

@Component({
  selector: 'app-create-feed',
  templateUrl: './create-feed.component.html',
  styleUrls: ['./create-feed.component.scss'],
})
export class CreateFeedComponent implements OnInit {
  allTopics: TopicItem[] = [];

  constructor(
    private eventChannel: EventChannelService,
    private topicApiService: TopicApiService
  ) {}

  ngOnInit(): void {
    this.topicApiService.getAllTopics().subscribe(topics => (this.allTopics = topics));
  }

  activateFirstNavTab(): void {
    this.eventChannel.publish({ event: ChannelEvent.SetActiveFeedsTab });
  }
}
