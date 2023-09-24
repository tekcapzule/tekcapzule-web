import { Component, HostListener, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AppSpinnerService, EventApiService } from '@app/core';
import { IEventItem } from '@app/shared/models';
import { HelperService } from '@app/core/services/common/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  events: any = {};
  regions: string[] = [];
  promotedEvents: any[] = [];
  pastPopularEvent: any[] = [];
  isMobileResolution: boolean;

  constructor(
    public spinner: AppSpinnerService,
    private eventsApi: EventApiService,
    private helperService: HelperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents() {
    this.spinner.show();
    this.eventsApi.getAllEvents().subscribe(
      data => {
        data.forEach(item => {
          if (item.schedule) {
            item.schedule.startDate = moment(item.schedule.startDate, 'DD/MM/YYYY').format(
              'MMM DD'
            );
            item.schedule.endDate = moment(item.schedule.endDate, 'DD/MM/YYYY').format('MMM DD');
          }
          if (!this.events[item.region]) {
            this.events[item.region] = [];
          }
          if (item.promotion) {
            this.promotedEvents.push(item);
          }
          if (item.pastPopularEvent) {
            this.pastPopularEvent.push(item);
          }
          this.events[item.region].push(item);
        });
        this.regions = Object.keys(this.events);
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
      }
    );
  }

  onRegister(eve) {
    window.open(eve.registrationUrl, '_blank');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event = null) {
    this.isMobileResolution = window.innerWidth < 992 ? true : false;
    this.helperService.setMobileResolution(this.isMobileResolution);
  }

  onPastEvents(eve: IEventItem) {
    this.spinner.show();
    console.log('eve.eventRecordingUrl', eve.eventRecordingUrl);
    sessionStorage.setItem('com.tekcapsule.pageURL', this.router.url);
    sessionStorage.setItem('com.tekcapsule.resourceURL', eve.resourceUrl);
    sessionStorage.setItem('com.tekcapsule.title', eve.title);
    this.router.navigateByUrl('/ai-hub/' + eve.code + '/detail?pageId=events');
  }
}
