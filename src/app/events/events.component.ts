import { Component, HostListener, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AppSpinnerService, EventApiService, EventChannelService } from '@app/core';
import { IEventItem } from '@app/shared/models';
import { HelperService } from '@app/core/services/common/helper.service';
import { Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { Constants } from '@app/shared/utils';
import { ChannelEvent } from '@app/shared/models/channel-item.model';
import { ILearningMaterial } from '@app/shared/models/skill-studio-item.model';
import { SkillStudioApiService } from '@app/core/services/skill-studio-api/skill-studio-api.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  learningList: ILearningMaterial[] = [];
  filteredList: ILearningMaterial[] = [];
  selectedTopic: string[] = [];
  selectedPayments: any[] = [];

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
  responsiveOptions: any[] = Constants.ResponsiveOptions;

  constructor(
    public spinner: AppSpinnerService,
    private eventsApi: EventApiService,
    private helperService: HelperService,
    private eventChannel: EventChannelService,
    private skillApi: SkillStudioApiService
    ) {
      this.onResize();
    }
    
  ngOnInit(): void {
    this.spinner.show();
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
    this.skillApi.getAllLearning().subscribe(data => {
      const newsletter = this.helperService.getLearningMtsByType(data, 'Events');
      this.learningList = [...newsletter.currentList];
      this.filteredList = [...newsletter.currentList];
      const pastEvent = this.helperService.getLearningMtsByType(data, 'Recorded Event');
      this.pastPopularEvent = pastEvent.currentList;
      console.log('Evetns --->>> ', this.learningList)
      this.seperateByVenue()
      this.spinner.hide();
    });
  }

  seperateByVenue() {
    this.filteredEvents = {};
    this.events = {};
    this.filteredList.forEach(item => {
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
      /*if (item.pastPopularEvent) {
        this.pastPopularEvent.push(item);
      }*/
      this.events[item.region].push(item);
      this.filteredEvents[item.region].push(item);
    });
    this.regions = Object.keys(this.events);
    this.selectedFilters = Object.keys(this.events);
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

  
  onFilterUpdate(event) {
    this.selectedTopic = event.topic;
    this.selectedPayments = event.payments;
    this.productFilter();
    console.log('onFilter -->> ', this.filteredList);
  }
  
  productFilter(isSearchCall = false) {
    this.filteredList = this.helperService.productFilter(this.learningList, this.selectedTopic,
      this.selectedPayments, []);
    if (!isSearchCall) {
      this.onSearch(true);
      this.seperateByVenue();
    }
  }

  onSearch(isFiltered = false): void {
    if (!isFiltered) {
      this.productFilter(true);
    }
    this.helperService.searchByText(this.filteredList, this.searchText);
    this.seperateByVenue();
  }
}
