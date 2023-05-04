import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit, OnDestroy, AfterViewInit, Renderer2, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSpinnerService, CapsuleApiService, ChannelEvent, EventChannelService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { CapsuleItem, NavTab } from '@app/shared/models';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

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
  subrscription: Subscription[] = [];
  @ViewChild('capsuleFrame') capsuleFrame: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private eventChannel: EventChannelService,
    private spinner: AppSpinnerService,
    private messageService: MessageService,
    private capsuleApi: CapsuleApiService,
    private helperService: HelperService,
    private clipboard: Clipboard,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.onResize();
    this.capsuleId = this.route.snapshot.paramMap.get('capsuleId');
    this.fetchCapsuleDetails();
    
  }

  onResize() {
    const sub = this.helperService.onResizeChange$().subscribe(isMobileResolution => {
      this.isMobileResolution = isMobileResolution;
    });
    this.subrscription.push(sub);
  }

  fetchCapsuleDetails() {
    const sub = this.capsuleApi.getCapsuleById(this.capsuleId).subscribe(data => {
      this.capsuleDetail = data;
      this.capsuleURL = this.capsuleDetail.resourceUrl || btoa('https://tekcapsule.blog');
      this.resourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.capsuleURL);
      this.cdr.detectChanges();
      const detailFrame = this.capsuleFrame.nativeElement as HTMLIFrameElement;
      detailFrame.addEventListener('load', this.onIframeLoaded.bind(this));
    });
    this.subrscription.push(sub);
  }

  onIframeLoaded() {
    this.spinner.hide();
  }

  ngOnDestroy(): void {
    this.resourceUrl = '';
    this.subrscription.forEach(sub => sub.unsubscribe());
    const detailFrame = this.capsuleFrame.nativeElement as HTMLIFrameElement;
    detailFrame.removeEventListener('load', this.onIframeLoaded.bind(this));
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.eventChannel.publish({ event: ChannelEvent.HideCapsuleNavTabs });
    });
  }

  getNavBreadcrumbs(): NavTab | any[] {
    const crumbs: NavTab | any[] = [];
    const queryTitle = this.capsuleDetail.title;
    const selectedMenu = this.helperService.findSelectedMenu(
      sessionStorage.getItem('pageURL') || this.router.url
    );
    crumbs.push(selectedMenu.selectedMenuItem);
    if (selectedMenu.selectedChildMenuItem) {
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
    this.router.navigate([sessionStorage.getItem('pageURL') || '/']);
  }

  onRecommendClick() {
    const sub = this.capsuleApi.updateCapsuleRecommendCount(this.capsuleId).subscribe(data => {
      this.messageService.add({
        key: 'tc',
        severity: 'success',
        summary: 'Success',
        detail: 'Recommandation done successfully',
      });
    });
    this.subrscription.push(sub);
  }

  onShareClick() {
    const shareableUrl = new URL(window.location.href);
    this.clipboard.copy(shareableUrl.toString());

    this.messageService.add({
      key: 'tc',
      severity: 'success',
      summary: '',
      detail: 'Link copied. You can share it now.',
    });
  }
}
