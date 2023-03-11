import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { AppSpinnerService, TopicApiService } from '@app/core';
import { TopicItem } from '@app/shared/models';

@Component({
  selector: 'app-explore-topics',
  templateUrl: './explore-topics.component.html',
  styleUrls: ['./explore-topics.component.scss'],
})
export class ExploreTopicsComponent implements OnInit {
  // topics: TopicItem[] = [];
  // allTopics: TopicItem[] = [];

  constructor(private topicApi: TopicApiService, private spinner: AppSpinnerService) {}

  ngOnInit(): void {
    // this.spinner.show();
    // this.topicApi
    //   .getAllTopics()
    //   .pipe(
    //     finalize(() => {
    //       this.spinner.hide();
    //     })
    //   )
    //   .subscribe(topics => {
    //     this.topics = topics;
    //     this.allTopics = topics;
    //   });
  }

  randomUUID(): string {
    return Math.random().toString(36).slice(2);
  }

  // onSearchKeyUp(e: Event): void {
  //   const searchVal = (e.target as HTMLInputElement).value;

  //   this.topics = this.allTopics.filter(topic =>
  //     topic.name.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase())
  //   );
  // }
}
