import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AppSpinnerService, EventApiService } from '@app/core';

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

  constructor(private spinner: AppSpinnerService, private eventsApi: EventApiService) {}

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents() {
    this.spinner.show();
    this.eventsApi.getAllEvents().subscribe(data => {
      data.forEach(item => {
        if(item.schedule) {
          item.schedule.startDate = moment(item.schedule.startDate, 'DD/MM/YYYY').format('MMM DD');
          item.schedule.endDate = moment(item.schedule.endDate, 'DD/MM/YYYY').format('MMM DD');
          console.log('item', item.name, item.schedule.startDate, item.schedule.endDate, item.schedule.startDate, item.schedule.startTime, item.schedule.endTime)
        }
        if(!this.events[item.region]) {
          this.events[item.region] = [];
        }
        if(item.promotion) {
          this.promotedEvents.push(item);
        }
        if(item.pastPopularEvent) {
          this.pastPopularEvent.push(item);
        }
        this.events[item.region].push(item);
      });
      this.regions = Object.keys(this.events);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    })
  }

  onRegister(eve) {
    window.open(eve.registrationUrl, '_blank');
  }

  onPastEvents(eve) {
    window.open(eve.eventRecordingUrl, '_blank');
  }
}
