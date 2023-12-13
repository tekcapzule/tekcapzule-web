import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { HelperService } from '@app/core/services/common/helper.service';

@Component({
  selector: 'app-whatwedo',
  templateUrl: './whatwedo.component.html',
  styleUrls: ['./whatwedo.component.scss'],
})
export class WhatwedoComponent implements OnInit {
  isMobileResolution: boolean;
  isLoginRequiredDialogShown: boolean;

  constructor(
    private helperService: HelperService,
  ) {
  }

  ngOnInit(): void {}
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
