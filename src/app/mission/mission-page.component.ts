import { Component, HostListener, OnInit } from '@angular/core';
import { HelperService } from '@app/core/services/common/helper.service';

@Component({
  selector: 'app-mission-page',
  templateUrl: './mission-page.component.html',
  styleUrls: ['./mission-page.component.scss'],
})
export class MissionPageComponent implements OnInit {
  isMobileResolution: boolean;
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
}
