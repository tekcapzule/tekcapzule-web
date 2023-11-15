import { Component, Input, OnInit } from '@angular/core';
import { IEventItem } from '@app/shared/models';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent implements OnInit {
  @Input() event: IEventItem;
  @Input() isPastEvent:boolean;
  
  constructor() {
  }

  ngOnInit(): void {
  }
}
