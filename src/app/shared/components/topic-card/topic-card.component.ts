import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TopicItem } from '@app/shared/models';

@Component({
  selector: 'app-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrls: ['./topic-card.component.scss'],
})
export class TopicCardComponent implements OnInit {
  @Input() topic!: TopicItem;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  gotoTopicDetails(): void {
    this.router.navigate(['topics', 'topicdetails'], {
      state: {
        topic: this.topic,
      },
    });
  }
}
