import { Component, OnInit } from '@angular/core';

import { AppSpinnerService } from '@app/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  constructor(private spinner: AppSpinnerService) {}

  ngOnInit(): void {
  }
}
