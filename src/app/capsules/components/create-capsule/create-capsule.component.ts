import { Component, OnInit } from '@angular/core';

import { ChannelEvent, EventChannelService } from '@app/core';

@Component({
  selector: 'app-create-capsule',
  templateUrl: './create-capsule.component.html',
  styleUrls: ['./create-capsule.component.scss'],
})
export class CreateCapsuleComponent implements OnInit {
  constructor(private eventChannel: EventChannelService) {}

  ngOnInit(): void {}

  activateFirstNavTab(): void {
    this.eventChannel.publish({ event: ChannelEvent.SetActiveTab });
  }
}
