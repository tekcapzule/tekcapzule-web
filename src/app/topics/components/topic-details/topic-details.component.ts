import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { CapsuleItem, TopicItem } from '@app/shared/models';
import { CapsuleApiService } from '@app/core';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss'],
})
export class TopicDetailsComponent implements OnInit {
  topic: TopicItem;
  firstThreeCapsules: CapsuleItem[] = [];

  constructor(private capsuleApiService: CapsuleApiService) {}

  ngOnInit(): void {
    this.topic = history.state.topic;

    if (this.topic && this.topic.capsules.length > 0) {
      const threeCapsuleIds = this.topic.capsules.slice(0, 3);
      const capsuleItems$: Observable<any>[] = [];

      threeCapsuleIds.forEach(capsuleId => {
        capsuleItems$.push(this.capsuleApiService.getCapsuleById(capsuleId));
      });

      forkJoin(capsuleItems$).subscribe(data => {
        this.firstThreeCapsules = data;
      });
    }
  }
}
