import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { HelperService } from '@app/core/services/common/helper.service';

@Component({
  selector: 'app-service-categories',
  templateUrl: './service-categories.component.html',
  styleUrls: ['./service-categories.component.scss'],
})
export class ServiceCategoriesComponent implements OnInit {
  isMobileResolution: boolean;
  isLoginRequiredDialogShown: boolean;
  pageDetails;

  constructor(
    private helperService: HelperService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const menuItem = this.helperService.findPage('Services');
      this.pageDetails = menuItem.children.find(mi => mi.uniqueId === params['code'])
    });
    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event = null) {
    this.isMobileResolution = window.innerWidth < 992 ? true : false;
    this.helperService.setMobileResolution(this.isMobileResolution);
  }

  onKnowMore() {
    document.getElementById('coll-form-bg').scrollIntoView({ behavior: "smooth", block: "center"});
  }

  openLaunchPopup() {
    this.isLoginRequiredDialogShown = true;
  }

  hideLoginRequiredDialog() {
    this.isLoginRequiredDialogShown = false;
  }
}
