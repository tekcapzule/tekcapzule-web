import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ChannelEvent, EventChannelService } from '@app/core';

@Component({
  selector: 'app-create-success',
  templateUrl: './create-success.component.html',
  styleUrls: ['./create-success.component.scss'],
})
export class CreateSuccessComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  // activateFirstNavTab(): void {
  //   this.eventChannel.publish({ event: ChannelEvent.SetActiveFeedsTab });
  // }

  navigateToCapsulesPage(): void {
    const queryParamTab = this.route.snapshot.queryParamMap.get('tab') || 'myfeeds';
    this.router.navigate(['capsules', queryParamTab]);
  }
}
