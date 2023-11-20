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
  contributers: any[] = [{
    name: 'Sasikumar P',
    id: 'sasikumarp36',
    url: 'https://github.com/sasikumarp36',
    imageClass: 'reward-1'
  }, {
    name: 'Sathish Kumar',
    id: 'sathish257216',
    url: 'https://github.com/sathish257216',
    imageClass: 'reward-2'
  }, {
    name: 'Haritha Peryala',
    id: 'HarithaPeryala',
    url: 'https://github.com/HarithaPeryala',
    imageClass: 'reward-3'
  }, {
    name: 'Akhil P. B.',
    id: 'akhilpb001',
    url: 'https://github.com/akhilpb001',
    imageClass: 'reward-4'
  }, {
    name: 'Karthikeyan',
    id: 'kartekspace',
    url: 'https://github.com/kartekspace',
    imageClass: 'reward-5'
  }];

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
          numVisible: 2,
          numScroll: 2
      }
  ];
  }
  @HostListener('window:resize', ['$event'])
  onResize(event = null) {
    this.isMobileResolution = window.innerWidth < 992 ? true : false;
    this.helperService.setMobileResolution(this.isMobileResolution);
  }
}
