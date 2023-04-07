import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSpinnerService, ChannelEvent, EventChannelService } from '@app/core';

@Component({
  selector: 'app-capsule-details',
  templateUrl: './capsule-details.component.html',
  styleUrls: ['./capsule-details.component.scss'],
})
export class CapsuleDetailsComponent implements OnInit, AfterViewInit {
  resourceUrl: SafeResourceUrl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private eventChannel: EventChannelService,
    private spinner: AppSpinnerService
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

  ngAfterViewInit(): void {
    this.spinner.show();
  }

  getNavBreadcrumbs(): { label: string; url?: string }[] {
    const crumbs: { label: string; url?: string }[] = [];
    const queryTab = this.route.snapshot.queryParamMap.get('tab');
    const queryTitle = this.route.snapshot.queryParamMap.get('title');

    if (queryTab === 'trending') {
      crumbs.push({ label: 'My Feeds', url: 'myfeeds' }, { label: 'Trending', url: 'trending' });
    } else if (queryTab === 'editorspick') {
      crumbs.push(
        { label: 'My Feeds', url: 'myfeeds' },
        { label: 'Editors Pick', url: 'editorspick' }
      );
    } else {
      crumbs.push({ label: 'My Feeds', url: 'myfeeds' });
    }

    if (queryTitle) {
      crumbs.push({ label: queryTitle });
    }

    return crumbs;
  }

  navigateToCapsulePage(url: string): void {
    this.router.navigate(['capsules', url]);
  }

  onIFrameClose(): void {
    const queryParamTab = this.route.snapshot.queryParamMap.get('tab') || 'myfeeds';
    this.router.navigate(['capsules', queryParamTab]);
  }

  onAfterIframeLoaded(): void {
    this.spinner.hide();
  }
}
