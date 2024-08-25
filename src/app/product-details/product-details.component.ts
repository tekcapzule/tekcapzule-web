import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CourseApiService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  isMobileResolution: boolean;
  isLoginRequiredDialogShown: boolean;
  pageDetails;
  productPageDetails: any;
  featureCount = 3;

  constructor(
    private helperService: HelperService,
    private route: ActivatedRoute,
    private courseApi: CourseApiService
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
    //document.getElementById('coll-form-bg').scrollIntoView({ behavior: "smooth", block: "center"});
    this.featureCount = this.featureCount === 3 ? this.productPageDetails.length : 3;
  }

  openLaunchPopup() {
    this.isLoginRequiredDialogShown = true;
  }

  hideLoginRequiredDialog() {
    this.isLoginRequiredDialogShown = false;
  }
}
