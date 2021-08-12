import { Component, OnInit } from '@angular/core';

import { ChannelEvent, EventChannelService } from '@app/core';

@Component({
  selector: 'app-admin-create-topic',
  templateUrl: './admin-create-topic.component.html',
  styleUrls: ['./admin-create-topic.component.scss'],
})
export class AdminCreateTopicComponent implements OnInit {
  constructor(private eventChannel: EventChannelService) {}

  ngOnInit(): void {}

  activateFirstNavTab(): void {
    this.eventChannel.publish({ event: ChannelEvent.SetActiveTab });
  }
}
