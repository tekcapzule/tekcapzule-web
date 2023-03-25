import { Component, OnInit } from '@angular/core';

import { ChannelEvent, EventChannelService, TopicApiService } from '@app/core';
import { TopicItem } from '@app/shared/models';

@Component({
  selector: 'app-create-capsule',
  templateUrl: './create-capsule.component.html',
  styleUrls: ['./create-capsule.component.scss'],
})
export class CreateCapsuleComponent implements OnInit {
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
