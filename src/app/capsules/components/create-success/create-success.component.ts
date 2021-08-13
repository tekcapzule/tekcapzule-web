import { Component, OnInit } from '@angular/core';

import { ChannelEvent, EventChannelService } from '@app/core';

@Component({
  selector: 'app-create-success',
  templateUrl: './create-success.component.html',
  styleUrls: ['./create-success.component.scss'],
})
export class CreateSuccessComponent implements OnInit {
  constructor(private eventChannel: EventChannelService) {}

  ngOnInit(): void {}

  activateFirstNavTab(): void {
    this.eventChannel.publish({ event: ChannelEvent.SetActiveTab });
  }
}
