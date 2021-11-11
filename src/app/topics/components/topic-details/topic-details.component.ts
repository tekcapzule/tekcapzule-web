import { Component, OnInit } from '@angular/core';

import { TopicItem } from '@app/shared';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss'],
})
export class TopicDetailsComponent implements OnInit {
  topic: TopicItem;

  constructor() {}

  ngOnInit(): void {
    this.topic = history.state.topic;
  }
}
