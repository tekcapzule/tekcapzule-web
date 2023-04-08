import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppSpinnerService, ChannelEvent, EventChannelService } from '@app/core';

@Component({
  selector: 'app-capsule-details',
  templateUrl: './capsule-details.component.html',
  styleUrls: ['./capsule-details.component.scss'],
})
export class CapsuleDetailsComponent implements OnInit, OnDestroy {
  resourceUrl: SafeResourceUrl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private eventChannel: EventChannelService,
    private spinner: AppSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    const queryParamUrl = atob(
      this.route.snapshot.queryParamMap.get('url') || btoa('https://tekcapsule.blog')
    );
    this.resourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(queryParamUrl);
    setTimeout(() => {
      this.eventChannel.publish({ event: ChannelEvent.HideCapsuleNavTabs });
    });
    
  }

  ngOnDestroy(): void {
    this.resourceUrl = '';
  }

  onIFrameClose(): void {
    const queryParamSrc = this.route.snapshot.queryParamMap.get('src') || 'myfeeds';
    this.resourceUrl = '';
    this.router.navigate(['capsules', queryParamSrc]);
  }

  onLoad() {
    if(this.resourceUrl) {
      this.spinner.hide();
    }
  }
}
