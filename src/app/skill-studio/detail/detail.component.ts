import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSpinnerService, ChannelEvent, EventChannelService, VideoLibraryApiService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { ResearchApiService } from '@app/core/services/research-api/research-api.service';
import { NavTab } from '@app/shared/models';
import { IResearchPaperDetail } from '@app/shared/models/research-item.model';
import { IVideoDetail } from '@app/shared/models/video-library-item.model';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [MessageService],
})
export class DetailComponent implements OnInit, OnDestroy, AfterViewInit {
  resourceUrl: SafeResourceUrl;
  detailId: string;
  resourceURL: string;
  isMobileResolution: boolean;
  detail: IVideoDetail | IResearchPaperDetail;
  subrscription: Subscription[] = [];
  @ViewChild('detailFrame') detailFrame: ElementRef;
  isDataAvailable: boolean;
  pageId: string;
  crumbs: NavTab | any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private eventChannel: EventChannelService,
    private spinner: AppSpinnerService,
    private videoApi: VideoLibraryApiService,
    private researchApi: ResearchApiService,
    private helperService: HelperService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.onResize();
    this.getQueryParams();
  }

  getQueryParams() {
    this.detailId = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe(params => {
      this.pageId = params.pageId;
      console.log(this.pageId);
      if (sessionStorage.getItem('com.tekcapsule.resourceURL')) {
        this.resourceURL = sessionStorage.getItem('com.tekcapsule.resourceURL');
        this.isDataAvailable = true;
        this.getNavBreadcrumbs();
        this.loadCapsule();
      } else if(this.pageId === 'Video_Library') {
        this.fetchVideoDetails();
      } else if(this.pageId === 'Research_Papers') {
        this.fetchResearchDetails();
      }
    });
  }

  onResize() {
    const sub = this.helperService.onResizeChange$().subscribe(isMobileResolution => {
      this.isMobileResolution = isMobileResolution;
    });
    this.subrscription.push(sub);
  }

  fetchVideoDetails() {
    const sub = this.videoApi.getVideo(this.detailId).subscribe(data => {
      this.detail = data;
      this.getNavBreadcrumbs();
      this.isDataAvailable = true;
      this.resourceURL = this.detail.resourceUrl || 'https://tekcapsule.blog';
      this.loadCapsule();
    });
    this.subrscription.push(sub);
  }

  fetchResearchDetails() {
    const sub = this.researchApi.getResearch(this.detailId).subscribe(data => {
      this.detail = data;
      this.getNavBreadcrumbs();
      this.isDataAvailable = true;
      this.resourceURL = this.detail.resourceUrl || 'https://tekcapsule.blog';
      this.loadCapsule();
    });
    this.subrscription.push(sub);
  }

  loadCapsule() {
    console.log('this.resourceURL', this.resourceURL);
    this.resourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.resourceURL);
    this.cdr.detectChanges();
    if(this.detailFrame) {
      const detailFrame = this.detailFrame.nativeElement as HTMLIFrameElement;
      detailFrame.addEventListener('load', this.onIframeLoaded.bind(this));
    }
  }

  onIframeLoaded() {
    this.spinner.hide();
  }

  ngOnDestroy(): void {
    this.resourceUrl = '';
    this.subrscription.forEach(sub => sub.unsubscribe());
    if(this.detailFrame) {
      const detailFrame = this.detailFrame.nativeElement as HTMLIFrameElement;
      detailFrame.removeEventListener('load', this.onIframeLoaded.bind(this));
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.eventChannel.publish({ event: ChannelEvent.HideCapsuleNavTabs });
    });
  }

  getNavBreadcrumbs() {
    this.crumbs = [];
    const queryTitle = sessionStorage.getItem('com.tekcapsule.title') || this.detail.title;
    const dashboardPage = this.helperService.findAIDashboardPage();
    this.crumbs.push(dashboardPage);
    const selectePage = this.helperService.findAIHubPage(this.pageId);
    this.crumbs.push(selectePage);
    if (queryTitle) {
      this.crumbs.push({ displayName: queryTitle });
    }
    console.log('---', this.crumbs);
  }

  navigateToCapsulePage(url: string): void {
    this.router.navigate([url]);
  }

  onIFrameClose(): void {
    this.resourceUrl = '';
    this.router.navigate([sessionStorage.getItem('com.tekcapsule.pageURL') || '/']);
  }

  onAfterIframeLoaded() {

  }
}
