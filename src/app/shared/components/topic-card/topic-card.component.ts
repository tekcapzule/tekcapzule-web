import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrls: ['./topic-card.component.scss'],
})
export class TopicCardComponent implements OnInit {
  @Input() topic!: any;

  constructor() {}

  ngOnInit(): void {}
}
