import { Component, OnInit } from '@angular/core';

import { ChannelEvent, EventChannelService } from '@app/core';

@Component({
  selector: 'app-admin-create-capsule',
  templateUrl: './admin-create-capsule.component.html',
  styleUrls: ['./admin-create-capsule.component.scss'],
})
export class AdminCreateCapsuleComponent implements OnInit {
  constructor(private eventChannel: EventChannelService) {}

  ngOnInit(): void {}

  activateFirstNavTab(): void {
    this.eventChannel.publish({ event: ChannelEvent.SetActiveTab });
  }
}
