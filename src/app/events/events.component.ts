import { Component, OnInit } from '@angular/core';

import { AppSpinnerService, EventApiService } from '@app/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  events: any = {};
  region: string[] = [];

  constructor(private spinner: AppSpinnerService, private eventsApi: EventApiService) {}

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents() {
    this.eventsApi.getAllEvents().subscribe(data => {
      data.forEach(item => {
        if(item.venue) {
          const regArr = item.venue.split(',');
          const regionName = regArr[regArr.length - 1];
          if(!this.events[regionName]) {
            this.events[regionName] = [];
          }
          this.events[regionName].push(item);
        }
        this.region = Object.keys(this.events);
        console.log('events', this.events);
      });
    })
  }
}
