import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserApiService } from '@app/core';
import { TopicItem, UserInfo } from '@app/shared/models';
import { TopicService } from '@app/topics/services/topic.service';

@Component({
  selector: 'app-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrls: ['./topic-card.component.scss'],
})
export class TopicCardComponent implements OnInit {
  @Input() topic!: TopicItem;

  userInfo: UserInfo = null;

  constructor(
    private router: Router,
    private userApi: UserApiService,
    private topicService: TopicService
  ) {}

  ngOnInit(): void {
    this.userInfo = this.userApi.getUserCache();
  }

  gotoTopicDetails(): void {
    this.router.navigate(['topics', 'topicdetails'], {
      state: {
        topic: this.topic,
      },
    });
  }

  isFollowingTopic(): boolean {
    return this.topicService.isFollowingTopic(this.topic.code);
  }

  followTopic(): void {
    this.topicService.followTopic(this.topic.code);
  }

  unfollowTopic(): void {
    this.topicService.unfollowTopic(this.topic.code);
  }
}
