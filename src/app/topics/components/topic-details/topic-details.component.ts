import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { CapsuleApiService } from '@app/core';
import { CapsuleItem, TopicItem } from '@app/shared/models';
import { TopicService } from '@app/topics/services/topic.service';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss'],
})
export class TopicDetailsComponent implements OnInit, OnDestroy {
  topic: TopicItem;
  firstThreeCapsules: CapsuleItem[] = [];
  destroy$ = new Subject<boolean>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private capsuleApi: CapsuleApiService,
    private topicService: TopicService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (history?.state?.topic) {
        this.topic = history.state.topic;

        if (this.topic?.capsules.length > 0) {
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
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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
