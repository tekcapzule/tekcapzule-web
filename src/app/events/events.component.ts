import { Component, HostListener, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AppSpinnerService, ChannelEvent, EventApiService, EventChannelService } from '@app/core';
import { IEventItem } from '@app/shared/models';
import { HelperService } from '@app/core/services/common/helper.service';
import { Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  destroy$ = new Subject<boolean>();
  events: any = {};
  filteredEvents: any = {};
  regions: string[] = [];
  promotedEvents: any[] = [];
  pastPopularEvent: any[] = [];
  selectedFilters: string[] = [];
  isMobileResolution: boolean;
  searchText: string;
  isFilterVisible: boolean = true;
  subscription: Subscription[] = [];

  constructor(
    public spinner: AppSpinnerService,
    private eventsApi: EventApiService,
    private helperService: HelperService,
    private router: Router,
    private eventChannel: EventChannelService
  ) {
    this.onResize();
  }

  ngOnInit(): void {
    this.getAllEvents();
    this.subscribeFilter();
  }

  subscribeFilter(): void {
    const sub = this.eventChannel.getChannel().pipe(
        filter(out => out.event === ChannelEvent.ShowHideFilter), takeUntil(this.destroy$))
      .subscribe(() => {
        this.isFilterVisible = !this.isFilterVisible;
      });
    this.subscription.push(sub);
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
            this.filteredEvents[item.region] = [];
          }
          if (item.promotion) {
            this.promotedEvents.push(item);
          }
          if (item.pastPopularEvent) {
            this.pastPopularEvent.push(item);
          }
          this.events[item.region].push(item);
          this.filteredEvents[item.region].push(item);
        });
        this.regions = Object.keys(this.events);
        this.selectedFilters = Object.keys(this.events);
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
    if(this.isMobileResolution) {
      this.isFilterVisible = false;
    }
  }

  onPastEvents(eve: IEventItem) {
    this.spinner.show();
    console.log('eve.eventRecordingUrl', eve.eventRecordingUrl);
    sessionStorage.setItem('com.tekcapzule.pageURL', this.router.url);
    sessionStorage.setItem('com.tekcapzule.resourceURL', eve.resourceUrl);
    sessionStorage.setItem('com.tekcapzule.title', eve.title);
    this.router.navigateByUrl('/ai-hub/' + eve.code + '/detail?pageId=events');
  }

  onFilterChange(reg: string) {
    if(this.selectedFilters.includes(reg)) {
      this.selectedFilters = this.selectedFilters.filter(region => region !== reg);
    } else {
      this.selectedFilters.push(reg);
    }
    this.onSearch();
  }

  onSearch() {
    let templist = {};
    if (this.selectedFilters.length > 0) {
      this.selectedFilters.forEach(region => {
        templist[region] = [];
        if (this.searchText && this.searchText.trim().length > 0) {
          templist[region] = this.getSearchedEvents(region);
        } else {
          templist[region] = [...this.events[region]];
        }
      });
      this.filteredEvents = templist;
    }
  }

  getSearchedEvents(region: string) {
    return this.events[region].filter(
      events =>
          this.helperService.getIncludesStr(events.title, this.searchText) ||
          this.helperService.getIncludesStr(events.topicCode, this.searchText) ||
          this.helperService.getIncludesStr(events.summary, this.searchText) ||
          this.helperService.getIncludesStr(events.description, this.searchText)
      );
  }
}
