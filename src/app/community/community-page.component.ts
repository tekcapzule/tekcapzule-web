import { Component, HostListener, OnInit } from '@angular/core';
import { HelperService } from '@app/core/services/common/helper.service';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.scss'],
})
export class CommunityPageComponent implements OnInit {
  constructor(
    private helperService: HelperService
  ) {}
  responsiveOptions: any[] | undefined;
  isMobileResolution: boolean;

  ngOnInit(): void {
    this.responsiveOptions = [
      {
          breakpoint: '1400px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '1220px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '1100px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }
  @HostListener('window:resize', ['$event'])
  onResize(event = null) {
    this.isMobileResolution = window.innerWidth < 992 ? true : false;
    this.helperService.setMobileResolution(this.isMobileResolution);
  }
}
