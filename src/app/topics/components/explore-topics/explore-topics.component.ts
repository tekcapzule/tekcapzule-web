import { AfterViewInit, Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { TopicApiService } from '@app/core';
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

  constructor(private topicApiService: TopicApiService) {}

  ngOnInit(): void {
    this.topicApiService
      .getAllTopics()
      .pipe(take(1))
      .subscribe(topics => {
        this.topics = topics;
        this.allTopics = topics;
      });
  }

  ngAfterViewInit(): void {
    twttr.widgets.load();
  }

  onSearchKeyUp(e){
    const searchVal = (e.target.value);
    this.topics = this.allTopics.filter(topic=> topic.name.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase()))
  }
}
