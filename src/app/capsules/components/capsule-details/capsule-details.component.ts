import { Clipboard } from '@angular/cdk/clipboard';
import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  Renderer2,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
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
  isDataAvailable: boolean;
  pdfContent: any;
  @ViewChild('pdfview') pdfview: ElementRef;

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
    this.spinner.hide();
    this.onResize();
    this.capsuleId = this.route.snapshot.paramMap.get('capsuleId');
    if (sessionStorage.getItem('com.tekcapsule.resourceURL')) {
      this.capsuleURL =
        sessionStorage.getItem('com.tekcapsule.resourceURL') || 'https://tekcapsule.blog';
      this.isDataAvailable = true;
      this.loadCapsule();
    } else {
      this.fetchCapsuleDetails();
    }
  }
  
  showData() {
    this.isDataAvailable = true;
    let content = this.helperService.getDataFromAPI();

    this.pdfContent =
      URL.createObjectURL(this.b64toBlob(content, 'application/pdf')) +
      '#toolbar=0&navpanes=0&scrollbar=0&view=FitH';
    const pdfvi = this.pdfview.nativeElement as HTMLElement
    pdfvi.setAttribute('data', this.pdfContent);
  }

  b64toBlob(b64Data, contentType) {
    var byteCharacters = atob(b64Data);

    var byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      var slice = byteCharacters.slice(offset, offset + 512),
        byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
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
      this.capsuleURL = this.capsuleDetail.resourceUrl || 'https://tekcapsule.blog';
      
      this.showData();
      //this.loadCapsule();
    });
    this.subrscription.push(sub);
  }

  loadCapsule() {
    this.resourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.capsuleURL);
    this.cdr.detectChanges();
    const detailFrame = this.capsuleFrame.nativeElement as HTMLIFrameElement;
    detailFrame.addEventListener('load', this.onIframeLoaded.bind(this));
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
    const queryTitle =
      sessionStorage.getItem('com.tekcapsule.capsuleTitle') || "Metaverse";
    const selectedMenu = this.helperService.findSelectedMenu(
      sessionStorage.getItem('com.tekcapsule.pageURL') || this.router.url
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
    this.router.navigate([sessionStorage.getItem('com.tekcapsule.pageURL') || '/']);
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
