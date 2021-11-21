import { Component, OnInit } from '@angular/core';
import { EventApiService } from '@app/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-community-carousel',
  templateUrl: './community-carousel.component.html',
  styleUrls: ['./community-carousel.component.scss'],
})
export class CommunityCarouselComponent implements OnInit {
  events: any[] = [];

  constructor(private eventApi: EventApiService) {}

  ngOnInit(): void {
    this.eventApi.getAllEvents().subscribe(events => {
      this.events = events;
      console.log(events);
    });
  }

  openLinkinNewTab(url): void {
    window.open(url, '_blank');
  }
}
