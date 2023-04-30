import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSpinnerService, CapsuleApiService, ChannelEvent, EventChannelService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { MessageService } from 'primeng/api';

export interface BreadcrumbNavItem {
  label: string;
  url?: string;
  isMobile?: boolean;
}

@Component({
  selector: 'app-capsule-details',
  templateUrl: './capsule-details.component.html',
  styleUrls: ['./capsule-details.component.scss'],
  providers: [MessageService],
})
export class CapsuleDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  resourceUrl: SafeResourceUrl;
  capsuleId: string;
  queryParamUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private eventChannel: EventChannelService,
    private spinner: AppSpinnerService,
    private messageService: MessageService,
    private capsuleApi: CapsuleApiService,
    private helperService: HelperService,
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.queryParamUrl = atob(
      sessionStorage.getItem('capsuleURL') || btoa('https://tekcapsule.blog')
    );
    this.resourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.queryParamUrl);
    this.capsuleId = this.route.snapshot.paramMap.get('capsuleId');
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('capsuleURL');
    this.resourceUrl = '';
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.eventChannel.publish({ event: ChannelEvent.HideCapsuleNavTabs });
    });
  }

  getNavBreadcrumbs(): BreadcrumbNavItem[] {
    const crumbs: BreadcrumbNavItem[] = [];
    const queryTab = this.route.snapshot.queryParamMap.get('tab');
    const queryTitle = this.route.snapshot.queryParamMap.get('title');
    const isMobile = this.helperService.getMobileResolution();

    if (queryTab === 'trending') {
      crumbs.push(
        { label: 'My Feeds', url: 'myfeeds', isMobile },
        { label: 'Trending', url: 'trending', isMobile }
      );
    } else if (queryTab === 'editorspick') {
      crumbs.push(
        { label: 'My Feeds', url: 'myfeeds', isMobile },
        { label: 'Editors Pick', url: 'editorspick', isMobile }
      );
    } else {
      crumbs.push({ label: 'My Feeds', url: 'myfeeds', isMobile });
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
    this.resourceUrl = '';
    this.router.navigate(['capsules', queryParamTab]);
  }

  onAfterIframeLoaded(): void {
    if (this.resourceUrl) {
      this.spinner.hide();
    }
  }

  onRecommendClick() {
    this.capsuleApi.updateCapsuleRecommendCount(this.capsuleId).subscribe(data => {
      this.messageService.add({
        key: 'tc',
        severity: 'success',
        summary: 'Success',
        detail: 'Recommandation done successfully',
      });
    });
  }

  onShareClick() {
    // this.clipboard.copy(this.queryParamUrl);
    const shareableUrl = new URL(window.location.href);
    shareableUrl.searchParams.delete('tab');
    this.clipboard.copy(shareableUrl.toString());

    this.messageService.add({
      key: 'tc',
      severity: 'success',
      summary: '',
      detail: 'Link copied. You can share it now.',
    });
  }
}
