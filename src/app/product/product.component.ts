import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { PortfolioApiService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  isMobileResolution: boolean;
  isLoginRequiredDialogShown: boolean;
  pageDetails;
  productPageDetails: any;
  featureCount = 3;
  @ViewChild('viewContainer') viewContainer: ElementRef;

  constructor(
    private helperService: HelperService,
    private route: ActivatedRoute,
    private courseApi: PortfolioApiService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const menuItem = this.helperService.findPage('Products');
      this.pageDetails = menuItem.children.find(mi => mi.uniqueId === params['code']);
      this.loadServiceData(params['code']);
    });
  }

  loadServiceData(fileName: string) {
    this.courseApi.getServicePage(fileName.toLowerCase()).subscribe(data => {
      this.productPageDetails = data;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event = null) {
    this.isMobileResolution = window.innerWidth < 992 ? true : false;
    this.helperService.setMobileResolution(this.isMobileResolution);
  }

  onKnowMore() {
    this.featureCount = this.featureCount === 3 ? this.productPageDetails.length : 3;
    if(this.featureCount === 3) {
      this.viewContainer.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  openLaunchPopup() {
    this.isLoginRequiredDialogShown = true;
  }

  hideLoginRequiredDialog() {
    this.isLoginRequiredDialogShown = false;
  }
}
