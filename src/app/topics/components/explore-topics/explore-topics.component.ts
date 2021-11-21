import { AfterViewInit, Component, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs/operators';

import { AppSpinnerService, TopicApiService } from '@app/core';
import { TopicItem } from '@app/shared/models';

declare var twttr: any;

@Component({
  selector: 'app-explore-topics',
  templateUrl: './explore-topics.component.html',
  styleUrls: ['./explore-topics.component.scss'],
})
export class ExploreTopicsComponent implements OnInit, AfterViewInit {
  topics: TopicItem[] = [];
  allTopics: TopicItem[] = [];

  constructor(private topicApi: TopicApiService, private spinner: AppSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();

    this.topicApi
      .getAllTopics()
      .pipe(
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
    try {
      twttr.widgets.load();
    } catch (error) {
      console.error('TwitterWidgetError: ', error);
    }
  }

  onSearchKeyUp(e: Event): void {
    const searchVal = (e.target as HTMLInputElement).value;

    this.topics = this.allTopics.filter(topic =>
      topic.name.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase())
    );
  }
}
