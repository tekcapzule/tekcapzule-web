import { Component, OnInit } from '@angular/core';

import { AppSpinnerService } from '@app/core';

@Component({
  selector: 'app-weekly-digest',
  templateUrl: './weekly-digest.component.html',
  styleUrls: ['./weekly-digest.component.scss'],
})
export class WeeklyDigestComponent implements OnInit {
  constructor(private spinner: AppSpinnerService) {}

  ngOnInit(): void {
  }
}
