import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ChannelEvent, EventChannelService } from '@app/core';

@Component({
  selector: 'app-capsule-details',
  templateUrl: './capsule-details.component.html',
  styleUrls: ['./capsule-details.component.scss'],
})
export class CapsuleDetailsComponent implements OnInit {
  resourceUrl: SafeResourceUrl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private eventChannel: EventChannelService
  ) {}

  ngOnInit(): void {
    const queryParamUrl = atob(
      this.route.snapshot.queryParamMap.get('url') || btoa('https://tekcapsule.blog')
    );
    this.resourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(queryParamUrl);
    setTimeout(() => {
      this.eventChannel.publish({ event: ChannelEvent.HideCapsuleNavTabs });
    });
  }

  onIFrameClose(): void {
    const queryParamTab = this.route.snapshot.queryParamMap.get('tab') || 'myfeeds';
    this.router.navigate(['capsules', queryParamTab]);
  }
}
