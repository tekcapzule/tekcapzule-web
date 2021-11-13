import { AfterViewInit, Component, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs/operators';

import { AppSpinnerService, TopicApiService } from '@app/core';
import { TopicItem } from '@app/shared';

declare var twttr: any;

@Component({
  selector: 'app-explore-topics',
  templateUrl: './explore-topics.component.html',
  styleUrls: ['./explore-topics.component.scss'],
})
export class ExploreTopicsComponent implements OnInit, AfterViewInit {
  topics: TopicItem[] = [];
  allTopics: TopicItem[] = [];

  constructor(private topicApiService: TopicApiService, private spinner: AppSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();

    this.topicApiService
      .getAllTopics()
      .pipe(
        take(1),
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe(topics => {
        this.topics = topics;
        this.allTopics = topics;
      });
  }

  ngAfterViewInit(): void {
    twttr.widgets.load();
  }

  onSearchKeyUp(e: Event): void {
    const searchVal = (e.target as HTMLInputElement).value;

    this.topics = this.allTopics.filter(topic =>
      topic.name.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase())
    );
  }
}
