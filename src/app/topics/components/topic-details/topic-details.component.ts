import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { CapsuleApiService, UserApiService } from '@app/core';
import { CapsuleItem, TopicItem, UserInfo } from '@app/shared/models';
import { TopicService } from '@app/topics/services/topic.service';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss'],
})
export class TopicDetailsComponent implements OnInit {
  topic: TopicItem;
  firstThreeCapsules: CapsuleItem[] = [];
  userInfo: UserInfo = null;

  constructor(
    private capsuleApi: CapsuleApiService,
    private userApi: UserApiService,
    private topicService: TopicService
  ) {}

  ngOnInit(): void {
    this.topic = history.state.topic;
    this.userInfo = this.userApi.getUserCache();

    if (this.topic && this.topic.capsules.length > 0) {
      const threeCapsuleIds = this.topic.capsules.slice(0, 3);
      const capsuleItems$: Observable<any>[] = [];

      threeCapsuleIds.forEach(capsuleId => {
        capsuleItems$.push(this.capsuleApi.getCapsuleById(capsuleId));
      });

      forkJoin(capsuleItems$).subscribe(data => {
        this.firstThreeCapsules = data;
      });
    }
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
