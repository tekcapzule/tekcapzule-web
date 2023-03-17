import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TopicApiService, UserApiService } from '@app/core';
import { TopicItem, UserInfo } from '@app/shared/models';

@Component({
  selector: 'app-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrls: ['./topic-card.component.scss'],
})
export class TopicCardComponent implements OnInit {
  @Input() topic: TopicItem = null;

  userInfo: UserInfo = null;

  constructor(
    private router: Router,
    private userApi: UserApiService,
    private topicApi: TopicApiService
  ) {}

  ngOnInit(): void {
    // this.userInfo = this.userApi.getUserCache();
  }

  // gotoTopicDetails(): void {
  //   this.router.navigate(['topics', 'topicdetails'], {
  //     state: {
  //       topic: this.topic,
  //     },
  //   });
  // }

  // isFollowingTopic(): boolean {
  //   return this.topicApi.isFollowingTopic(this.topic.code);
  // }

  // followTopic(): void {
  //   this.topicApi.followTopic(this.topic.code);
  // }

  // unfollowTopic(): void {
  //   this.topicApi.unfollowTopic(this.topic.code);
  // }
}
