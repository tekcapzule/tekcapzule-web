import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSpinnerService, CapsuleApiService, ChannelEvent, EventChannelService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { CapsuleItem, NavTab } from '@app/shared/models';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-capsule-details',
  templateUrl: './capsule-details.component.html',
  styleUrls: ['./capsule-details.component.scss'],
  providers: [MessageService],
})
export class CapsuleDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  resourceUrl: SafeResourceUrl;
  capsuleId: string;
  capsuleURL: string;
  isMobileResolution: boolean;
  capsuleDetail: CapsuleItem;

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
    this.isMobileResolution = this.helperService.getMobileResolution();
    this.capsuleId = this.route.snapshot.paramMap.get('capsuleId');
    this.spinner.show();
    this.fetchCapsuleDetails();
    
  }

  fetchCapsuleDetails() {
    this.capsuleApi.getCapsuleById(this.capsuleId).subscribe(data => {
      this.capsuleDetail = data;
      this.capsuleURL = this.capsuleDetail.resourceUrl || btoa('https://tekcapsule.blog');
      this.resourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.capsuleURL);
    });
  }

  ngOnDestroy(): void {
    this.resourceUrl = '';
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.eventChannel.publish({ event: ChannelEvent.HideCapsuleNavTabs });
    });
  }

  getNavBreadcrumbs(): NavTab | any [] {
    const crumbs: NavTab | any [] = [];
    const queryTitle = this.capsuleDetail.title;
    const selectedMenu = this.helperService.getSelectedMenu(sessionStorage.getItem('pageURL'));
    crumbs.push(selectedMenu.selectedMenuItem);
    if(selectedMenu.selectedChildMenuItem) {
      crumbs.push(selectedMenu.selectedChildMenuItem);
    }
    if (queryTitle) {
      crumbs.push({ displayName: queryTitle });
    }
    return crumbs;
  }

  navigateToCapsulePage(url: string): void {
    this.router.navigate([url]);
  }

  onIFrameClose(): void {
    this.resourceUrl = '';
    console.log('sessionStorage.getIt', sessionStorage.getItem('pageURL'));
    this.router.navigate([sessionStorage.getItem('pageURL')]);
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
